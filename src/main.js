import './main.css';
import BScroll from '@better-scroll/core';
import Scrollbar from '@better-scroll/scroll-bar';

BScroll.use(Scrollbar);

function letsGo() {
    const content = document.getElementById('content');
    const header = document.getElementById('header');

    const bs = new BScroll(content, {
        scrollbar: true,
        scrollY: true,
        wheel: true,
        probeType: 3, //3=Probe.realtime
    });
    let lastHeight = 0;

    {
        //this whole block is necessary to proxy header's scroll stuff to content
        const bs2 = new BScroll(header, {
            eventPassthrough: 'horizontal',
            scrollY: true,
            wheel: true,
            probeType: 3, //3=Probe.realtime
        });

        //proxy all events from one BScroll to the root BScroll
        bs2.scroller.actions.scrollBehaviorX = bs.scroller.actions.scrollBehaviorX;
        bs2.scroller.actions.scrollBehaviorY = bs.scroller.actions.scrollBehaviorY;
        bs2.scroller.actions.animater = bs.scroller.actions.animater;
        bs2.scroller.actions.hooks = bs.scroller.actions.hooks;

        //we start one slight movement to activate momentum in the additionalHandler
        bs.scroller.actions.actionsHandler.hooks.trigger(
            bs.scroller.actions.actionsHandler.hooks.eventTypes.move,
            {deltaX: 0, deltaY: 0, e: new TouchEvent('TouchEvent')}
        );
    }


    bs.on('scroll', (event) => {
        let scrollTop = event.y * -1;

        if (!scrollTop) content.style.paddingTop = '0px';

        header.style.setProperty('--scroll-animation-scroll-top', scrollTop + 'px');

        const heightChanged = content.offsetHeight !== lastHeight;

        if (!lastHeight) lastHeight = content.offsetHeight;
        content.style.paddingTop = (content.offsetHeight - lastHeight) + 'px';

        //we tell scrollbars to recalculate their dimensions since we changed our height
        if (heightChanged) {
          bs.trigger(bs.eventTypes.refresh)
        }
    });
}

window.addEventListener('DOMContentLoaded', letsGo);
