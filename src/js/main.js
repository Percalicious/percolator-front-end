import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import './app.parallax';
import  'chart.js';
import 'angular-chart.js';

Chart.defaults.global.colors = ['#84DB2E', '#50CCEB', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

//import SERVERS
import { serverConstant } from './servers/server.constant';

//import config
import { config } from './utilities/config';

//import run
import { run } from './utilities/run';

//import services
import { HostService } from './services/host.service';
import { WealthService } from './services/wealth.service';
import { MailService } from './services/mailgun.service';

//import Controllers
import { LayoutController } from './controllers/layout.controller';
import { HomeController } from './controllers/home.controller';
import { CreateAccountController } from './controllers/create.account.controller';
import { HostController } from './controllers/host.controller';
import { HostMyEventsController } from './controllers/host.my.events.controller';
import { HostMyContactsController } from './controllers/host.my.contacts.controller';
import { GuestController } from './controllers/guest.controller';
import { EventHostController } from './controllers/event.host.controller';
import { EventGuestController } from './controllers/event.guest.controller';
import { EventCreateController } from './controllers/event.create.controller';

angular
	.module('app', ['angular-parallax', 'ui.router', 'ngCookies', 'chart.js'])
	.config(config)
	.service('WealthService', WealthService)
	.service('MailService', MailService)
	.service('HostService', HostService)
	.constant('SERVER', serverConstant)
	.run (run)
	.controller('LayoutController', LayoutController)
	.controller('HomeController', HomeController)
	.controller('CreateAccountController', CreateAccountController)
	.controller('HostController', HostController)
	.controller('HostMyEventsController', HostMyEventsController)
	.controller('HostMyContactsController', HostMyContactsController)
	.controller('GuestController', GuestController)
	.controller('EventHostController', EventHostController)
	.controller('EventGuestController', EventGuestController)
	.controller('EventCreateController', EventCreateController)
	;
