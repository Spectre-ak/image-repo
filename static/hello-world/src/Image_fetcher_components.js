import React, { useEffect } from "react";
import { ReactDOM } from "react-dom";
import { invoke } from '@forge/bridge';

function ImageSelectable(props){
    useEffect(()=>{
        document.getElementById('src'+props.img).onclick=()=>{
            document.getElementById(props.img).click()
        };
        document.getElementById(props.img).addEventListener("change",e=>{
            if(e.target.checked){
                document.getElementById('src'+props.img).style.opacity=0.5;
                props.selectImageCallback(props.id);
            }
            else{
                document.getElementById('src'+props.img).style.opacity=1.0;
                props.removeSelectionCallback(props.id);
            }
        });
    });
    return(
        <div style={{float:"left", paddingRight:"25px", paddingTop:"10px"}} >
            <input class="form-check-input" type="checkbox" id={props.img}/>
            <img src={props.img} className="img-fluid"  width={"200px"}  id={'src'+props.img}/>
        </div>
    )
}


class ImageFetcherComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Select Image Category",
            url:"",
            page:1,
            result:[],
            selectedImages:{},
            saveSelectedButton:"Save Selection",

        };
        this.changeState = this.changeState.bind(this);
        this.getImages=this.getImages.bind(this);
        this.fetchResults=this.fetchResults.bind(this);
        this.loadmore=this.loadmore.bind(this);
        this.saveImages=this.saveImages.bind(this);
    }



    componentDidMount() {
        
    }

    fetchResults(){
        console.log(this.state.url);
        fetch(this.state.url+"&page="+this.state.page).
            then(res => res.json()).then(res => {
                console.log(res);
                const images=[];

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

                res.hits.forEach(element => {
                    images.push(<ImageSelectable img={element.webformatURL} id={element.id} key={element.webformatURL} selectImageCallback={callback} removeSelectionCallback={removeSelectionCallback}/>)
                });
                const stored=this.state.result;
                const newResponse=stored.concat(images);
                this.setState({
                    result:newResponse,
                    loadMoreOps:<button className="btn btn-outline-primary" style={{borderRadius:"100px"}} onClick={this.loadmore}>Load More</button>
                });
                
                if(res.hits.length==0){
                    this.setState({
                        loadMoreOps:"No more images found"
                    });
                }
            });
    }

    saveImages(){
        console.log(this.state.selectedImages);
        this.setState({
            saveSelectedButton:<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        });
        
        
        invoke('saveImgArray', {...this.state.selectedImages}).then(res=>{
            console.log(res);
            this.setState({
                saveSelectedButton:"Save Selection"
            });
            document.getElementById("modalSaveContent").click();
        });
        
        
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div style={{ float: "left", paddingTop:"10px" }}>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.category} &nbsp;
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>backgrounds</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>fashion</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>science</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>education</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>feelings</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>health</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>people</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>religion</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>places</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>animals</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>industry</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>computer</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>food</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>sports</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>transportation</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>travel</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>buildings</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>business</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>music</a>
                                <a class="dropdown-item" href="#" onClick={e => { this.changeState(e.target.innerText) }}>Select Image Category</a>
                            </div>
                        </div>

                    </div>

                    <div style={{ float: "left", paddingLeft: "10px", paddingTop:"10px" }}>

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Enter keywords" aria-label="keywords" id="keywords" aria-describedby="basic-addon1" />
                        </div>

                    </div>

                    <div style={{ float: "left", paddingLeft: "10px", paddingTop:"10px" }}>
                        <button className="btn btn-outline-primary" onClick={this.getImages}>Get Images</button>
                    </div>
                    <div style={{ float: "left", paddingLeft: "10px", paddingTop:"10px", paddingRight:"30px" }}>
                        <button className="btn btn-outline-secondary" onClick={this.saveImages}>{this.state.saveSelectedButton}</button>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <div className="container">
                        <div id="resultFromSearch">
                            {this.state.result}
                        </div>
                    </div>
                    <br/><br/><br/><br/><br/>
                    
                    <div className="container" style={{textAlign:"center", float:"right",paddingTop:"20px",paddingBottom:"20px"}} id="loadMoreContainer">
                        {this.state.loadMoreOps}
                    </div>

                  


                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="modalSaveContent" style={{display:"none"}}></button>

                    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                        <div class="modal-content" style={{paddingBottom:"10px",paddingTop:"10px",paddingLeft:"10px"}}>

                        Images Saved

                        </div>
                    </div>
                    </div>

                </div>

                
            </React.Fragment>
        )
    }

    changeState(option) {
        console.log(option);
        this.setState({
            category: option
        })
    }

    getImages(){
        var keywords=document.getElementById("keywords").value;
        keywords=keywords.trim();
        keywords=keywords.replaceAll(" ","+");
        console.log(keywords);
        this.setState({
            url:"https://pixabay.com/api/?key=23351082-8bfd9f6f86df9ac3b46d97878&image_type=photo&pretty=true&q="+keywords+"&category="+this.state.category
        },()=>{
            this.setState({
                page:1,
                result:[],
                selectedImages:{}
            },()=>{
                this.fetchResults();
            });
        });
        
    }

    loadmore(){
        this.setState({
            page:this.state.page+1
        },()=>{
            this.fetchResults();
        });
    }

}

export {ImageSelectable};

export default ImageFetcherComponents;