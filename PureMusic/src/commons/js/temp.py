import requests
import json
import time

def getSongMID(pageurl):#获得songmid
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'Referer': 'https://y.qq.com/n/yqq/toplist/{0}.html'.format(item1['topID']),
        # 'Cookie': 'pt2gguin=o0344604012; RK=hBKNVevgd9; ptcz=7e70edebd26744f63d321bdc3eea832e59681b1614a86c481cb4bdd7af326ae0; pgv_pvid=9010457983; o_cookie=344604012; pac_uid=1_344604012; pgv_pvi=728103936; ts_uid=1996056142; luin=o0344604012; lskey=00010000e413b4b01a49b1b29d38d9babc926a4938ea3ea55f6e0816c6cd499ee24b2b3308e048e5aee5ad9f; p_luin=o0344604012; p_lskey=000400005434bcef5702931d41bb0bff1e229a77686dc7890afefd848e20a1f60a95ecf18b8c1d946bfb4aef; yq_index=0; pgv_si=s4678867968; pgv_info=ssid=s1658792426; ts_refer=ADTAGnewyqq.toplist; yqq_stat=0; ts_last=y.qq.com/n/yqq/toplist/4.html'
    }
    html = requests.get(pageurl, headers=headers).text
    t1 = html.replace('MusicJsonCallbacktoplist(', "")
    t2 = t1.strip(")")
    jsonp = json.loads(t2)
    # print(page_url)
    # print(jsonp)
    songmid = []
    for tid in jsonp['songlist']:
        songmid.append([tid['data']['songmid'],tid['data']['songname']])
    return songmid

def saveMusic(songid,vkey,name):#保存音乐
    url = 'http://dl.stream.qqmusic.qq.com/C400{0}.m4a?vkey={1}&amp;guid=9010457983&amp;uin=344604012&amp;fromtag=66'.format(songid,vkey)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'Host': 'dl.stream.qqmusic.qq.com',
        # 'Cookie': 'pt2gguin=o0344604012; RK=hBKNVevgd9; ptcz=7e70edebd26744f63d321bdc3eea832e59681b1614a86c481cb4bdd7af326ae0; pgv_pvid=9010457983; o_cookie=344604012; pac_uid=1_344604012; pgv_pvi=728103936; ts_uid=1996056142; luin=o0344604012; lskey=00010000e413b4b01a49b1b29d38d9babc926a4938ea3ea55f6e0816c6cd499ee24b2b3308e048e5aee5ad9f; p_luin=o0344604012; p_lskey=000400005434bcef5702931d41bb0bff1e229a77686dc7890afefd848e20a1f60a95ecf18b8c1d946bfb4aef; yq_index=0; pgv_si=s4678867968; pgv_info=ssid=s1658792426; ts_refer=ADTAGnewyqq.toplist; yqq_stat=0; ts_last=y.qq.com/n/yqq/toplist/4.html'
    }
    # html = requests.get(url, headers=headers)
    filename = 'G:/music/{0}.m4a'.format(name.replace("?","").replace("/","_").replace("\\","_").replace("\"",""))
    print(filename)
    res = requests.get(url, headers=headers, stream=True)
    print(url)
    with open(filename, 'wb') as f:
        f.write(res.raw.read())

def getVkey(songmid):#获得vkey
    url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1418093288&amp;jsonpCallback=MusicJsonCallback01822902435765017&amp;loginUin=344604012&amp;hostUin=0&amp;format=json&amp;inCharset=utf8&amp;outCharset=utf-8&amp;notice=0&amp;platform=yqq&amp;needNewCode=0&amp;cid=205361747&amp;callback=MusicJsonCallback&amp;uin=344604012&amp;songmid={0}&amp;filename=C400{1}.m4a&amp;guid=9010457983'.format(songmid,songmid)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'Referer': 'https://y.qq.com/portal/player.html',
        # 'Cookie': 'pt2gguin=o0344604012; RK=hBKNVevgd9; ptcz=7e70edebd26744f63d321bdc3eea832e59681b1614a86c481cb4bdd7af326ae0; pgv_pvid=9010457983; o_cookie=344604012; pac_uid=1_344604012; pgv_pvi=728103936; ts_uid=1996056142; luin=o0344604012; lskey=00010000e413b4b01a49b1b29d38d9babc926a4938ea3ea55f6e0816c6cd499ee24b2b3308e048e5aee5ad9f; p_luin=o0344604012; p_lskey=000400005434bcef5702931d41bb0bff1e229a77686dc7890afefd848e20a1f60a95ecf18b8c1d946bfb4aef; yq_index=0; pgv_si=s4678867968; pgv_info=ssid=s1658792426; ts_refer=ADTAGnewyqq.toplist; yqq_stat=0; ts_last=y.qq.com/n/yqq/toplist/4.html'
    }
    html = requests.get(url, headers=headers).text
    t1 = html.replace('MusicJsonCallback(', "")
    t2 = t1.strip(")", "")
    jsonp = json.loads(t2)
    vkey = jsonp['data']['items'][0]['vkey']
    return vkey

# 入口地址
start_url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&amp;format=html&amp;tpl=macv4&amp;v8debug=1&amp;jsonCallback=jsonCallback'
headers={
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'Referer':'https://y.qq.com/n/yqq/toplist/4.html',
        'Cookie':'pt2gguin=o0344604012; RK=hBKNVevgd9; ptcz=7e70edebd26744f63d321bdc3eea832e59681b1614a86c481cb4bdd7af326ae0; pgv_pvid=9010457983; o_cookie=344604012; pac_uid=1_344604012; pgv_pvi=728103936; ts_uid=1996056142; luin=o0344604012; lskey=00010000e413b4b01a49b1b29d38d9babc926a4938ea3ea55f6e0816c6cd499ee24b2b3308e048e5aee5ad9f; p_luin=o0344604012; p_lskey=000400005434bcef5702931d41bb0bff1e229a77686dc7890afefd848e20a1f60a95ecf18b8c1d946bfb4aef; yq_index=0; pgv_si=s4678867968; pgv_info=ssid=s1658792426; ts_refer=ADTAGnewyqq.toplist; yqq_stat=0; ts_last=y.qq.com/n/yqq/toplist/4.html'
    }
html = requests.get(start_url,headers=headers).text
t1 = html.replace('jsonCallback(',"")
t2 = t1.strip(")","")
json_dict=json.loads(t2)
ch_album = json_dict[0]#只获取‘QQ音乐巅峰榜’，反正韩语、日语什么的，我也听不懂
for item1 in ch_album['List']:
    mm=0
    while(True):
        start_item = mm*30
        num = 30
        mm += 1
        update_key = item1['update_key']#有些update_key为2018-5，而实际请求需要传递2018-05，因此需要转换下
        tt = update_key.split("_")
        if(len(tt) == 2):
            if(len(tt[1]) == 1):
                update_key = tt[0] + '_0' + tt[1]
            else:
                update_key = tt[0] + '_' + tt[1]
        #每一个侧边栏获取信息的请求地址
        page_url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&amp;page=detail&amp;date={0}&amp;topid={1}&amp;type=top&amp;song_begin={2}&amp;song_num={3}&amp;g_tk=1418093288&amp;jsonpCallback=MusicJsonCallbacktoplist&amp;loginUin=344604012&amp;hostUin=0&amp;format=jsonp&amp;inCharset=utf8&amp;outCharset=utf-8&amp;notice=0&amp;platform=yqq&amp;needNewCode=0'.format(update_key,item1['topID'],start_item,num)
        songinfo = getSongMID(page_url)#获得songmid和songname
        print(songinfo)
        if(len(songinfo)&lt;=0):#已经没有音乐了，跳出此次循环
            break
        for sid in songinfo:
            vkey = getVkey(sid[0])#获取每首音乐的vkey
            saveMusic(sid[0],vkey,sid[1])#保存此音乐
            time.sleep(1)#休眠1秒，防止被服务器过滤掉
