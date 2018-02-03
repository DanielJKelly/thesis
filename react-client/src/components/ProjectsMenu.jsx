import React from 'react';
import { Menu } from 'semantic-ui-react';
import TechsFilter from './TechsFilter.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleClick(e) {
  //   // this.props.handleCategoryClick(e.currentTarget.dataset.cat);
  // }

  render() {
    return (
      <Menu className="projectMenu">
        <Menu.Item className="projectMenuItem" onClick={this.props.getProjects}>
          Latest
        </Menu.Item>
        <Menu.Item className="projectMenuItem">
          <TechsFilter getProjectsByTechs={this.props.getProjectsByTechs} />
        </Menu.Item>
        <Menu.Item className="projectMenuItem" onClick={this.props.getProjects}>
          Popular
        </Menu.Item>
      </Menu>
    );
  }
}

export default ProjectsMenu;