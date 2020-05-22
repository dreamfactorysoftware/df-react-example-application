import React, { Component } from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom';
import LogInAndOutButton from '../common/LogInAndOutButton';
import auth from '../services/auth';

const HomePage = () => {
  return (<ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
      	Home Page
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as={Link}>Sitemap</List.Item>
                <List.Item as={Link}>Contact Us</List.Item>
                <List.Item as={Link}>Religious Ceremonies</List.Item>
                <List.Item as={Link}>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as={Link}>Banana Pre-Order</List.Item>
                <List.Item as={Link}>DNA FAQ</List.Item>
                <List.Item as={Link}>How To Access</List.Item>
                <List.Item as={Link}>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>);
};

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Contacts'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='An example application made with DreamFactory and React'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.4em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

class DesktopContainer extends Component {
  state = {
  	isAuthenticated: auth.isAuthenticated,
  }
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  onLogOut = () => {
  	this.setState({ isAuthenticated: auth.isAuthenticated });
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={Link} active>
                  Home
                </Menu.Item>
                {this.state.isAuthenticated && (
              	<React.Fragment>
                	<Menu.Item as={Link} to='/contact'>Contacts</Menu.Item>
        					<Menu.Item as={Link} to='/group'>Groups</Menu.Item>
      					</React.Fragment>
        				)}
                <Menu.Item position='right'>
                  <LogInAndOutButton onLogOut={this.onLogOut} />
                	{!this.state.isAuthenticated && (
                  <Button as={Link} to='/register' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Register
                  </Button>
        					)}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} active>
            Home
          </Menu.Item>
          <Menu.Item as={Link}>Work</Menu.Item>
          <Menu.Item as={Link}>Company</Menu.Item>
          <Menu.Item as={Link}>Careers</Menu.Item>
          <Menu.Item as={Link}>Log in</Menu.Item>
          <Menu.Item as={Link}>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as={Link} inverted>
                    Log in
                  </Button>
                  <Button as={Link} inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

export default HomePage;
