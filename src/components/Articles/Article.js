import React, { Component } from "react";
import { getArticle } from "../../redux/actioncreators/getArticleActions";
import { deleteArticle } from "../../redux/actioncreators/deleteArticle";
import { rateArticle } from "../../redux/actioncreators/postRatingActions";
import { averageRating } from "../../redux/actioncreators/getRatingActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    Image,
    Segment,
    Button,
    Container,
    Divider,
    Item,
    Rating
} from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import Loader from "../Loader/Loader";
import "./Article.scss";
import { likeFunction } from '../../redux/actioncreators/likeDislikeArticle'
import { dislikeFunction } from '../../redux/actioncreators/likeDislikeArticle'
import { LikeDislike } from './LikeDislike'

export class Article extends Component {
    state = {};
    componentDidMount() {
        this.props.getArticle();
        this.props.averageRating();
    }
    handleDelete = (e, article_slug) => {
        e.preventDefault();
        this.props.deleteArticle(article_slug);
    };

    handleClick = (e, article_slug) => {
        e.preventDefault();
        this.props.rateArticle(article_slug);
    };
    handleRate = (e, { rating }) => {
        this.props.rateArticle(rating);
    };

    render() {
        const { article } = this.props
        const edit_link = "/articles/" + article.slug + "/edit_article/";
        const user = JSON.parse(localStorage.getItem("user"))
        let editdeleteOptions = null
        if (Object.keys(article).length !== 0 && user) {
            editdeleteOptions = user.username === article.author.username ? (
                <Container textAlign='right'>
                    <Button size="mini" as={Link} to={edit_link} content="Edit" icon="edit" color='blue' />
                    <Button size="mini" content="Delete" color='red' icon="delete"
                        onClick={e => { this.handleDelete(e, article.slug) }} />

                </Container>
            ) : (
                    null
                )
        }
        const articleRender = () => {
            if (this.props.isFetching) {
                return (<Loader
                    className={this.props.isFetching
                        ? "active"
                        : "inactive"}
                    size='large' />)
            }
            if (!article.title) {
                return (
                    <div>
                        <h1>Article Not Found</h1>
                    </div>
                )
            }
            const likecomponent = () => {
                if (user) {
                    return (
                        <LikeDislike props={this.props} />
                    )
                }
                else {
                    return <LikeDislike disabled="true" props={this.props} />
                }
            }
            return (
                <div>
                    <Segment className="articledetail">
                        {editdeleteOptions}
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header>
                                        <h1 className="article-title">{article.title}</h1>
                                    </Item.Header>
                                    <br></br>
                                    <Item.Meta>
                                        <Image className="ui avatar image" src={article.author.image.slice(13)} />
                                        <span>{article.author.username}</span>
                                    </Item.Meta>
                                    <br></br>
                                    <Item.Description>
                                        <Image className="topImage"
                                            src={article.image ?
                                                article.image.slice(13)
                                                : "https://www.impossible.sg/wp-content/uploads/2013/11/seo-article-writing.jpg"}
                                        />
                                        <Divider />
                                        <div className="articlebody">
                                            {ReactHtmlParser(article.body)}
                                        </div>
                                    </Item.Description>
                                    <br></br>
                                    <Item.Extra>
                                        Created at: {article.created_at.slice(0, 10)}
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Rating
                                            maxRating={5}
                                            defaultRating={this.props.user_rating}
                                            icon="star"
                                            size="massive"
                                            onRate={this.handleRate}
                                        />
                                    </Item.Extra>
                                    <Item.Extra>
                                        Average Rating: {this.props.average_rating}
                                    </Item.Extra>
                                    <Item.Extra>
                                        {likecomponent()}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </div>
            )
        }

        return (
            <div>
                {articleRender()}
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.articlesReducer.isFetching,
        article: state.articlesReducer.article,
        liked: state.articlesReducer.liked,
        disliked: state.articlesReducer.disliked,
        like_status: state.likeDislikeReducer.like_status,
        dislike_status: state.likeDislikeReducer.dislike_status,
        likes_count: state.likeDislikeReducer.likes_count,
        dislikes_count: state.likeDislikeReducer.dislikes_count,
        likeSuccess: state.likeDislikeReducer.likeSuccess,
        dislikeSuccess: state.likeDislikeReducer.dislikeSuccess,
        user_rating: state.ratingsReducer.user_rating,
        average_rating: state.ratingsReducer.average_rating
    }
}

export default connect(mapStateToProps, { deleteArticle, getArticle, rateArticle, averageRating, likeFunction, dislikeFunction })(Article)
