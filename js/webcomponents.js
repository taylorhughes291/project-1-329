// USE THIS FILE TO WRITE ANY WEB COMPONENTS, use example for reference

//////////////////////////////////
// Web Components Classes Here
//////////////////////////////////

class ProjectCard extends HTMLElement {
    constructor(){
        super()

        this.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="https://placeimg.com/275/275/any" class="card-img-top" alt="project screenshot">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>`
    }
}



/////////////////////////////////
// Register the HTML Tag here
/////////////////////////////////

customElements.define("project-card", ProjectCard)