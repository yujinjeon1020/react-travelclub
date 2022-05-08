import React, {Component, useState} from 'react';
import '../../css/Modal.css';
import {Button} from "@material-ui/core";

const Modal = (props: any) => {
    //열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        //모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : ''}>
            {open ? (
                <section>
                    <header>
                        {header}
                        {/*<button className="close" onClick={close}>*/}
                        {/*    &times;*/}
                        {/*</button>*/}
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <Button
                            onClick={close}
                            variant='contained' size='small'>Close</Button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;