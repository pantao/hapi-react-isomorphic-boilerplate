import _ from 'lodash';
import xml2js from 'xml2js';
import Crypto from 'crypto';
import Promise from 'bluebird';
import Fetch from 'isomorphic-fetch';

const apiPrefix = 'https://api.weixin.qq.com/cgi-bin';

const apiUrl = (path, query) => {
  if (path.indexOf('/') !== 0) path = '/' + path;
  if (_.isObject(query) && !Array.isArray(query)) {
    let queries = _(query).map((v, k) => `${k}=${v}`);
    query = `?${queries.join('&')}`;
  }

  if (Array.isArray(query)) {
    let queries = _(query).map(kv => `${kv[0]}=${kv[1]}`);
    query = `?${queries.join('&')}`;
  }

  return `${apiPrefix}${path}${query}`;
}

export default class Wechat {
  constructor(props) {
    this.token = props.token;
    this.appID = props.appID;
    this.appSecret = props.appSecret;
    this.accessToken = props.accessToken;
    if (!this.accessToken) {
      this.updateAccessToken();
    }
  }

  getAccessToken() {

  }

  getOAuthUrl(state, redirect) {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appID}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    return url;
  }

  updateAccessToken() {
    function update(json) {
      this.accessToken = json.access_token;
      return json;
    };
    update = update.bind(this);
    return Fetch(apiUrl('token', [
      ['grant_type', 'client_credential'],
      ['appid', this.appID],
      ['secret', this.appSecret]
    ])).then(resp => {
      return resp.json();
    }).then(update)
  }

  checkSignature({
    signature,
    timestamp,
    nonce
  } = {}, callback) {
    const sorted = [this.token, timestamp, nonce].sort().join('');
    const result = Crypto.createHash('sha1').update(sorted).digest('hex');
    const checked = result === signature;
    if (_.isFunction(callback)) {
      callback(checked);
    }
    return checked;
  }

  toJSON(xml) {
    var msg = {};
    xml2js.parseString(xml, function(err, result) {
      var data = result.xml;

      msg.ToUserName = data.ToUserName[0];
      msg.FromUserName = data.FromUserName[0];
      msg.CreateTime = data.CreateTime[0];
      msg.MsgType = data.MsgType[0];

      switch (msg.MsgType) {
        case 'text':
          msg.Content = data.Content[0];
          msg.MsgId = data.MsgId[0];
          break;

        case 'image':
          msg.PicUrl = data.PicUrl[0];
          msg.MsgId = data.MsgId[0];
          msg.MediaId = data.MediaId[0];
          break;

        case 'voice':
          msg.MediaId = data.MediaId[0];
          msg.Format = data.Format[0];
          msg.MsgId = data.MsgId[0];
          break;

        case 'video':
          msg.MediaId = data.MediaId[0];
          msg.ThumbMediaId = data.ThumbMediaId[0];
          msg.MsgId = data.MsgId[0];
          break;

        case 'location':
          msg.Location_X = data.Location_X[0];
          msg.Location_Y = data.Location_Y[0];
          msg.Scale = data.Scale[0];
          msg.Label = data.Label[0];
          msg.MsgId = data.MsgId[0];
          break;

        case 'link':
          msg.Title = data.Title[0];
          msg.Description = data.Description[0];
          msg.Url = data.Url[0];
          msg.MsgId = data.MsgId[0];
          break;

        case 'event':
          msg.Event = data.Event[0];
          msg.EventKey = data.EventKey[0];
          break;
      }
    });
    return msg;
  }

  toXML(data) {
    //自动检测 MsgType
    var MsgType = "";
    if (!data.MsgType) {
      if (data.hasOwnProperty("Content")) MsgType = "text";
      if (data.hasOwnProperty("MusicUrl")) MsgType = "music";
      if (data.hasOwnProperty("Articles")) MsgType = "news";
    } else {
      MsgType = data.MsgType;
    }

    var msg = "" +
      "<xml>" +
      "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
      "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
      "<CreateTime>" + Date.now() / 1000 + "</CreateTime>" +
      "<MsgType><![CDATA[" + MsgType + "]]></MsgType>";

    switch (MsgType) {
      case 'text':
        msg += "" +
          "<Content><![CDATA[" + (data.Content || '') + "]]></Content>" +
          "</xml>";
        return msg;

      case 'image':
        msg += "" +
          "<Image>" +
          "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
          "</Image>" +
          "</xml>";

      case 'voice':
        msg += "" +
          "<Voice>" +
          "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
          "<Title><![CDATA[" + data.Title + "]]></Title>" +
          "<Description><![CDATA[" + data.Description + "]]></Description>" +
          "</Voice>" +
          "</xml>";

      case 'video':
        msg += "" +
          "<Video>" +
          "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
          "</Video>" +
          "</xml>";

      case 'music':
        msg += "" +
          "<Music>" +
          "<Title><![CDATA[" + (data.Title || '') + "]]></Title>" +
          "<Description><![CDATA[" + (data.Description || '') + "]]></Description>" +
          "<MusicUrl><![CDATA[" + (data.MusicUrl || '') + "]]></MusicUrl>" +
          "<HQMusicUrl><![CDATA[" + (data.HQMusicUrl || data.MusicUrl || '') + "]]></HQMusicUrl>" +
          "<ThumbMediaId><![CDATA[" + (data.ThumbMediaId || '') + "]]></ThumbMediaId>" +
          "</Music>" +
          "</xml>";
        return msg;

      case 'news':
        var ArticlesStr = "";
        var ArticleCount = data.Articles.length;
        for (var i in data.Articles) {
          ArticlesStr += "" +
            "<item>" +
            "<Title><![CDATA[" + (data.Articles[i].Title || '') + "]]></Title>" +
            "<Description><![CDATA[" + (data.Articles[i].Description || '') + "]]></Description>" +
            "<PicUrl><![CDATA[" + (data.Articles[i].PicUrl || '') + "]]></PicUrl>" +
            "<Url><![CDATA[" + (data.Articles[i].Url || '') + "]]></Url>" +
            "</item>";
        }

        msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
        return msg;
    }
  }

}

export class WechatContainer {
  constructor() {
    this._clients = {};
  }

  get(name, defaults) {
    return new Promise((resolve, reject) => {
      let client = this._clients[name];
      if (_.isObject(client)) return resolve(client);
      client = new Wechat(defaults);
      this._clients[name] = client;
      return resolve(client);
    })
  }
}
