// USE THIS FILE TO WRITE ANY WEB COMPONENTS, use example for reference

//////////////////////////////////
// Web Components Classes Here
//////////////////////////////////

class ProjectCard extends HTMLElement {
    constructor(){
        super()

        this.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${this.getAttribute("image")}" class="card-img-top" alt="project screenshot">
        <div class="card-body">
          <h5 class="card-title">${this.getAttribute("project")}</h5>
          <p class="card-text">${this.getAttribute("description")}</p>
        </div>
        <div class="card-body">
          <a href="${this.getAttribute("liveurl")}" class="card-link">Go To Site</a>
          <a href="${this.getAttribute("giturl")}" class="card-link">Github Link</a>
        </div>
      </div>`
    }
}



/////////////////////////////////
// Register the HTML Tag here
/////////////////////////////////

customElements.define("project-card", ProjectCard)