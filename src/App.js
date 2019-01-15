// import React, components, CSS
import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import Image from "./components/Image";
import Button from "./components/Button";
import './App.css';

// get all images and format them into objects
function importAll(r) {
    let links = {};
    let allkeys = r.keys().map((item) => {
        // get rid of some extra in names
        let key = item.replace('./', '');
        links[key] = r(item);
        return key;
    });
    let allImagesObj = { keys: allkeys, links: links };
    return allImagesObj;
}

// call function to import images
const imagesObj = importAll(require.context('./images', false, /\.(png)$/));

// main content for this file:
class App extends Component {
    state = {
        // difficulty level
        level: 12,
        // buttons to change difficulty
        buttons: [12, 16, 24, 36],
        // whether player has won yet
        won: false,
        // score: images clicked w/o repeat
        score: 0,
        // images for this round
        images: []
    };

    // method to generate images, called on level change
    generateImageGroup = (gameLevel, allImages) => {
        // array to return, will be filled with image objects
        let imageGroup = [];
        // determine random, no doubles
        let indexList = [];
        // loop to choose random selection
        for (let i = 0; i < gameLevel; i++) {
            let imageIndex = Math.floor((Math.random() * 50))
            if (!(indexList.includes(imageIndex))) {
                indexList.push(imageIndex)
            }
            else {
                i--
            }
        }
    
        // loop to build objects based on selection above
        for (let j = 0; j < indexList.length; j++ ) { 
            let name = allImages.keys[indexList[j]];
            let imageObj = {
                name: name,
                link: allImages.links[name],
                wasclicked: false
            }
            imageGroup.push(imageObj);
        };
        indexList.length = 0
        return imageGroup;
    }

    // method to reset game on level click
    handleLevelClick = id => {
        let levelImages = this.generateImageGroup(id, imagesObj);
        this.setState({
            level: id,
            images: levelImages,
            won: false,
            score: 0
        })
    }

    // method to handle click on image
    handleImageClick = id => {
        // set based on whether the image was previously clicked
        const imageIsRepeat = this.state.images[id].wasclicked;
        // if user got through all pictures with no repeats, user wins
        if ((this.state.score === this.state.level - 1) && !imageIsRepeat) {
            this.setState((state) => { 
                return { 
                    won: true, 
                    score: state.score + 1
                } 
            });
        }
        // if user didn't win on this click
        else {
            // if the image is repeated, reset
            if (imageIsRepeat) {
                let levelImages = this.generateImageGroup(this.state.level, imagesObj);
                this.setState({
                    images: levelImages,
                    won: false,
                    score: 0
                })
            }
            // if the user hasn't won yet, and the image is not a repeat
            else {
                this.setState((state) => {
                    // set "wasclicked" on the image 
                    // in the frozen state fed into this method
                    state.images[id].wasclicked = true
                    // shuffle the images in the frozen state
                    let newImages = state.images.sort( () => Math.random() - 0.5);
                    // feed the shuffled images back into the live state,
                    // and up the score by 1
                    return {
                        score: state.score + 1,
                        images: newImages
                    }
                });
            }
        }
    }

    render() {
        return (
            // everything that shows on the page
            <div className="App text-white">
                {/* contains everything */}
                <Row height="auto md-100">
                    {/* contains the nav sidebar */}
                    <Col size="12 md-2" height="auto md-100">
                        <nav className="nav flex-row flex-md-column px-2 py-md-5 bg-green h-auto h-md-100">
                            <div className="d-flex flex-row flex-wrap mx-auto">
                                {/* create all the level buttons */}
                                {this.state.buttons.map(button => (
                                    <Button
                                        onClick={() => this.handleLevelClick(button)}
                                        key={button}
                                        text={button}
                                    />
                                ))}
                            </div>
                            <br />
                            <h4>Score: {this.state.score}</h4>
                            <br />
                            <br />
                            <p>Choose your difficulty above, then click on each image to play. Can you get through them all without repeating yourself?</p>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <p>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>, licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></p>
                        </nav>
                    </Col>
                    {/* contains non-navbar area */}
                    <Col size="12 md-10">
                        <Container name="mt-3 mr-md-5 px-5 mw-100">
                            {/* display images, when they exist and user hasn't won */}
                            {/* if user won, display winning message */}
                            {((this.state.images && !this.state.won) && 
                            <Row> 
                                {this.state.images.map((image, index) => {
                                    let columnWidth = (this.state.level < 17 ? 3 : 2).toString();
                                    let columnAndImage = <Col key={index} size={`3 md-${columnWidth}`}>
                                        <Image 
                                            key={image.name}
                                            name={image.name}
                                            url={image.link}
                                            onClick={() => this.handleImageClick(index)}
                                            />
                                    </Col>
                                    return columnAndImage
                                })}
                            </Row>
                            ) || (this.state.won && 
                                <div className="m-auto bg-green rounded border-white">
                                    <br/>
                                    <h1 className="text-center py-5 my-5">You Won!</h1>
                                    <br/>
                                </div>)
                            }
                        </Container>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
