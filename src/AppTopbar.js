import React, {useRef}  from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';
import { useHistory } from 'react-router-dom';

export const AppTopbar = (props) => {
    const menu = useRef(null);
    const history = useHistory()
    let items = [
        {label: 'Logout', icon: 'pi pi-sign-out', command:() => {
            localStorage.removeItem('user') 
            history.push('/login')
            window.location.reload()    
            
        }},
        {label: 'Profile', icon: 'pi pi-user', command:() => {
            history.push('/profile')
        }},
    ];
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>Smart Hunting</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li> */}
                    <li>
                        <button className="p-link layout-topbar-button" onClick={(event) => menu.current.toggle(event)} >
                            <i className="pi pi-user"/>
                            <Menu model={items} popup ref={menu} /> 
                        </button>
                    </li>
                </ul>
        </div>
    );
}
