gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


let x = 1;
let text = document.querySelector("#txt");
let upmotion = () => {
    setInterval(() => {

        if (x % 3 === 0) {
            text.innerHTML = "developer";
        } else if (x % 3 === 1) {
            text.innerHTML = "designer";
        } else {
            text.innerHTML = "enthusiast";
        }
        gsap.from(text, {
            duration: 1,
            opacity: 1,
            y: 100
        })
        x++;
    }, 2000)

}

let tl = gsap.timeline();

function page1() {
    tl.from("nav h2, nav li", {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.3
    })

    tl.from(".hero-part1 h1,.hero-part1 h2,.hero-part1 p", {
        x: -100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3
    })

    tl.from(".hero-part2 img", {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        stagger: 0.3
    })
}
function page2() {
    gsap.from("#page2 h2", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 1
        }
    })

    gsap.from("#page2 .right", {
        opacity: 0,
        duration: 0.5,
        x: -100,
        stagger: 0.5,
        scrollTrigger: {
            trigger: "#page2 .skills",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 1
        }
    })

    gsap.from("#page2 .left", {
        opacity: 0,
        duration: 0.5,
        x: 100,
        stagger: 0.5,
        scrollTrigger: {
            trigger: "#page2 .left",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 1
        }
    })

    gsap.from("#page2 .bottom-right", {
        opacity: 0,
        duration: 0.5,
        x: -100,
        stagger: 0.5,
        scrollTrigger: {
            trigger: "#page2 .bottom-right",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 1
        }
    })
}

function clickproject() {
    let info = [
        {
            id: 0,
            project_title: "Community Management System",
            img: "assets/images/edu.png",
            description: "CMS for gated communities with payments and facility management. Admin dashboard with role-based access and analytics. Built with Next.js, Prisma, and ShadCN.",
            link: "#"
        },
        {
            id: 1,
            project_title: "Interactive Whiteboard",
            img: "assets/images/obys-clone.png",
            description: "Real-time collaborative whiteboard with synchronized drawing. Socket.IO for real-time communication and WebRTC voice feature. Built with MERN stack.",
            link: "#"
        },
        {
            id: 2,
            project_title: "Quick Chat Application",
            img: "assets/images/vid-craft.png",
            description: "Real-time messaging with user authentication and chat rooms. WebSocket connections with typing indicators and message history. Built with MERN stack.",
            link: "#"
        },
        {
            id: 3,
            project_title: "College Exam Portal",
            img: "assets/images/edu.png",
            description: "Exam system with timer, question bank, and result analytics. Designed for seamless academic evaluations.",
            link: "#"
        },
        {
            id: 4,
            project_title: "Apple Clone",
            img: "assets/images/apple-clone.png",
            description: "Pixel-perfect clone of the Apple homepage with smooth GSAP animations and responsive design.",
            link: "#"
        },
        {
            id: 5,
            project_title: "Galactic Canvas",
            img: "assets/images/galectic.png",
            description: "Interactive HTML canvas project featuring galactic particles and physics-based animations.",
            link: "#"
        },
        {
            id: 6,
            project_title: "Primer Clone",
            img: "assets/images/primier.png",
            description: "A sleek, modern clone of the Primer website, focusing on precise typography and layout.",
            link: "#"
        },
        {
            id: 7,
            project_title: "Vid Craft",
            img: "assets/images/vid-craft.png",
            description: "Video editing and crafting landing page showcasing modern UI/UX principles.",
            link: "#"
        }
    ]

    let inproject = document.querySelector(".inproject");
    let project = document.querySelectorAll(".col-box");
    let close = document.querySelector(".close");



    let wrapper = gsap.timeline();


    wrapper.from(".inproject .wrapper .side1 h1,.inproject .wrapper .side1 img", {
        opacity: 0,
        x: 100,
        duration: 0.5,
        stagger: 0.3
    })
    wrapper.from(".inproject .wrapper .side2 h5,.inproject .wrapper .side2 button, .inproject .close", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.3
    })
    wrapper.pause();
    project.forEach((e, idx) => {
        e.addEventListener("click", () => {
            let linkButton = document.querySelector("#link-btn1");
            let title = document.querySelector("#project-title");
            let imglink = document.querySelector("#wrapper-img");
            title.innerHTML = info[idx].project_title;
            imglink.src = info[idx].img;
            linkButton.href = info[idx].link;
            inproject.style.zIndex = 10;
            wrapper.play();
        })
    })

    close.addEventListener("click", () => {

        wrapper.reverse();
        setTimeout(() => {
            inproject.style.zIndex = 1;
        }, 2100)
    })

}

let initial = `M 10 50 Q 600 500 1200 500`

let final = `M 10 50 Q 600 50 1200 50`

let string = document.querySelector('.line')

string.addEventListener("mousemove", (e) => {
    initial = `M 10 50 Q ${e.x} ${e.y} 1200 50`
    gsap.to("svg path", {
        attr: { d: initial },
        duration: 0.3,
        ease: "power3.out"
    })
})

string.addEventListener("mouseleave", (e) => {
    gsap.to("svg path", {
        attr: { d: final },
        duration: 0.5,
        ease: "elastic.out(1,0.2)"
    })
})

function textScroll() {
    gsap.to(".textScroll h1", {
        transform: "translateX(-60%)",
        scrollTrigger: {
            trigger: ".textScroll",
            scroller: "#main",
            start: "top 0%",
            end: "top -100%",
            scrub: 1,
            pin: true
        }
    })
}


window.addEventListener("wheel", (e) => {
    // console.log(e);
    if (screen.width > 480) {
        if (e.deltaY > 0) {
            gsap.to(".marquee", {
                transform: "translateX(-200%)",
                repeat: -1,
                duration: 4,
                ease: "none"
            })
            gsap.to(".marquee i", {
                rotate: 0
            })
        }
        else if (e.deltaY < 0) {
            gsap.to(".marquee i", {
                rotate: 180
            })
            gsap.to(".marquee", {
                transform: "translateX(0)",
                repeat: -1,
                duration: 4,
                ease: "none"
            })
        }
    }
})

let allH1 = document.querySelectorAll("#page2 h3");

function page2text() {
    allH1.forEach((e) => {
        var clutter = ""
        let text = e.innerText.replace(/\s+/g, ' ');
        let splittedText = text.split("");
        splittedText.forEach((c) => {
            if (/\s/.test(c)) {
                clutter += `<span>&nbsp;</span>`
            } else {
                clutter += `<span>${c}</span>`
            }
        })
        e.innerHTML = clutter;
    })

    gsap.to("#page2 h3 span", {
        color: "#B5C18E",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#page2 h3",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 2
        }
    })
}

function page4text() {
    var clutter = ""
    let textElement = document.querySelector("#page4text");
    let content = textElement.innerText.replace(/\s+/g, ' ');
    let splittedText = content.split("");
    splittedText.forEach((c) => {
        if (/\s/.test(c)) {
            clutter += `<span>&nbsp;</span>`
        } else {
            clutter += `<span>${c}</span>`
        }
    })
    textElement.innerHTML = clutter;

    gsap.to("#page4 h6 span", {
        color: "#FFD0D0",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#page4 h6",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 2
        }
    })
}

let slider = document.querySelector(".options");
let menu = document.querySelector("nav .part3");
let menuClose = document.querySelector(".options i")

let menutime = gsap.timeline();
menutime.from(slider, {
    x: 400,
    duration: 0.5,
    ease: "power3.out"
})

menutime.from(".options ul li, .options i", {
    x: 100,
    duration: 0.5,
    opacity: 0,
    stagger: 0.3,
    ease: "power3.out"
})

menutime.pause();
menu.addEventListener("click", function () {
    slider.style.display = "flex";
    menutime.play();
})

menuClose.addEventListener("click", function () {
    menutime.reverse();
    setTimeout(() => {
        slider.style.display = "none";
    }, 2000)
})

function journeyAnimation() {
    gsap.from("#journey h2", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: "#journey",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 2
        }
    });

    gsap.from("#journey .item", {
        x: -50,
        opacity: 0,
        stagger: 0.3,
        scrollTrigger: {
            trigger: "#journey",
            scroller: "#main",
            start: "top 55%",
            end: "top 10%",
            scrub: 2
        }
    });

    gsap.from("#achievements h2", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: "#achievements",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            scrub: 1
        }
    });

    gsap.from(".ach-box", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#achievements",
            scroller: "#main",
            start: "top 55%",
            end: "top 10%",
            scrub: 1
        }
    });
}

page1()
if (screen.width > 550) {
    page2()
    page2text()
    page4text()
    journeyAnimation()
    console.log(screen.width);
}
if (screen.width < 500) {
    gsap.to(".marquee", {
        transform: "translateX(0%)",
        repeat: -1,
        duration: 5,
        ease: "none"
    })
}
clickproject()
upmotion()
textScroll()

// Refresh ScrollTrigger after all initializations
ScrollTrigger.refresh();
locoScroll.update();


