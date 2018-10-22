import React from 'react';
import CategoryOverview from "../../components/CategoryOverview/CategoryOverview";


export default class HomePage extends React.Component {


    render(){
        return <div>
            <h1>Startseite</h1>
            <h3>Kategorien:</h3>
            <CategoryOverview/>
        </div>
    }
}