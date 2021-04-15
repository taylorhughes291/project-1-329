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
            category: item.gsx$category.$t,
            details: item.gsx$details.$t,
            tools: item.gsx$details.$t
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

    //Let's limit our projects displayed to 6
    const softwareRemainder = softwareProjects.splice(6);
    console.log(softwareRemainder.length)
    const photoRemainder = photoProjects.splice(6);
    const outdoorRemainder = outdoorProjects.splice(6);

    //If there's anything in the remainder, we're going to want a
    // See More option on the page. Since we default start off with Software:
    const $seeMore = $('main div.see-more')
    const more = function (remainder) {
        if (remainder.length === 0) {
            $seeMore.addClass("hidden");
        } else {
            $seeMore.removeClass("hidden")
        }
    }
    more(softwareRemainder);


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

    ///////////////////////////////////
    // Now to add all of the functionality
    // that will allow the user to switch between software,
    // photography, and outdoor projects.
    ///////////////////////////////////

    // Declare all of the items I need to interact with


    // Buttons
    const $softButton = $('#categories div.software');
    const $photoButton = $('#categories div.photography');
    const $outdoorButton = $('#categories div.outdoors');

    //Containers that contain the projects
    const $softContainer = $('#projects div.software-cont')
    const $photoContainer = $('#projects div.photo-cont')
    const $outdoorContainer = $('#projects div.outdoor-cont')

    //Elements that move the triangle to show what's selected :)
    const $triangle = $('main div.arrow-cont i')
    const $triLeft = $('main div.arrow-left')
    const $triCenter = $('main div.arrow-center')
    const $triRight = $('main div.arrow-right')

    // What to do if the software button is clicked
    // First let's keep track of what category we're in
    let category = "software";
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
            //Reset your category tracker
            category = "software"

            // Let's check again on the remainder of software projects
            if (softwareRemainder.length > 0) {
                $seeMore.toggleClass("hidden");
            }
        }
    })

    //What to do if the photography button is clicked
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
            //Reset your category tracker
            category = "photo"

            // Let's check again on the remainder of software projects
            if (photoRemainder.length > 0) {
                $seeMore.toggleClass("hidden");
            }
        }
    })

    // What to do if the outdoors button is clicked
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
            //Reset your category tracker
            category = "outdoors"

            // Let's check again on the remainder of software projects
            if (outdoorRemainder.length > 0) {
                $seeMore.toggleClass("hidden");
            }
        }
    })

    ////////////////////////////
    // See-more functionality
    ////////////////////////////

    $seeMore.on("click", () => {
        //Check your category
        if (category === "software") {
            $softContainer.empty()
            // add the next 3 projects!
            softwareProjects.push(...softwareRemainder.splice(0,3))
            softwareProjects.forEach((item, index) => {
                const $projectContainer = $('div.software-cont')
                $projectContainer.append(`
                <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })

            // gotta check if we still need the See More div
            more(softwareRemainder)
        // Repeat with photo
        } else if (category === "photo") {
            $photoContainer.empty()
            photoProjects.push(...photoRemainder.splice(0,3))
            photoProjects.forEach((item, index) => {
                const $projectContainer = $('div.photo-cont')
                $projectContainer.append(`
                <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })
            more(photoRemainder)
        //Repeat with outdoors
        } else if (category === "outdoors") {
            $outdoorContainer.empty()
            outdoorProjects.push(...outdoorRemainder.splice(0,3))
            outdoorProjects.forEach((item, index) => {
                const $projectContainer = $('div.outdoor-cont')
                $projectContainer.append(`
                <project-card project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })
            more(outdoorRemainder)            
        }
        
    })

    ////////////////////////
    // Project Details upon click
    ////////////////////////

    let $restaurantSplitter = $('project-card').eq(0)
    $restaurantSplitter.after(`<project-details></project-details>`)
    $('project-details').addClass("container-fluid")
    $('project-details').addClass("px-0")



})
.catch((error) => {
    console.log(error);
})