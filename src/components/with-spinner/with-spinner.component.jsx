import React from "react";

import { SpinnerContainer, SpinnerOverlay} from "./with-spinner.style";

const WithSpinner =  WrappedComponent => ({isLoading, ...otherProps}) => {
    if(isLoading){
        console.log("lodlkdkldd dkdkd kdkdkd kdkdkd kdkdkdk kdkd",isLoading);
        return (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        )
    }
    else {
        console.log("lodlkdkldd dkdkd kdkdkd kdkdkd kdkdkdk kdkd",isLoading);
        return(
            <WrappedComponent {...otherProps} />
        )
    }
};

export default WithSpinner;