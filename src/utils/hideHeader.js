export function hideHeader() {
  const { pathname } = window.location;
  const headerChildren = document.querySelector('header').childNodes;

  switch (pathname.startsWith('/movie')) {

    case true:
      for(let i = 2; i < headerChildren.length; i++)
        headerChildren[i].style.opacity = '0';
      break;
    
    case false:
      for(let i = 2; i < headerChildren.length; i++) 
        headerChildren[i].style.opacity = '1';
      break;

    default:
      break;
  }
}