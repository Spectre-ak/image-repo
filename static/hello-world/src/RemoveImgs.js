import React from "react";
import { ReactDOM } from "react";
import { invoke } from '@forge/bridge';
import { Loader } from "./RenderStoredImgs";
import { ImageSelectable } from "./Image_fetcher_components";

class RemoveImgs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            removeSelectionButton:"Remove Selection",
            result: Loader,
            selectedImages:{}
        
        }
        this.removeImgs=this.removeImgs.bind(this);
    }
    removeImgs(){
        console.log(this.state.selectedImages);
        this.setState({
            removeSelectionButton:<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        });
        
        invoke('removeImgArray', {...this.state.selectedImages}).then(res=>{
            console.log(res);
            this.setState({
                removeSelectionButton:"Remove Selection"
            });
            document.getElementById("modalRemoveContent").click();

        });
        
    }
    componentDidMount(){

        const callback= (e)=>{
            console.log(e); 
            console.log(this.state.selectedImages);
            const newDict={...this.state.selectedImages};
            newDict[e]=1;
            this.setState({
                selectedImages:newDict
            },()=>{
                console.log(this.state.selectedImages);
            })
           
        };

        const removeSelectionCallback= (e)=>{
            console.log("remove");
            console.log(e); 
            const copyDict={...this.state.selectedImages};
            delete copyDict[e];
            this.setState({
                selectedImages:copyDict
            },()=>{
                console.log("removed");
                console.log(this.state.selectedImages);
            })
        };

        
        invoke('getStoredImages', {'a':'a'}).then(res=>{
            console.log(res);
            const data=res;
            const result=[];
            let counter=0;
            data.forEach(element => {
                    fetch("https://pixabay.com/api/?key=23351082-8bfd9f6f86df9ac3b46d97878&id="+element).then(res=>res.json()).then(res=>{
                        console.log(res);
                        result.push(<ImageSelectable img={res.hits[0].webformatURL} 
                            id={res.hits[0].id} key={res.hits[0].webformatURL} selectImageCallback={callback} removeSelectionCallback={removeSelectionCallback}/>);
                        counter++;
                        if(counter==data.length){
                            this.setState({
                                result:result
                            })
                        }
                    });
            });
            if(data.length==0){
                this.setState({
                    result:"No Images Saved"
                });
            }
        }); 
        
       /*
       const dummy=['6603499', '6603544', '6604454', '6604629', '6605552'];
       const result=[];
       let counter=0;
       dummy.forEach(element => {
            fetch("https://pixabay.com/api/?key=23351082-8bfd9f6f86df9ac3b46d97878&id="+element).then(res=>res.json()).then(res=>{
                console.log(res);
                result.push(<ImageSelectable img={res.hits[0].webformatURL} 
                    id={res.hits[0].id} key={res.hits[0].webformatURL} selectImageCallback={callback} removeSelectionCallback={removeSelectionCallback}/>);
                counter++;
                if(counter==dummy.length){
                    this.setState({
                        result:result
                    })
                }
            });
       });
       */
    }

    render(){
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div style={{ float: "left", paddingLeft: "10px", paddingTop:"10px", paddingRight:"30px" }}>
                        <button className="btn btn-outline-secondary" onClick={this.removeImgs}>{this.state.removeSelectionButton}</button>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <div className="container">
                        {this.state.result}
                    </div>
                    <br/><br/><br/><br/><br/>

                </div>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="modalRemoveContent" style={{display:"none"}}></button>

                    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                        <div class="modal-content" style={{paddingBottom:"10px",paddingTop:"10px",paddingLeft:"10px"}}>

                        Images Removed

                        </div>
                    </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default RemoveImgs;