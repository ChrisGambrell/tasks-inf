// useEffect(() => {
// 	const handleKeyDown = (e) => {
// 		switch (e.keyCode) {
// 			case 27:
// 				dispatch({ type: 'set', payload: { open: -1, selected: [], showAddingTask: false } })
// 				break
// 			default:
// 				break
// 		}
// 	}

// 	const handleMouseDown = (e) => {
// 		let currElement = e.srcElement
// 		while (currElement.parentElement) {
// 			currElement = currElement.parentElement
// 			if (
// 				currElement.id === 'Toolbar' ||
// 				currElement.id.includes('task-') ||
// 				currElement.id === 'contextmenu' ||
// 				currElement.className?.includes('mantine-DatePicker')
// 			)
// 				return
// 		}

// 		dispatch({ type: 'set', payload: { open: -1, selected: [] } })
// 	}

// 	document.addEventListener('keydown', handleKeyDown)
// 	document.addEventListener('mousedown', handleMouseDown)
// 	return function cleanup() {
// 		document.removeEventListener('keydown', handleKeyDown)
// 		document.removeEventListener('mousedown', handleMouseDown)
// 	}
// }, [state.open])

export { default as SideMenu } from './SideMenu'
export { default as TaskContextMenu } from '../archive/TaskContextMenu'
export { default as TaskForm } from './TaskForm'
export { default as TaskList } from './TaskList'
export { default as TaskListItem } from './TaskListItem'
export { default as TaskToolbar } from './TaskToolbar'
