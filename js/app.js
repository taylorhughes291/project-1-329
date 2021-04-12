///////////////////////////
// Get Data from Google Sheets
///////////////////////////

$.ajax('https://spreadsheets.google.com/feeds/list/1oVPq9iIy7lclUAgZLIBaJSXGHU4IIpGdERTxXm4l7vk/1/public/full?alt=json')
.then((data) => {
    console.log(data);

    // map over the data, generate a simpler data set
    const projects = data.feed.entry.map((item) => {
        return {
            project: item.gsx$project.$t,
            description: item.gsx$description.$t,
            image: item.gsx$image.$t,
            liveurl: item.gsx$liveurl.$t,
            giturl: item.gsx$giturl.$t
        }
    })

    console.log(projects[0]);

    /////////////////////////////////////
    // JQUERY to render projects
    /////////////////////////////////////

    projects.forEach((item, index) => {
        const $projectContainer = $('div.projects')
        $projectContainer.html(`
            <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })

})
.catch((error) => {
    console.log(error);
})