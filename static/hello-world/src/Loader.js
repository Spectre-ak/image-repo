


function LoaderWithoutTimer(props){
    return(
        <div>
             <div class="text-center">
                <div class="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
       
    )
}

export {LoaderWithoutTimer};

export default LoaderWithoutTimer;