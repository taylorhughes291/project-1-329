// USE THIS FILE TO WRITE ANY WEB COMPONENTS, use example for reference

//////////////////////////////////
// Web Components Classes Here
//////////////////////////////////

class TemplateExample extends HTMLElement {
    constructor(){
        super()

        this.innerHTML = `<h1>This world is nothing but ceaseless suffering</h1>`
    }
}



/////////////////////////////////
// Register the HTML Tag here
/////////////////////////////////

customElements.define("template-example", TemplateExample)