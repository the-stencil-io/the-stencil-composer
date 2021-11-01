import React from 'react';

import { API } from '../../deps';


// return all labels (locales, labelValues) for each link

interface LinkLabelsProps {
  link: API.CMS.Link;
}

const LinkLabels: React.FC<LinkLabelsProps> = ({ link }) => {

  /*
  
                <TableCell className={classes.bold} align="left"><FormattedMessage id="workflow.technicalname" /></TableCell>
                <TableCell className={classes.bold} align="left"><FormattedMessage id="locale" /></TableCell>
                                <TableCell className={classes.tableCell} align="left">{workflow.body.name}</TableCell>
                  <TableCell className={classes.tableCell} align="left">{site.locales[workflow.body.locale].body.value}</TableCell>
  */

  const linkLabels = link.body.labels.map(linkLabel => {


    return (
      <div key={linkLabel.locale}>
        <div>
          {linkLabel.locale}
        </div>

        <div>
          {linkLabel.labelValue}
        </div>
      </div>
    )
  });


  return (
    <div>
      { linkLabels}

    </div>
  )
}

export { LinkLabels }