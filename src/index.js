import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();


async function getData() {
  console.log(await (storage.get('myfirst_key')));
  return await (storage.get("myfirst_key"));
}

async function saveImgArray(imgArrUnsaved) {
   //(await storage.set("saved-images", []));
   //return await (storage.get("saved-images", []));


  let savedImages = (await storage.get("saved-images"));
  if (savedImages == undefined) {
    console.log("empty img list");
    (await storage.set("saved-images", imgArrUnsaved));
    return await (storage.get("saved-images"));
  }
  else {
    imgArrUnsaved.forEach(element => {
      if (!savedImages.includes(element)) {
        savedImages.push(element);
      }
    });
    (await storage.set("saved-images", savedImages));
    return await (storage.get("saved-images"));
  }

}



resolver.define('saveImgArray', (req) => {
  //getData();
  const data = req.payload;

  const savedImgs = [];
  for (var key in data) {
    savedImgs.push(key);
  }
  console.log(savedImgs);
  return saveImgArray(savedImgs);

});



async function getStoredImages(){
  return await(storage.get("saved-images"));
}

resolver.define('getStoredImages',(req)=>{
  return getStoredImages();
});



async function removeImgArray(arrToBeRemoved){
  let savedImages = (await storage.get("saved-images"));
  if (savedImages == undefined) {
    console.log("empty img list, cannot remove");
    //(await storage.set("saved-images", imgArrUnsaved));
    return await (storage.get("saved-images"));
  }
  else {
    const updatedImgsArr=[];
    savedImages.forEach(element => {
      if (!arrToBeRemoved.includes(element)) {
        updatedImgsArr.push(element);
      }
    });
    (await storage.set("saved-images", updatedImgsArr));
    return await (storage.get("saved-images"));
  }
}

resolver.define('removeImgArray',(req)=>{
  const data=req.payload;
  const removeImgs = [];
  for (var key in data) {
    removeImgs.push(key);
  }
  console.log(removeImgs);
  return removeImgArray(removeImgs);
});






export const handler = resolver.getDefinitions();
