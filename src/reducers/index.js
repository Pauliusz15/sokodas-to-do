import { combineReducers } from 'redux';

import fetchedTasks from './fetched-tasks';
import fetchedClients from './fetched-clients';
import loadedTask from './loaded-task';
import addTaskVisibility from './add-task-visibility';
import taskInfoState from './task-info-state';
import addClientVisibility from './add-client-visibility';
import editTaskVisibility from './edit-task-visibility';
import clientsVisibility from './clients-visibility';
import descriptionAddInput from './description-add-input';
import descriptionEditInput from './description-edit-input';
import clientInfoVisibility from './client-info-visibility';
import loadedClient from './loaded-client';
import clientEditVisibility from './client-edit-visibility';
import filteredTasks from './filtered-tasks';

const allReducers = combineReducers({
	fetchedTasks: fetchedTasks,
	fetchedClients: fetchedClients,
	loadedTask: loadedTask,
	addTaskVisibility: addTaskVisibility,
	taskInfoState: taskInfoState,
	addClientVisibility: addClientVisibility,
	editTaskVisibility: editTaskVisibility,
	clientsVisibility: clientsVisibility,
	descriptionAddInput: descriptionAddInput,
	descriptionEditInput: descriptionEditInput,
	clientInfoVisibility: clientInfoVisibility,
	loadedClient: loadedClient,
	clientEditVisibility: clientEditVisibility,
	filteredTasks: filteredTasks
});

export default allReducers;
