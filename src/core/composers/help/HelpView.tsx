import React from 'react';
import { List, Typography } from '@material-ui/core';




const HelpView: React.FC<{}> = () => {
  return (
    <div>
      <Typography variant="h3">Help Links</Typography>
      <List>
        <li><a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Markdown Syntax</a></li>
        <li><a href="https://github.com/the-stencil-io/the-stencil-composer/blob/dev/README-en.md" target="_blank">The Stencil CMS Alpha User Guide (English) </a></li>
        <li><a href="https://github.com/the-stencil-io/the-stencil-composer/blob/dev/README-fi.md" target="_blank"> Stencil CMS Alpha Käyttöohje (Finnish)</a></li>
      </List>
    </div>
  )
}

export { HelpView }