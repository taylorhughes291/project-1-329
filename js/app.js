///////////////////////////
// Get Data from Google Sheets
///////////////////////////

$.ajax('https://sheets.googleapis.com/v4/spreadsheets/1oVPq9iIy7lclUAgZLIBaJSXGHU4IIpGdERTxXm4l7vk/values/Sheet1?alt=json&key=AIzaSyAleyzwtA_THyMjT5aallc0Mw4UzpDtJ0A')
.then((data) => {
    // map over the data, generate a simpler data set
    const projects = data.values.map((item) => {
        return {
            project: item[0],
            description: item[4],
            image: item[3],
            liveurl: item[1],
            giturl: item[2],
            category: item[5],
            details: item[6]
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
        <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })
    photoProjects.forEach((item, index) => {
        const $projectContainer = $('div.photo-cont')
        $projectContainer.append(`
            <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })
    outdoorProjects.forEach((item, index) => {
        const $projectContainer = $('div.outdoor-cont')
        $projectContainer.append(`
            <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
        `)
    })

    // Let's make custom buttons for each category

    const buttonApply = function (category, button1, button2) {
        const $buttons = $(`div.${category}-cont project-card div.card-body a`)
        for (i = 0; i < $buttons.length; i += 1) {
            if (i % 2 === 0) {
                $buttons.eq(i).text(button1)
            } else {
                $buttons.eq(i).text(button2)
            }
        }
    }

    buttonApply("software", "Go To Site", "Github Link")
    buttonApply("photo", "Instagram", "Buy Prints")
    buttonApply("outdoor", "Maps", "Trip Report")


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
            more(softwareRemainder)
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
            more(photoRemainder)
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
            more(outdoorRemainder)
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
                <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })

            // gotta check if we still need the See More div
            more(softwareRemainder)
            //reset buttons
            buttonApply("software", "Go To Site", "Github Link")
        // Repeat with photo
        } else if (category === "photo") {
            $photoContainer.empty()
            photoProjects.push(...photoRemainder.splice(0,3))
            photoProjects.forEach((item, index) => {
                const $projectContainer = $('div.photo-cont')
                $projectContainer.append(`
                <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })
            more(photoRemainder)
            buttonApply("photo", "Instagram", "Buy Prints")
        //Repeat with outdoors
        } else if (category === "outdoors") {
            $outdoorContainer.empty()
            outdoorProjects.push(...outdoorRemainder.splice(0,3))
            outdoorProjects.forEach((item, index) => {
                const $projectContainer = $('div.outdoor-cont')
                $projectContainer.append(`
                <project-card class="index-${index}" project="${item.project}" description="${item.description}" image="${item.image}" liveurl="${item.liveurl}" giturl="${item.giturl}"></project-card>
                `)
            })
            more(outdoorRemainder)  
            buttonApply("outdoor", "Maps", "Trip Report")       
        }
        
    })

    // ////////////////////////
    // // Project Details upon click
    // ////////////////////////

    // let $restaurantSplitter = $('project-card').eq(0)
    // $restaurantSplitter.after(`<project-details></project-details>`)
    // $('project-details').addClass("container-fluid")
    // $('project-details').addClass("px-0")


    ///////////////////////////////
    // Send email message
    ///////////////////////////////

    // I have set up a google apps script to send myself an email. I will now
    // collect the information upon submit and send it to the apps script.

    const $emailName = $('div#contact div.inputs input.name-email')
    const $emailEmail = $('div#contact div.inputs input.email-email')
    const $emailMessage = $('div#contact div.inputs textarea.message-email')
    const $emailButton = $('div#contact div.inputs button.btn')

    $emailButton.on("click", () => {
        const url = "https://script.google.com/macros/s/AKfycbzibdCA7LM6GGiDkPgkykRg59dk6zzXFi46gUFxxifBodiy8OI5BeDybLq4qf9g_2kg/exec"
        const data = {
            name: $emailName.val(),
            email: $emailEmail.val(),
            message: $emailMessage.val()
          }
          const options = {
            method: 'POST',
            body: JSON.stringify(data),
          }
          fetch(url, options)
          .then((response) => response.text())
          .then((response) => console.log(response))
          .catch((error) => console.log(error))

          $emailName.val("");
          $emailEmail.val("");
          $emailMessage.val("");

          alert("Thanks for your email!")
        
    })
})
.catch((error) => {
    console.log(error);
})

// This code will hide and show the about me overlay over my picture
const $overlay = $('.overlay')
const $aboutButton = $('.about-button')
const $hideButton = $('#hide-button')
const $nutshellCont = $('#nutshell-cont')

$aboutButton.on("click", () => {
    $overlay.removeClass("hidden")
    $overlay.addClass('add-gradient')
    $nutshellCont.addClass("add-background")
})

$hideButton.on("click", () => {
    $overlay.addClass("hidden")
    $nutshellCont.removeClass("add-background")
})

// This code will display the menu when you click on the hamburger icon, and close it when you click x
const $hamburger = $('.hamburger')
const $menu = $('#menu')

$hamburger.on('click', () => {
    const $circleMenu = $('div.circle-cont')
    $circleMenu.removeClass('animation-out')
    const $newCircle = $circleMenu.clone(true)
    

    $circleMenu.before($newCircle)
    $('.circle-cont:last').remove()
    $newCircle.removeClass('hidden')
    $newCircle.addClass('animation-in')
})

const $hideCircle = $('#hide-circle')
$hideCircle.on('click', () => {
    const $circleMenu = $('div.circle-cont')
    $circleMenu.addClass('animation-out')
    $circleMenu.removeClass('animation-in')
    // $circleMenu.addClass('hidden')
})

