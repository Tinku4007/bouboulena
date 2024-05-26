import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Box, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useNavigationDataQuery } from '../store/service/HomeService';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const [open, setOpen] = React.useState(true);
  const [openSecondLevel, setOpenSecondLevel] = React.useState(false);
  const { data: navigation } = useNavigationDataQuery()

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };

  return (
    <Drawer open={openSidebar} onClose={() => setOpenSidebar(false)} sx={{ zIndex: 99 }} className='z-10'>
      <Box sx={{ width: { xs: "98vw", sm: "47vw", md: "33vw", lg: "26vw" } }}>
        <CloseIcon onClick={() => setOpenSidebar(false)} sx={{textAlign:'right', position:'absolute', right:'45px', top:'15px', cursor:'pointer'}}/>
        <ul className='pt-20 px-10'>
          < List >
            <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpenSidebar(false)}>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </NavLink>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="Categories" />
              {open ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={!open} timeout="auto" unmountOnExit>
              <ListItem button onClick={handleClickSecondLevel}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="All Ads" />
                {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {/* {navigation?.data && Object.keys(navigation?.data).map(category => ( */}
              {navigation?.data && Object.keys(navigation?.data).filter(category => {
                console.log(category)
                return navigation?.data[category].some(item => item.total > 0);
              }).map(category => (
                <List key={category} component="div" disablePadding>
                  {navigation?.data[category]?.map((navLinks, index) => {
                    if (navLinks.is_parent == 1) {
                      return (
                        <Collapse key={index} in={openSecondLevel} timeout="auto" unmountOnExit>
                          {
                            navLinks.content.map((subCat, index) => {
                              return (
                                <HashLink key={index} to={`/#${subCat.cat_name}`} onClick={() => setOpenSidebar(false)}>
                                  <List component="div" disablePadding>
                                    <ListItem button>
                                      <ListItemIcon>
                                      </ListItemIcon>
                                      <ListItemIcon>
                                      </ListItemIcon>
                                      <ListItemText primary={subCat.cat_name} />
                                    </ListItem>
                                  </List>
                                </HashLink>
                              )
                            })}
                        </Collapse>
                      )
                    } else {
                      return (
                        <HashLink to={`/#${navLinks.content.cat_name}`} onClick={() => setOpenSidebar(false)}>
                          <List component="div" disablePadding>
                            <ListItem button>
                              <ListItemIcon>
                              </ListItemIcon>
                              <ListItemText primary={navLinks.content.cat_name} />
                            </ListItem>
                          </List>
                        </HashLink>
                      )
                    }
                  })}
                </List>
              ))}
            </Collapse>
            <NavLink to='/about_us' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpenSidebar(false)}>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText primary="About" />
                </ListItem>
              </List>
            </NavLink>
            <NavLink to='/contact' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpenSidebar(false)}>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </NavLink>
          </List>
        </ul>
      </Box>
    </Drawer >
  )
}

export default Sidebar;
