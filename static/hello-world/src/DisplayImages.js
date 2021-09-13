import React from "react";
import  ReactDOM  from "react-dom";
import ImageFetcherComponents from "./Image_fetcher_components";
import RemoveImgs from "./RemoveImgs";
import RenderDefaultView from "./RenderStoredImgs";

function Image(props){
    return(
        <div style={{float:"left", paddingRight:"10px"}} >
            <img src={props.img} className="img-fluid"  width={"300px"}/>
        </div>
    )
}

class RenderStoredImages extends React.Component{
    constructor(props){
        super(props);
        this.add=this.add.bind(this);
        this.remove=this.remove.bind(this);
        this.preview=this.preview.bind(this);
        this.state={
            currentState:"Preview"
        }
    }

    componentDidMount(){

    }

    add(){
        this.setState({
            currentState:"Add"
        });
        ReactDOM.render(<ImageFetcherComponents/>,
            document.getElementById("container-util"));

    }

    remove(){
        this.setState({
            currentState:"Remove"
        });
        ReactDOM.render(<RemoveImgs/>,
            document.getElementById("container-util"));
    }

    preview(){
        this.setState({
            currentState:"Preview"
        });
        ReactDOM.render(<RenderDefaultView/>,
            document.getElementById("container-util"));
    }
    render(){
        return(
            <div className="container-fluid">
                <div>
                <div style={{ float: "right" }}>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.currentState} &nbsp;
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" onClick={this.add}>Add</a>
                                <a class="dropdown-item" href="#" onClick={this.remove}>Remove</a>
                                <a class="dropdown-item" href="#" onClick={this.preview}>Preview</a>
                        
                            </div>
                        </div>

                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                
                <div id="container-util" >
                    <RenderDefaultView/>
                </div>
            </div>
        )
    }
}

export {Image}

export default RenderStoredImages;