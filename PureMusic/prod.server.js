var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()
var apiRoutes = express.Router()

app.use('/api', apiRoutes)
app.use(express.static('./dist'))

apiRoutes.get('/music', (req, res) => {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch(error => {
    console.log(error)
  })
})
apiRoutes.get('/getDiscList', (req, res) => {
  console.log('getDiscList')
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(error => {
    console.log(error)
  })
})
apiRoutes.get('/getDiscInfo', (req, res) => {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  console.log(url)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    // 返回的是JSONP格式的话
    if (typeof ret === 'string') {
      let reg = /^\w+\(({.+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
// search
apiRoutes.get('/search', (req, res) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  console.log('search')
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then(response => {
    console.log(response.data)
    res.json(response.data)
  }, err => {
    throw Error(`Proxy failed, ${err}`)
  })
})

apiRoutes.get('/getRecommendItem', (req, res) => {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const query = req.query.disstid

  axios.get(url, {
    headers: {
      referer: `https://y.qq.com/n/yqq/playsquare/${query}.html`,
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    let ret = response.data

    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/
      const matches = ret.match(reg)

      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }, err => {
    throw Error(`Proxy failed, ${err}`)
  })
})
apiRoutes.get('/getLyric', (req, res) => {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    let ret = response.data
    // 对返回的jsonpcallback进行处理
    if (typeof ret === 'string') {
      // ^\w+单词多个
      // \(\)匹配括号
      // [^()]表示不是()的
      let reg = /^\w+\(({[^()]+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
        console.log(ret)
      }
    }
    res.json(ret)
  }).catch(error => {
    console.log(error)
  })
})

var port = process.env.PORT | config.build.port

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost: ' + port + '\n')
})
