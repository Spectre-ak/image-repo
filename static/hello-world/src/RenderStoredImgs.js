import React from "react";
import { Image } from "./DisplayImages";

import { invoke } from '@forge/bridge';

function ImageNotSelectable(props){
    return(
        <div style={{float:"left", paddingRight:"25px", paddingTop:"10px"}} >
            <img src={props.img} className="img-fluid"  width={"200px"}/>
        </div>
    )
}
var Loader=<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>;

class RenderDefaultView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            result:Loader
        }
    }
    componentDidMount(){
        
        invoke('getStoredImages', {'a':'a'}).then(res=>{
            console.log(res);
            const data=res;
            const result=[];
            let counter=0;
            data.forEach(element => {
                    fetch("https://pixabay.com/api/?key=23351082-8bfd9f6f86df9ac3b46d97878&id="+element).then(res=>res.json()).then(res=>{
                        console.log(res);
                        result.push(<ImageNotSelectable img={res.hits[0].webformatURL} />);
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
                result.push(<ImageNotSelectable img={res.hits[0].webformatURL} />);
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
        return(
            <React.Fragment>
                
                    <div className="container">
                        {this.state.result}
                    </div>

            </React.Fragment>
        )
    }
}

export {Loader};

export default RenderDefaultView;