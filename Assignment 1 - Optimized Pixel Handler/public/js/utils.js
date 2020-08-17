const recipes = document.querySelector('.recipes');
const responses = document.querySelector('.responses');

document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});

    getOS();
  });

  // Render Recipe Data Function
  const renderRecipe = (data, id) => {

    const html = `
      <div class="card-panel recipe white row" data-id="${id}">
        <img src="/img/dish.png" alt="recipe thumb">
        <div class="recipe-details">
          <div class="recipe-title">${data.title}</div>
          <div class="recipe-ingredients">${data.ingredients}</div>
        </div>
        <div class="recipe-delete">
          <i class="material-icons" onclick="captureButton(2);" data-id="${id}">delete_outline</i>
        </div>
      </div>
    `;

    recipes.innerHTML += html;

  };

  // Render Pixel Data Function
  const renderPixelData = (data, id) => {

    const html = `
      <div class="card-panel white row" data-id="${id}">
        <div class="details">
          <div class="customer"><i>Customer: </i>${data.customer}</div>
          <div class="event"><i>Event: </i>${data.event}</div>
          <div class="operating_system_name"><i>Operating System: </i>${data.operating_system_name}</div>
          <div class="utm_campaign"><i>UTM Campaign: </i>${data.utm_campaign}</div>
          <div class="utm_medium"><i>UTM Medium: </i>${data.utm_medium}</div>
          <div class="utm_source"><i>UTM Source: </i>${data.utm_source}</div>
          <div class="utm_source"><i>Campaign URL: </i>${data.campaign_url}</div>
        </div>
      </div>
    `;

    responses.innerHTML += html;

  };

  // This method is used to remove the recipe from DOM
  const removeRecipe = (id) => {
    const recipe = document.querySelector(`.recipe[data-id=${id}]`);
    recipe.remove();
  };

  function getOS() {
    // To-do Move Static Texts to some constants file
    var osName = "UnknownOS"; 
        if (navigator.userAgent.indexOf("Win") != -1) osName =  
          "WindowsOS"; 
        if (navigator.userAgent.indexOf("Mac") != -1) osName =  
          "MacOS"; 
        if (navigator.userAgent.indexOf("Linux") != -1) osName =  
          "LinuxOS"; 
        if (navigator.userAgent.indexOf("Android") != -1) osName =  
          "AndroidOS"; 
        if (navigator.userAgent.indexOf("like Mac") != -1) osName =  
          "iOS"; 
    return osName;
  }

  function captureButton(btNum){

    // Enter the list of pixels below. Remove any extra entries below.
    var btPixel = new Array();
    var base_url = 'https://mediadotnet-assignment-1.web.app/img/pixel.gif?'
    btPixel[0] = base_url + 'interaction=UserClick&client=add_small_button&os_name=' + getOS() + '&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1'
    btPixel[1] = base_url + 'interaction=UserClick&client=add_big_button&os_name=' + getOS() + '&x1=facebook&x2=email&x3=docconvert&landing_url=abcd22'
    btPixel[2] = base_url + 'interaction=UserClick&client=delete_button&os_name=' + getOS() + '&x1=linkedin&x2=email&x3=xlsconvert&landing_url=abcd333'

    // Fire the pixel
    var img = document.createElement("img");
    img.setAttribute("src", btPixel[btNum]);
    img.setAttribute("style", "display:none");
    document.body.appendChild(img);
}