import './CollectionLayout.scss';
import React from 'react';
import {Row, Col} from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';

function CollectionLayout(props) {
    const match = useRouteMatch();
    const {collectionPhotos, collection} = props;
    const getCollectionName = (collectionId)=>{
        return collection.userCollection.find(c=>c.collectionId === collectionId);
    }
    if(!collection.isLoadUserCollection){
    return (
        <Row className="collection-tab">
            {collectionPhotos.map((collect,idx)=>{
                if(collect[0])   
                return(
                    <Col key={idx} lg="4" md="6" sm="6">
                        <Link className="collect-link" to={`${match.url}/${collect[0].collectionId}`}> 
                        <div className="collect-layout">
                            <div className="collect-modal"></div>
                            <div className="collection-big-img">
                                {collect[0]? <img alt="thumb-1" className="collect-item img-1" src={collect[0].photoUrl}/>:null}
                            </div>
                            <div className = "collection-small-img">
                                {collect[1]? <img alt="thumb-2" className="collect-item img-2" src={collect[1].photoUrl}/>:null}
                                {collect[2]? <img alt="thumb-3" className="collect-item img-3" src={collect[2].photoUrl}/>:null}
                            </div>
                        </div>
    
                        <div className="collection-description">
                        <div className="collection-title">{getCollectionName(collect[0].collectionId).collectionName}</div>
                        <div className="collection-no-photo">({collect.length>1?`${collect.length} photos`:`1 photo`})</div>
                        </div>
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