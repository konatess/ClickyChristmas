import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import Image from "./components/Image";
import Button from "./components/Button";
import './App.css';

function importAll(r) {
    let links = {};
    let allkeys = r.keys().map((item) => {
        let key = item.replace('./', '');
        links[key] = r(item);
        return key;
    });
    let allImagesObj = { keys: allkeys, links: links };
    return allImagesObj;
}

const imagesObj = importAll(require.context('./images', false, /\.(png)$/));

class App extends Component {
    state = {
        level: 12,
        buttons: [12, 16, 24, 36],
        won: false,
        score: 0,
        // imagenames: ["angel.png", "bauble.png", "bell.png", "bonfire.png", "boot.png", "boy.png", "breakfast.png", "cabin.png", "candies.png", "candle.png"],
        images: []
    };

    generateImageGroup = (gameLevel, allImages) => {
        let imageGroup = [];
        let indexList = [];
        for (let i = 0; i < gameLevel; i++) {
            let imageIndex = Math.floor((Math.random() * 50))
            if (!(indexList.includes(imageIndex))) {
                indexList.push(imageIndex)
            }
            else {
                i--
            }
        }
    
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

    handleLevelClick = id => {
        console.log("clicked");
        console.log(id);
        let levelImages = this.generateImageGroup(id, imagesObj);
        this.setState({
            level: id,
            images: levelImages,
            won: false
        })
    }

    handleImageClick = id => {
        console.log("clicked");
        console.log(id);
        const imageIsRepeat = this.state.images[id].wasclicked;
        if (this.state.score === this.state.level - 1) {
            this.setState({ won: true})
        }
        else {
            
            if (imageIsRepeat) {
                let levelImages = this.generateImageGroup(this.state.level, imagesObj);
                this.setState({
                    images: levelImages,
                    won: false,
                    score: 0
                })
            }
            else {
                this.setState((state) => {
                    state.images[id].wasclicked = true
                    let newImages = state.images.sort( () => Math.random() - 0.5);
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
            <div className="App text-white h-md-100">
                <Row height="auto md-100">
                    <Col size="12 md-2" height="auto md-100">
                        <nav className="nav flex-row flex-md-column px-2 py-md-5 bg-green h-auto h-md-100">
                            <div className="d-flex flex-row flex-wrap mx-auto">
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
                            <p>Choose your difficulty above, then click on each image to play. Can you get throught them all without repeating yourself?</p>
                            <br/>
                            <p>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>, licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></p>
                        </nav>
                    </Col>
                    <Col size="12 md-10">
                        <Container className="m-5 border-white">
                            {((this.state.images && !this.state.won) && this.state.images.map((image, index) => (
                                <Image 
                                    key={image.name}
                                    name={image.name}
                                    url={image.link}
                                    onClick={() => this.handleImageClick(index)}
                                />
                                ))) || (this.state.won && 
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
