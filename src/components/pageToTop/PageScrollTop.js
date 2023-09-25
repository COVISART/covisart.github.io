import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const PageScrollTop = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return props.children;
};
export default PageScrollTop;