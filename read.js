var fs = require('fs'),
xml2js = require('xml2js');
var moment = require('moment');

var urlSafe = require('./url-safe')

var parser = new xml2js.Parser();


const out = [];
fs.readFile(__dirname + '/posts.xml', function(err, data) {
    parser.parseString(data, function (err, result) {

        result.rss.channel[0].item.forEach((post) => {

            filteredTags = '';

            if(post['category']) {
                var filteredTags = post['category'].map((cat) => {
                    return cat._
                }).filter((tag) => {
                    return (tag !== 'Uncategorized')
                });

            }

        //  out.push({
        //         title: post.title[0],
        //         url: 'local',
        //         content: post['content:encoded'][0],
        //         tags: filteredTags,
        //         created: post.pubDate[0],
        //     })



            //console.log('-->', post.title[0], moment(date).valueOf(), moment(date).format('d/MM/YY'))

            if (post['content:encoded'][0] !== '' &&
                post['title'][0].slice(0, 9) !== 'links for'
            ) {

                //        var date = post.pubDate[0].split(' ').splice(1, 3).join(' ')
                var date = moment(post.pubDate[0])
                var epoch = date.valueOf()

                if(epoch) {

                    out.push({
                        title: post.title[0],
                        url: '/posts/' + urlSafe(post.title[0]) + '/index.html',
                        content: post['content:encoded'][0],
                        tags: filteredTags,
                        epoch: date.valueOf(),
                        created: date.format('DD MMM YYYY')

                    })

                }

            }
            //console.log(post.title[0], post.pubDate[0],  moment(post.pubDate[0].slice(',')[1]).format('d/MM/YY'))

            //console.log(post.title[0], post.pubDate[0], date, moment(date).format('DD/MM/YY'))

                //,  moment(post.pubDate[0]).format())

            //console.log(filteredTags)
        })
        //console.dir(result.rss.channel[0].item.length);

//console.log(out)

        fs.writeFileSync('./output.json', JSON.stringify(out, null, 4))

        console.log('Done');

    });
});
