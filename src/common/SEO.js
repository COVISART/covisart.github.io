import PropTypes from "prop-types";
import React from 'react'


const SEO = ( {title} ) => {
    return (
        <>
            <meta charSet="utf-8" />
            <title>{title} | Covisart R&D Company</title>
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content="Covisart - Research and Development Company. We aim to increase the quality and production speed of the product with many R & D studies." />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </>
    )
}
SEO.propTypes = {
    title: PropTypes.string
};

export default SEO;


