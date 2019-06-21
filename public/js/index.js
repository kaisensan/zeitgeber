
const animateCarousel=(imgArr,btnArr,idx)=>{imgArr.forEach(e=>e.classList.remove('carousel-left','carousel-middle','carousel-right','carousel-hide'));idx=(idx===imgArr.length)?0:idx;let leftIdx=(idx-1===-1)?imgArr.length-1:idx-1;let rightIdx=(idx+1===imgArr.length)?0:idx+1;imgArr[idx].classList.add('carousel-middle');imgArr[leftIdx].classList.add('carousel-left');imgArr[rightIdx].classList.add('carousel-right');imgArr.forEach((img,i)=>{if(i!==idx&&i!==leftIdx&&i!==rightIdx){img.classList.add('carousel-hide');}});btnArr.forEach(btn=>btn.classList.remove('carousel-button-active'));btnArr[idx].classList.add('carousel-button-active');}
const imagesArr=Array.from(document.querySelectorAll('.carousel-image'));const buttonsArr=Array.from(document.querySelectorAll('.carousel-button'));imagesArr.forEach((img,idx)=>{img.addEventListener('click',evt=>{const i=Array.from(evt.target.classList).includes('carousel-middle')?idx+1:idx;animateCarousel(imagesArr,buttonsArr,i);});});buttonsArr.forEach((btn,idx)=>{btn.addEventListener('click',evt=>{animateCarousel(imagesArr,buttonsArr,idx);});});

const fadeInEffect=(elementsToApply,fadeInClass)=>{window.addEventListener('scroll',evt=>{elementsToApply.forEach(e=>{let posTop=e.getBoundingClientRect().top;if(posTop<800){e.classList.remove(fadeInClass);}});});};const addFadeInEffect=[[document.querySelectorAll('.cloud-item'),'cloud-scroll-effect'],[document.querySelectorAll('.zeitgeber-item'),'zeitgeber-scroll-effect']];addFadeInEffect.forEach(e=>fadeInEffect(...e));

const allImages=Array.from(document.getElementsByClassName("purchase-image-unselected"));const selectedImage=document.querySelector(".purchase-image-display");let isSliding=0;const changeImage=(imageList,imageDisplay,imageIcon)=>{console.log(isSliding);if(isSliding<=2){imageList.forEach(e=>e.classList.remove('purchase-image-selected'));imageIcon.classList.add("purchase-image-selected");imageDisplay.src=imageIcon.src;}}
allImages.forEach(e=>e.addEventListener('click',evt=>{changeImage(allImages,selectedImage,e);}));const zoomImage=document.querySelector(".purchase-zoom-image");const zoomElement=document.querySelector(".purchase-zoom");const toggleOverlay=(overlayContainer)=>{overlayContainer.classList.toggle("purchase-overlay");document.body.classList.toggle("purchase-lock");}
selectedImage.addEventListener('click',evt=>{toggleOverlay(zoomElement);zoomImage.src=selectedImage.src;});zoomElement.addEventListener('click',evt=>{toggleOverlay(zoomElement);});const buyButton=document.querySelector(".purchase-send");const buyElement=document.querySelector(".purchase-buy");const buyOverlayHide=document.querySelector(".purchase-cancel");buyButton.addEventListener('click',evt=>{toggleOverlay(buyElement);});buyOverlayHide.addEventListener('click',evt=>{toggleOverlay(buyElement);});const imagesElement=document.querySelector(".purchase-image-list");const imageSlider=document.querySelector(".purchase-slider");let isDown=false;let offsetX=0;let currentPosition=0;let initialPosition=allImages[0].getBoundingClientRect().left;const slideStart=(evt)=>{isDown=true;offsetX=evt.clientX-currentPosition;}
const slideEnd=()=>{isDown=false;let imageWidth=allImages[0].offsetWidth;let currFirstPos=allImages[0].getBoundingClientRect().left;let snapPosition=(currFirstPos>initialPosition)?0:Math.floor((currFirstPos-initialPosition)/imageWidth);if(allImages.length<5){currentPosition=0;}
else if(-snapPosition>allImages.length-5){currentPosition=-(allImages.length-5)*imageWidth;}
else{currentPosition=snapPosition*imageWidth;}
imageSlider.style.transform="translateX("+currentPosition+"px)";setTimeout(()=>{isSliding=0;},100);}
const slideMove=(evt)=>{if(isDown){isSliding++;imageSlider.style.transform="translateX("+(evt.clientX-offsetX)+"px)";currentPosition=evt.clientX-offsetX;}}
imagesElement.addEventListener('mousedown',evt=>{slideStart(evt);});document.body.addEventListener('mouseup',evt=>{if(isDown&&isSliding)slideEnd();else isDown=false;});document.body.addEventListener('mousemove',evt=>{slideMove(evt);});imagesElement.addEventListener('touchstart',evt=>{let style=imageSlider.getAttribute('style');imageSlider.setAttribute('style',style+"transition: transform 0s ease-in-out;");slideStart(evt.touches[0]);});document.body.addEventListener('touchend',evt=>{if(isDown&&isSliding){let style=imageSlider.getAttribute('style');imageSlider.setAttribute('style',style+"transition: transform 0.2s ease-in-out;");slideEnd();}
else isDown=false;});document.body.addEventListener('touchmove',evt=>{slideMove(evt.touches[0]);});function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};on_resize(function(){initialPosition=imagesElement.getBoundingClientRect().left+3;slideEnd();})();