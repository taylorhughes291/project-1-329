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
            giturl: item.gsx$giturl.$t,
            category: item.gsx$category.$t
        }
    })

    // Split the projects into separate arrays based on categories
    const softwareProjects = [];
    const photoProjects = [];
    const outdoorProjects = [];

    for (i = 0; i < projects.length; i += 1) {
        if (projects[i].category === "software") {
            softwareProjects.push(projects[i])
        } else if (projects[i].category === "photography") {
            photoProjects.push(projects[i])
        } else if (projects[i].category === "outdoors") {
            outdoorProjects.push(projects[i])
        }
    }

    /////////////////////////////////////
    // JQUERY to render projects
    /////////////////////////////////////

    softwareProjects.forEach((item, index) => {
        const $projectContainer = $('div.software-cont')
        $projectContainer.append(`
            <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })
    photoProjects.forEach((item, index) => {
        const $projectContainer = $('div.photo-cont')
        $projectContainer.append(`
            <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })
    outdoorProjects.forEach((item, index) => {
        const $projectContainer = $('div.outdoor-cont')
        $projectContainer.append(`
            <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })

    const $softButton = $('#categories div.software');
    const $photoButton = $('#categories div.photography');
    const $outdoorButton = $('#categories div.outdoors');

    const $softContainer = $('#projects div.software-cont')
    const $photoContainer = $('#projects div.photo-cont')
    const $outdoorContainer = $('#projects div.outdoor-cont')

    const $triangle = $('main div.arrow-cont i')
    const $triLeft = $('main div.arrow-left')
    const $triCenter = $('main div.arrow-center')
    const $triRight = $('main div.arrow-right')

    $softButton.on("click", () => {
        if($softContainer.hasClass("hidden")) {
            if (!$photoContainer.hasClass("hidden")) {
                $softContainer.toggleClass("hidden")
                $photoContainer.toggleClass("hidden")
            }
            if (!$outdoorContainer.hasClass("hidden")) {
                $softContainer.toggleClass("hidden")
                $outdoorContainer.toggleClass("hidden")
            }
            $triLeft.append($triangle)
        }
    })
    $photoButton.on("click", () => {
        if($photoContainer.hasClass("hidden")) {
            if (!$softContainer.hasClass("hidden")) {
                $softContainer.toggleClass("hidden")
                $photoContainer.toggleClass("hidden")
            }
            if (!$outdoorContainer.hasClass("hidden")) {
                $photoContainer.toggleClass("hidden")
                $outdoorContainer.toggleClass("hidden")
            }
            $triCenter.append($triangle)
        }
    })
    $outdoorButton.on("click", () => {
        if($outdoorContainer.hasClass("hidden")) {
            if (!$photoContainer.hasClass("hidden")) {
                $outdoorContainer.toggleClass("hidden")
                $photoContainer.toggleClass("hidden")
            }
            if (!$softContainer.hasClass("hidden")) {
                $softContainer.toggleClass("hidden")
                $outdoorContainer.toggleClass("hidden")
            }
            $triRight.append($triangle)
        }
    })


})
.catch((error) => {
    console.log(error);
})