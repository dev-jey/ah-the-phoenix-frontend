import React from 'react';
import {
    Item, Image
} from "semantic-ui-react";
import ReactHtmlParser from 'react-html-parser';

export const articleContainer = (article) => {
    const articleUrl = "/articles/" + article.slug
    const getWords = str => {
        return str.split(/\s+/).slice(0, 40).join(" ");
    }
    const body = getWords(article.body)
    return (
        <Item>
        <Item.Image
        src={article.image ?
        article.image.slice(13)
        : "https://www.impossible.sg/wp-content/uploads/2013/11/seo-article-writing.jpg"}
        size="medium" />
            <Item.Content>
                <Item.Header as='a'>
                    <h2>{article.title}</h2>
                </Item.Header>
                <Item.Extra>
                    <Image className="ui avatar image" src={article.author.image.slice(13)} />
                    <span>{article.author.username}</span>
                </Item.Extra>
                <Item.Description>
                    <p
                        style={{
                        fontSize: "1.3em",
                        fontFamily: "Helvetica"
                    }}>{ReactHtmlParser(body)}
                        <a href={articleUrl}>...read more</a>
                    </p>
                </Item.Description>
                <Item.Extra>
                    Created at: {article.created_at.slice(0, 10)}
                </Item.Extra>
            </Item.Content>
        </Item>   
    )
}