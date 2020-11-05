import {Nav, Navbar} from 'react-bootstrap'

function Navigation() {
  return (
    <Navbar expand="lg" >
            <Navbar.Brand href="/">
                Logo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto nav-center">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/CarListing">Car Listing</Nav.Link>
                    </Nav.Item>
                </Nav> 
            </Navbar.Collapse>

        </Navbar>
  );
}

export default Navigation;
