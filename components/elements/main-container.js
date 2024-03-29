const Container = ({children, slug}) => {
	
	const mainPages = [
		'',
		'empresa',
		'produtos',
		'informacoes',
		'contato'
	];
	const theme = mainPages.includes(slug)
		? 'bg-rbx-porto bg-fixed bg-cover py-36'
		: 'bg-rbx-wood bg-repeat py-36';

	return <div id="main-container" className={theme} >{children}</div>
}
export default Container;