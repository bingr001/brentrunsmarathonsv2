import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import HeaderAlt from '../components/HeaderAlt';
import Header from '../components/Header';
import {htmlToReact} from '../utils';
import Footer from '../components/Footer';
import Helmet from "react-helmet";


export default class Post extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              {(_.get(this.props, 'pageContext.frontmatter.hide_header') === true) ? 
                <HeaderAlt {...this.props} />
               : 
                <Header {...this.props} site={this.props.pageContext.site} page={this.props.pageContext} img_path={_.get(this.props, 'pageContext.frontmatter.content_img_path')} />
              }
          <Helmet>
            <meta name="og:image" content={_.get(this.props, 'pageContext.frontmatter.thumb_img_path')} />
          </Helmet>
              <div id="content" className="site-content">
                <main id="main" className="site-main inner">
                  <article className="post post-full">
                    <header className="post-header">
                      <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                      <div className="post-meta">
                        <time className="published"
                          datetime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%A, %B %e, %Y')}</time>
                      </div>
                    </header>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                    </div>
                    }
                    <div className="post-content">
                      {htmlToReact(_.get(this.props, 'pageContext.html'))}
                    </div>
                  </article>
                </main>
                <Footer {...this.props} site={this.props.pageContext.site} page={this.props.pageContext} img_path={_.get(this.props, 'pageContext.frontmatter.content_img_path')} />
              </div>
            </Layout>
        );
    }
}
