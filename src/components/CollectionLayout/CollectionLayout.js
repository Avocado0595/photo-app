import './CollectionLayout.scss';
import React from 'react';
import {Row, Col} from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';

function CollectionLayout(props) {
    const match = useRouteMatch();
    const {collectionPhotos, collection} = props;
    const getCollectionName = (collectionId)=>{
        return collection.userCollection.find(c=>c.categoryId === collectionId);
    }
    //
    if(!collection.isLoadUserCollection){
    return (
        <Row>
            {collectionPhotos.map((collect,idx)=>{
                if(collect[0])   
                return(
                    <Col key={idx} lg="3" md="6" sm="6">
                        <Link to={`${match.url}/${collect[0].categoryId}`}> 
                        <div className="collect-layout">
                            <div className="collect-modal"></div>
                            {collect[0]? <img alt="thumb-1" className="collect-item img-1" src={collect[0].photoUrl}/>:null}
                            {collect[1]? <img alt="thumb-2" className="collect-item img-2" src={collect[1].photoUrl}/>:null}
                            {collect[2]? <img alt="thumb-3" className="collect-item img-3" src={collect[2].photoUrl}/>:null}
                        </div>
                            <h4>{getCollectionName(collect[0].categoryId).categoryName}</h4>
                            </Link>
                    </Col>
                )
                else
                    return null;
            })}
            
           
        </Row>
    );
        }
        else{
            return (<LoadingComponent/>);
        }
}

export default CollectionLayout;