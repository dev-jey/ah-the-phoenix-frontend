import React, { Component } from 'react'
import { Item, Image } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom'

export class ArticlesContainer extends Component {
    render() {
        const { articles } = this.props
        const articleList = articles.length !== 0 ? (articles.map(article => {
            const articleUrl = "/articles/" + article.slug
            const userProfileUrl = "/profile/" + article.author.id
            return <Item key={article.slug} className="animated fadeInUp">
                <Item.Image
                    src={article.image ?
                        article.image.replace("image/upload/", "")
                        : "https://www.impossible.sg/wp-content/uploads/2013/11/seo-article-writing.jpg"}
                    size="medium" />
                <Item.Content>
                    <Item.Header as={Link} to={articleUrl}>

                        <h2>{article.title}</h2>
                    </Item.Header>
                    <Item.Extra as={Link} to={userProfileUrl}>
                        <Image className="ui avatar image" src={article.author.image.slice(13)} />
                        <span>{article.author.username}</span>
                    </Item.Extra>
                    <Item.Description>
                        {article.description}
                        <NavLink to={articleUrl}>...read more</NavLink>
                    </Item.Description>
                    <Item.Extra>
                        Created at: {article.created_at.slice(0, 11)}
                    </Item.Extra>
                </Item.Content>
            </Item>

        })) : (
                <h3>Oops! No articles to display</h3>
            )
        return (
            <div>
                <Item.Group divided className="article-list-item">
                    {articleList}
                    <br />
                </Item.Group>
            </div>
        )
    }
}

export default ArticlesContainer
