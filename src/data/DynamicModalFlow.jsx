export class TaskSideBar extends React.Component {
    render() {
        return (
            <>
                <section className="sidebar-btns-container ">
                    <h3 className="sidebar-title">Add to card</h3>
                    {addToTaskItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={(event) => {
                                this.toggleDynamicModal(true);
                                this.setState({ item });
                                position = event.target.getBoundingClientRect()
                            }}
                            className="add-item-btn flex row align-center">
                            <div className="btn-layover"></div>
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>

                    ))}
                </section>

                {isModalOpen && <DynamicModal
                    item={item.title}
                    toggleDynamicModal={this.toggleDynamicModal}
                    position={position}
                    {...this.props}
                />}
            </>
        )
    }
}


const addToTaskItems = [
    { icon: <AiOutlineUser />, title: 'Members', position },
    { icon: <MdLabelOutline />, title: 'Labels', position },
    { icon: <BsCheck2Square />, title: 'Checklist', position },
    { icon: <IoMdTime />, title: 'Dates', position },
    { icon: <ImAttachment />, title: 'Attachment', position },
    { icon: <BsCreditCard />, title: 'Cover', position },
]


export class DynamicModal extends React.Component {
    setDynamicModalContent = () => {
        const { item } = this.props;

        switch (item) {
            case 'Members':
                return <AddMembers {...this.props} />

            case 'Labels':
                return <LabelsList {...this.props} />

            case 'Checklist':
                return <AddChecklist {...this.props} />

            case 'Dates':
                return <AddDueDate {...this.props} />

            case 'Attachment':
                return <AddAttachment {...this.props} />

            case 'Edit Attachment':
                return <EditAttachment {...this.props} />

            case 'Cover':
                return <AddCover {...this.props} />
        }
    }


    render() {
        const { item, toggleDynamicModal, position } = this.props
        const { topPos, right } = taskService.getModalPosition(position)

        return (
            <section style={{ top: topPos, right }} className="dynamic-modal-container" >
                <div className="modal-header">
                    <span className="modal-header-title">{item}</span>
                    <button className="modal-close-btn icon-sm" onClick={() => toggleDynamicModal()}><IoMdClose /></button>
                </div>

                <div className="modal-content">
                    {this.setDynamicModalContent()}
                </div>
            </section>
        )
    }
}
