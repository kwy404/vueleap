var Md = Object.defineProperty;
var Fd = (e, t, i) => t in e ? Md(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var Ot = (e, t, i) => Fd(e, typeof t != "symbol" ? t + "" : t, i);
/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function cr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const wi = () => !1, $i = Object.assign, Ud = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Vd = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Gd = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Kd = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", jd = /* @__PURE__ */ cr(Ud), Wd = /* @__PURE__ */ cr(Vd), Qd = /* @__PURE__ */ cr(Gd), $d = /* @__PURE__ */ cr(Kd);
/**
* @vue/compiler-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Hd = /* @__PURE__ */ Symbol(""), Yd = /* @__PURE__ */ Symbol(""), Jd = /* @__PURE__ */ Symbol(""), Xd = /* @__PURE__ */ Symbol(
  ""
);
function Zd(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
  });
}
const Rh = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function qd(e, t = "") {
  return {
    type: 0,
    source: t,
    children: e,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: Rh
  };
}
function oa(e, t = !1, i = Rh, a = 0) {
  return {
    type: 4,
    loc: i,
    content: e,
    isStatic: t,
    constType: t ? 3 : a
  };
}
const Ll = new Uint8Array([123, 123]), Rl = new Uint8Array([125, 125]);
function Ml(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function tt(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function _t(e) {
  return e === 47 || e === 62 || tt(e);
}
function Hi(e) {
  const t = new Uint8Array(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t;
}
const Re = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
let zd = class {
  constructor(t, i) {
    this.stack = t, this.cbs = i, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = Ll, this.delimiterClose = Rl, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Ll, this.delimiterClose = Rl;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(t) {
    let i = 1, a = t + 1;
    const l = this.newlines.length;
    let h = -1;
    if (l > 100) {
      let c = -1, p = l;
      for (; c + 1 < p; ) {
        const u = c + p >>> 1;
        this.newlines[u] < t ? c = u : p = u;
      }
      h = c;
    } else
      for (let c = l - 1; c >= 0; c--)
        if (t > this.newlines[c]) {
          h = c;
          break;
        }
    return h >= 0 && (i = h + 2, a = t - this.newlines[h]), {
      column: a,
      line: i,
      offset: t
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const i = this.index + 1 - this.delimiterOpen.length;
        i > this.sectionStart && this.cbs.ontext(this.sectionStart, i), this.state = 3, this.sectionStart = i;
      } else
        this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    const i = this.sequenceIndex === this.currentSequence.length;
    if (!(i ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      _t(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.inRCDATA = !1;
    else if (!i) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || tt(t)) {
        const i = this.index - this.currentSequence.length;
        if (this.sectionStart < i) {
          const a = this.index;
          this.index = i, this.cbs.ontext(this.sectionStart, i), this.index = a;
        }
        this.sectionStart = i + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Re.TitleEnd || this.currentSequence === Re.TextareaEnd && !this.inSFCRoot ? !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === Re.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Re.Cdata.length && (this.state = 28, this.currentSequence = Re.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      const i = this.buffer.charCodeAt(this.index);
      if (i === 10 && this.newlines.push(this.index), i === t)
        return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Re.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, i) {
    this.enterRCDATA(t, i), this.state = 31;
  }
  enterRCDATA(t, i) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = i;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : Ml(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    _t(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (_t(t)) {
      const i = this.buffer.slice(this.sectionStart, this.index);
      i !== "template" && this.enterRCDATA(Hi("</" + i), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    tt(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = Ml(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || tt(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? this.state = 7 : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : tt(t) || this.handleAttrStart(t);
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : tt(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    (t === 61 || _t(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || _t(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || _t(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || _t(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || _t(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : tt(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : tt(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, i) {
    (t === i || this.fastForwardTo(i)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(
      i === 34 ? 3 : 2,
      this.index + 1
    ), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    tt(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : (t === 39 || t === 60 || t === 61 || t === 96) && this.cbs.onerr(
      18,
      this.index
    );
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = Re.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === Re.ScriptEnd[3] ? this.startSpecial(Re.ScriptEnd, 4) : t === Re.StyleEnd[3] ? this.startSpecial(Re.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === Re.TitleEnd[3] ? this.startSpecial(Re.TitleEnd, 4) : t === Re.TextareaEnd[3] ? this.startSpecial(Re.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      const i = this.buffer.charCodeAt(this.index);
      switch (i === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
        case 1: {
          this.stateText(i);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(i);
          break;
        }
        case 3: {
          this.stateInterpolation(i);
          break;
        }
        case 4: {
          this.stateInterpolationClose(i);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(i);
          break;
        }
        case 32: {
          this.stateInRCDATA(i);
          break;
        }
        case 26: {
          this.stateCDATASequence(i);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(i);
          break;
        }
        case 12: {
          this.stateInAttrName(i);
          break;
        }
        case 13: {
          this.stateInDirName(i);
          break;
        }
        case 14: {
          this.stateInDirArg(i);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(i);
          break;
        }
        case 16: {
          this.stateInDirModifier(i);
          break;
        }
        case 28: {
          this.stateInCommentLike(i);
          break;
        }
        case 27: {
          this.stateInSpecialComment(i);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(i);
          break;
        }
        case 6: {
          this.stateInTagName(i);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(i);
          break;
        }
        case 9: {
          this.stateInClosingTagName(i);
          break;
        }
        case 5: {
          this.stateBeforeTagName(i);
          break;
        }
        case 17: {
          this.stateAfterAttrName(i);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(i);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(i);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(i);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(i);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(i);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(i);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(i);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(i);
          break;
        }
        case 23: {
          this.stateInDeclaration(i);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(i);
          break;
        }
        case 25: {
          this.stateBeforeComment(i);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(i);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === Re.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, i) {
  }
};
function Fl(e, { compatConfig: t }) {
  const i = t && t[e];
  return e === "MODE" ? i || 3 : i;
}
function Mh(e, t) {
  const i = Fl("MODE", t), a = Fl(e, t);
  return i === 3 ? a === !0 : a !== !1;
}
function Yi(e, t, i, ...a) {
  return Mh(e, t);
}
function em(e) {
  throw e;
}
function tm(e) {
}
function sm(e, t, i, a) {
  const l = `https://vuejs.org/error-reference/#compiler-${e}`, h = new SyntaxError(String(l));
  return h.code = e, h.loc = t, h;
}
const im = (e) => e.type === 4 && e.isStatic;
function rm(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return Hd;
    case "Suspense":
    case "suspense":
      return Yd;
    case "KeepAlive":
    case "keep-alive":
      return Jd;
    case "BaseTransition":
    case "base-transition":
      return Xd;
  }
}
function nm(e, t) {
  return !!(e && im(e) && e.content === t);
}
function Ul(e) {
  return e.type === 7 && e.name === "pre";
}
const am = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function om(e) {
  for (let t = 0; t < e.length; t++)
    if (!tt(e.charCodeAt(t)))
      return !1;
  return !0;
}
const Fh = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: wi,
  isPreTag: wi,
  isIgnoreNewlineTag: wi,
  isCustomElement: wi,
  onError: em,
  onWarn: tm,
  comments: !1,
  prefixIdentifiers: !1
};
let ce = Fh, Zs = null, Et = "", Ue = null, ie = null, Xe = "", yt = -1, Ht = -1, va = 0, Rt = !1, la = null;
const Ae = [], we = new zd(Ae, {
  onerr: gt,
  ontext(e, t) {
    Ci(De(e, t), e, t);
  },
  ontextentity(e, t, i) {
    Ci(e, t, i);
  },
  oninterpolation(e, t) {
    if (Rt)
      return Ci(De(e, t), e, t);
    let i = e + we.delimiterOpen.length, a = t - we.delimiterClose.length;
    for (; tt(Et.charCodeAt(i)); )
      i++;
    for (; tt(Et.charCodeAt(a - 1)); )
      a--;
    let l = De(i, a);
    l.includes("&") && (l = ce.decodeEntities(l, !1)), ca({
      type: 5,
      content: Mi(l, !1, Te(i, a)),
      loc: Te(e, t)
    });
  },
  onopentagname(e, t) {
    const i = De(e, t);
    Ue = {
      type: 1,
      tag: i,
      ns: ce.getNamespace(i, Ae[0], ce.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: Te(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    Gl(e);
  },
  onclosetag(e, t) {
    const i = De(e, t);
    if (!ce.isVoidTag(i)) {
      let a = !1;
      for (let l = 0; l < Ae.length; l++)
        if (Ae[l].tag.toLowerCase() === i.toLowerCase()) {
          a = !0, l > 0 && gt(24, Ae[0].loc.start.offset);
          for (let c = 0; c <= l; c++) {
            const p = Ae.shift();
            Ri(p, t, c < l);
          }
          break;
        }
      a || gt(23, Uh(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = Ue.tag;
    Ue.isSelfClosing = !0, Gl(e), Ae[0] && Ae[0].tag === t && Ri(Ae.shift(), e);
  },
  onattribname(e, t) {
    ie = {
      type: 6,
      name: De(e, t),
      nameLoc: Te(e, t),
      value: void 0,
      loc: Te(e)
    };
  },
  ondirname(e, t) {
    const i = De(e, t), a = i === "." || i === ":" ? "bind" : i === "@" ? "on" : i === "#" ? "slot" : i.slice(2);
    if (!Rt && a === "" && gt(26, e), Rt || a === "")
      ie = {
        type: 6,
        name: i,
        nameLoc: Te(e, t),
        value: void 0,
        loc: Te(e)
      };
    else if (ie = {
      type: 7,
      name: a,
      rawName: i,
      exp: void 0,
      arg: void 0,
      modifiers: i === "." ? [oa("prop")] : [],
      loc: Te(e)
    }, a === "pre") {
      Rt = we.inVPre = !0, la = Ue;
      const l = Ue.props;
      for (let h = 0; h < l.length; h++)
        l[h].type === 7 && (l[h] = Am(l[h]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const i = De(e, t);
    if (Rt && !Ul(ie))
      ie.name += i, Zt(ie.nameLoc, t);
    else {
      const a = i[0] !== "[";
      ie.arg = Mi(
        a ? i : i.slice(1, -1),
        a,
        Te(e, t),
        a ? 3 : 0
      );
    }
  },
  ondirmodifier(e, t) {
    const i = De(e, t);
    if (Rt && !Ul(ie))
      ie.name += "." + i, Zt(ie.nameLoc, t);
    else if (ie.name === "slot") {
      const a = ie.arg;
      a && (a.content += "." + i, Zt(a.loc, t));
    } else {
      const a = oa(i, !0, Te(e, t));
      ie.modifiers.push(a);
    }
  },
  onattribdata(e, t) {
    Xe += De(e, t), yt < 0 && (yt = e), Ht = t;
  },
  onattribentity(e, t, i) {
    Xe += e, yt < 0 && (yt = t), Ht = i;
  },
  onattribnameend(e) {
    const t = ie.loc.start.offset, i = De(t, e);
    ie.type === 7 && (ie.rawName = i), Ue.props.some(
      (a) => (a.type === 7 ? a.rawName : a.name) === i
    ) && gt(2, t);
  },
  onattribend(e, t) {
    if (Ue && ie) {
      if (Zt(ie.loc, t), e !== 0)
        if (Xe.includes("&") && (Xe = ce.decodeEntities(
          Xe,
          !0
        )), ie.type === 6)
          ie.name === "class" && (Xe = Gh(Xe).trim()), e === 1 && !Xe && gt(13, t), ie.value = {
            type: 2,
            content: Xe,
            loc: e === 1 ? Te(yt, Ht) : Te(yt - 1, Ht + 1)
          }, we.inSFCRoot && Ue.tag === "template" && ie.name === "lang" && Xe && Xe !== "html" && we.enterRCDATA(Hi("</template"), 0);
        else {
          let i = 0;
          ie.exp = Mi(
            Xe,
            !1,
            Te(yt, Ht),
            0,
            i
          ), ie.name === "for" && (ie.forParseResult = cm(ie.exp));
          let a = -1;
          ie.name === "bind" && (a = ie.modifiers.findIndex(
            (l) => l.content === "sync"
          )) > -1 && Yi(
            "COMPILER_V_BIND_SYNC",
            ce,
            ie.loc,
            ie.arg.loc.source
          ) && (ie.name = "model", ie.modifiers.splice(a, 1));
        }
      (ie.type !== 7 || ie.name !== "pre") && Ue.props.push(ie);
    }
    Xe = "", yt = Ht = -1;
  },
  oncomment(e, t) {
    ce.comments && ca({
      type: 3,
      content: De(e, t),
      loc: Te(e - 4, t + 3)
    });
  },
  onend() {
    const e = Et.length;
    for (let t = 0; t < Ae.length; t++)
      Ri(Ae[t], e - 1), gt(24, Ae[t].loc.start.offset);
  },
  oncdata(e, t) {
    (Ae[0] ? Ae[0].ns : ce.ns) !== 0 ? Ci(De(e, t), e, t) : gt(1, e - 9);
  },
  onprocessinginstruction(e) {
    (Ae[0] ? Ae[0].ns : ce.ns) === 0 && gt(
      21,
      e - 1
    );
  }
}), Vl = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, lm = /^\(|\)$/g;
function cm(e) {
  const t = e.loc, i = e.content, a = i.match(am);
  if (!a) return;
  const [, l, h] = a, c = (A, m, d = !1) => {
    const y = t.start.offset + m, I = y + A.length;
    return Mi(
      A,
      !1,
      Te(y, I),
      0,
      d ? 1 : 0
      /* Normal */
    );
  }, p = {
    source: c(h.trim(), i.indexOf(h, l.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: !1
  };
  let u = l.trim().replace(lm, "").trim();
  const g = l.indexOf(u), b = u.match(Vl);
  if (b) {
    u = u.replace(Vl, "").trim();
    const A = b[1].trim();
    let m;
    if (A && (m = i.indexOf(A, g + u.length), p.key = c(A, m, !0)), b[2]) {
      const d = b[2].trim();
      d && (p.index = c(
        d,
        i.indexOf(
          d,
          p.key ? m + A.length : g + u.length
        ),
        !0
      ));
    }
  }
  return u && (p.value = c(u, g, !0)), p;
}
function De(e, t) {
  return Et.slice(e, t);
}
function Gl(e) {
  we.inSFCRoot && (Ue.innerLoc = Te(e + 1, e + 1)), ca(Ue);
  const { tag: t, ns: i } = Ue;
  i === 0 && ce.isPreTag(t) && va++, ce.isVoidTag(t) ? Ri(Ue, e) : (Ae.unshift(Ue), (i === 1 || i === 2) && (we.inXML = !0)), Ue = null;
}
function Ci(e, t, i) {
  {
    const h = Ae[0] && Ae[0].tag;
    h !== "script" && h !== "style" && e.includes("&") && (e = ce.decodeEntities(e, !1));
  }
  const a = Ae[0] || Zs, l = a.children[a.children.length - 1];
  l && l.type === 2 ? (l.content += e, Zt(l.loc, i)) : a.children.push({
    type: 2,
    content: e,
    loc: Te(t, i)
  });
}
function Ri(e, t, i = !1) {
  i ? Zt(e.loc, Uh(t, 60)) : Zt(e.loc, hm(t, 62) + 1), we.inSFCRoot && (e.children.length ? e.innerLoc.end = $i({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = $i({}, e.innerLoc.start), e.innerLoc.source = De(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: a, ns: l, children: h } = e;
  if (Rt || (a === "slot" ? e.tagType = 2 : Kl(e) ? e.tagType = 3 : pm(e) && (e.tagType = 1)), we.inRCDATA || (e.children = Vh(h)), l === 0 && ce.isIgnoreNewlineTag(a)) {
    const c = h[0];
    c && c.type === 2 && (c.content = c.content.replace(/^\r?\n/, ""));
  }
  l === 0 && ce.isPreTag(a) && va--, la === e && (Rt = we.inVPre = !1, la = null), we.inXML && (Ae[0] ? Ae[0].ns : ce.ns) === 0 && (we.inXML = !1);
  {
    const c = e.props;
    if (!we.inSFCRoot && Mh(
      "COMPILER_NATIVE_TEMPLATE",
      ce
    ) && e.tag === "template" && !Kl(e)) {
      const u = Ae[0] || Zs, g = u.children.indexOf(e);
      u.children.splice(g, 1, ...e.children);
    }
    const p = c.find(
      (u) => u.type === 6 && u.name === "inline-template"
    );
    p && Yi(
      "COMPILER_INLINE_TEMPLATE",
      ce,
      p.loc
    ) && e.children.length && (p.value = {
      type: 2,
      content: De(
        e.children[0].loc.start.offset,
        e.children[e.children.length - 1].loc.end.offset
      ),
      loc: p.loc
    });
  }
}
function hm(e, t) {
  let i = e;
  for (; Et.charCodeAt(i) !== t && i < Et.length - 1; ) i++;
  return i;
}
function Uh(e, t) {
  let i = e;
  for (; Et.charCodeAt(i) !== t && i >= 0; ) i--;
  return i;
}
const um = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function Kl({ tag: e, props: t }) {
  if (e === "template") {
    for (let i = 0; i < t.length; i++)
      if (t[i].type === 7 && um.has(t[i].name))
        return !0;
  }
  return !1;
}
function pm({ tag: e, props: t }) {
  if (ce.isCustomElement(e))
    return !1;
  if (e === "component" || fm(e.charCodeAt(0)) || rm(e) || ce.isBuiltInComponent && ce.isBuiltInComponent(e) || ce.isNativeTag && !ce.isNativeTag(e))
    return !0;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (a.type === 6) {
      if (a.name === "is" && a.value) {
        if (a.value.content.startsWith("vue:"))
          return !0;
        if (Yi(
          "COMPILER_IS_ON_ELEMENT",
          ce,
          a.loc
        ))
          return !0;
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      a.name === "bind" && nm(a.arg, "is") && Yi(
        "COMPILER_IS_ON_ELEMENT",
        ce,
        a.loc
      )
    )
      return !0;
  }
  return !1;
}
function fm(e) {
  return e > 64 && e < 91;
}
const dm = /\r\n/g;
function Vh(e) {
  const t = ce.whitespace !== "preserve";
  let i = !1;
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (l.type === 2)
      if (va)
        l.content = l.content.replace(dm, `
`);
      else if (om(l.content)) {
        const h = e[a - 1] && e[a - 1].type, c = e[a + 1] && e[a + 1].type;
        !h || !c || t && (h === 3 && (c === 3 || c === 1) || h === 1 && (c === 3 || c === 1 && mm(l.content))) ? (i = !0, e[a] = null) : l.content = " ";
      } else t && (l.content = Gh(l.content));
  }
  return i ? e.filter(Boolean) : e;
}
function mm(e) {
  for (let t = 0; t < e.length; t++) {
    const i = e.charCodeAt(t);
    if (i === 10 || i === 13)
      return !0;
  }
  return !1;
}
function Gh(e) {
  let t = "", i = !1;
  for (let a = 0; a < e.length; a++)
    tt(e.charCodeAt(a)) ? i || (t += " ", i = !0) : (t += e[a], i = !1);
  return t;
}
function ca(e) {
  (Ae[0] || Zs).children.push(e);
}
function Te(e, t) {
  return {
    start: we.getPos(e),
    // @ts-expect-error allow late attachment
    end: t == null ? t : we.getPos(t),
    // @ts-expect-error allow late attachment
    source: t == null ? t : De(e, t)
  };
}
function Zt(e, t) {
  e.end = we.getPos(t), e.source = De(e.start.offset, t);
}
function Am(e) {
  const t = {
    type: 6,
    name: e.rawName,
    nameLoc: Te(
      e.loc.start.offset,
      e.loc.start.offset + e.rawName.length
    ),
    value: void 0,
    loc: e.loc
  };
  if (e.exp) {
    const i = e.exp.loc;
    i.end.offset < e.loc.end.offset && (i.start.offset--, i.start.column--, i.end.offset++, i.end.column++), t.value = {
      type: 2,
      content: e.exp.content,
      loc: i
    };
  }
  return t;
}
function Mi(e, t = !1, i, a = 0, l = 0) {
  return oa(e, t, i, a);
}
function gt(e, t, i) {
  ce.onError(
    sm(e, Te(t, t))
  );
}
function gm() {
  we.reset(), Ue = null, ie = null, Xe = "", yt = -1, Ht = -1, Ae.length = 0;
}
function ym(e, t) {
  if (gm(), Et = e, ce = $i({}, Fh), t) {
    let l;
    for (l in t)
      t[l] != null && (ce[l] = t[l]);
  }
  we.mode = ce.parseMode === "html" ? 1 : ce.parseMode === "sfc" ? 2 : 0, we.inXML = ce.ns === 1 || ce.ns === 2;
  const i = t && t.delimiters;
  i && (we.delimiterOpen = Hi(i[0]), we.delimiterClose = Hi(i[1]));
  const a = Zs = qd([], e);
  return we.parse(Et), a.loc = Te(0, e.length), a.children = Vh(a.children), Zs = null, a;
}
new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
/**
* @vue/compiler-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Sm = /* @__PURE__ */ Symbol(""), xm = /* @__PURE__ */ Symbol(
  ""
), Im = /* @__PURE__ */ Symbol(""), Em = /* @__PURE__ */ Symbol(
  ""
), bm = /* @__PURE__ */ Symbol(
  ""
), wm = /* @__PURE__ */ Symbol(
  ""
), Cm = /* @__PURE__ */ Symbol(
  ""
), vm = /* @__PURE__ */ Symbol(""), Kh = /* @__PURE__ */ Symbol(""), jh = /* @__PURE__ */ Symbol(
  ""
);
Zd({
  [Sm]: "vModelRadio",
  [xm]: "vModelCheckbox",
  [Im]: "vModelText",
  [Em]: "vModelSelect",
  [bm]: "vModelDynamic",
  [wm]: "withModifiers",
  [Cm]: "withKeys",
  [vm]: "vShow",
  [Kh]: "Transition",
  [jh]: "TransitionGroup"
});
let ds;
function Tm(e, t = !1) {
  return ds || (ds = document.createElement("div")), t ? (ds.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, ds.children[0].getAttribute("foo")) : (ds.innerHTML = e, ds.textContent);
}
const Pm = {
  parseMode: "html",
  isVoidTag: $d,
  isNativeTag: (e) => jd(e) || Wd(e) || Qd(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: Tm,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return Kh;
    if (e === "TransitionGroup" || e === "transition-group")
      return jh;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(e, t, i) {
    let a = t ? t.ns : i;
    if (t && a === 2)
      if (t.tag === "annotation-xml") {
        if (e === "svg")
          return 1;
        t.props.some(
          (l) => l.type === 6 && l.name === "encoding" && l.value != null && (l.value.content === "text/html" || l.value.content === "application/xhtml+xml")
        ) && (a = 0);
      } else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (a = 0);
    else t && a === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (a = 0);
    if (a === 0) {
      if (e === "svg")
        return 1;
      if (e === "math")
        return 2;
    }
    return a;
  }
};
function Nm(e, t = {}) {
  return ym(e, $i({}, Pm, t));
}
const km = /* @__PURE__ */ new Set([
  "COMPILER_IS_ON_ELEMENT",
  "COMPILER_V_BIND_SYNC",
  "COMPILER_V_BIND_OBJECT_ORDER",
  "COMPILER_V_ON_NATIVE",
  "COMPILER_V_IF_V_FOR_PRECEDENCE",
  "COMPILER_NATIVE_TEMPLATE",
  "COMPILER_INLINE_TEMPLATE",
  "COMPILER_FILTERS"
]);
function Om(e) {
  const t = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const l of a.compatFlags) (km.has(l) ? i : t).add(l);
  return { runtime: [...t].sort(), compiler: [...i].sort() };
}
function QI(e) {
  if (e.runtime.length === 0 && e.compiler.length === 0)
    return `// No @vue/compat flags needed: this project can run on plain Vue 3.
`;
  const t = [];
  t.push("// main.js (with 'vue' aliased to '@vue/compat')"), t.push("import { configureCompat } from 'vue'"), t.push(""), t.push("configureCompat({"), t.push("  MODE: 3,");
  for (const i of e.runtime) t.push(`  ${i}: true,`);
  if (t.push("})"), t.push(""), t.push("// vite.config.js"), t.push("import vue from '@vitejs/plugin-vue'"), t.push(""), t.push("export default {"), t.push("  resolve: { alias: { vue: '@vue/compat' } },"), e.compiler.length === 0)
    t.push("  plugins: [vue()],");
  else {
    t.push("  plugins: ["), t.push("    vue({"), t.push("      template: {"), t.push("        compilerOptions: {"), t.push("          compatConfig: {"), t.push("            MODE: 3,");
    for (const i of e.compiler) t.push(`            ${i}: true,`);
    t.push("          },"), t.push("        },"), t.push("      },"), t.push("    }),"), t.push("  ],");
  }
  return t.push("}"), `${t.join(`
`)}
`;
}
const ne = "https://v3-migration.vuejs.org/breaking-changes/", Wh = [
  {
    id: "filters",
    title: "Filters are removed",
    severity: "error",
    category: "template",
    docs: `${ne}filters`,
    compatFlags: ["COMPILER_FILTERS", "FILTERS"],
    fixable: !1,
    effort: 0.5,
    description: "Filters (`{{ price | currency }}`, `Vue.filter`, the `filters` option) no longer exist. Replace them with method calls, computed properties or global properties."
  },
  {
    id: "listeners",
    title: "$listeners is removed",
    severity: "error",
    category: "script",
    docs: `${ne}listeners-removed`,
    compatFlags: ["INSTANCE_LISTENERS"],
    fixable: !1,
    effort: 1,
    description: 'Event listeners are now part of `$attrs`. `v-on="$listeners"` can usually be dropped when `v-bind="$attrs"` is present.'
  },
  {
    id: "scoped-slots",
    title: "$scopedSlots is removed",
    severity: "error",
    category: "script",
    docs: `${ne}slots-unification`,
    compatFlags: ["INSTANCE_SCOPED_SLOTS"],
    fixable: !0,
    effort: 0.1,
    description: "All slots are exposed on `$slots` as functions. `$scopedSlots.x` becomes `$slots.x`."
  },
  {
    id: "event-emitter",
    title: "$on, $off and $once are removed",
    severity: "error",
    category: "script",
    docs: `${ne}events-api`,
    compatFlags: ["INSTANCE_EVENT_EMITTER"],
    fixable: !1,
    effort: 2,
    description: "Instances are no longer event emitters, so event buses built on `new Vue()` stop working. Use props and emits, provide/inject, a store, or a small library such as mitt."
  },
  {
    id: "hook-events",
    title: "hook: lifecycle events are renamed",
    severity: "warning",
    category: "template",
    docs: `${ne}vnode-lifecycle-events`,
    compatFlags: ["INSTANCE_EVENT_HOOKS"],
    fixable: !0,
    effort: 0.3,
    description: "Listening to a child lifecycle with `@hook:mounted` becomes `@vue:mounted`. `$on('hook:...')` no longer works."
  },
  {
    id: "set-delete",
    title: "$set, $delete, Vue.set and Vue.delete are removed",
    severity: "error",
    category: "script",
    docs: `${ne}#removed-apis`,
    compatFlags: ["GLOBAL_SET", "GLOBAL_DELETE", "INSTANCE_SET", "INSTANCE_DELETE"],
    fixable: !1,
    effort: 0.3,
    description: "Vue 3 reactivity is based on Proxy, so plain assignment and the `delete` operator are tracked. Replace `this.$set(obj, key, value)` with `obj[key] = value`."
  },
  {
    id: "children",
    title: "$children is removed",
    severity: "error",
    category: "script",
    docs: `${ne}children`,
    compatFlags: ["INSTANCE_CHILDREN"],
    fixable: !1,
    effort: 1.5,
    description: "Use template refs to reach child component instances."
  },
  {
    id: "destroy",
    title: "$destroy is removed",
    severity: "error",
    category: "script",
    docs: `${ne}#removed-apis`,
    compatFlags: ["INSTANCE_DESTROY"],
    fixable: !1,
    effort: 1,
    description: "Components can no longer destroy themselves. Unmount the app with `app.unmount()` or remove the component with `v-if`."
  },
  {
    id: "global-mount",
    title: "new Vue() is replaced by createApp()",
    severity: "error",
    category: "script",
    docs: `${ne}global-api#mounting-app-instance`,
    compatFlags: ["GLOBAL_MOUNT"],
    fixable: !1,
    effort: 1,
    description: "Create the root with `createApp(App)` and mount it with `app.mount('#app')`."
  },
  {
    id: "global-api",
    title: "Global Vue API moved to the app instance",
    severity: "error",
    category: "script",
    docs: `${ne}global-api`,
    compatFlags: ["GLOBAL_OBSERVABLE", "GLOBAL_PRIVATE_UTIL"],
    fixable: !1,
    effort: 0.5,
    description: "`Vue.component`, `Vue.use`, `Vue.mixin` and `Vue.directive` become `app.component`, `app.use`, `app.mixin` and `app.directive`. `Vue.nextTick` and `Vue.observable` become named imports (`nextTick`, `reactive`)."
  },
  {
    id: "global-prototype",
    title: "Vue.prototype is replaced by app.config.globalProperties",
    severity: "error",
    category: "script",
    docs: `${ne}global-api#vue-prototype-replaced-by-config-globalproperties`,
    compatFlags: ["GLOBAL_PROTOTYPE"],
    fixable: !1,
    effort: 0.5,
    description: "Move `Vue.prototype.$http = http` to `app.config.globalProperties.$http = http`, or use provide/inject."
  },
  {
    id: "global-extend",
    title: "Vue.extend is removed",
    severity: "error",
    category: "script",
    docs: `${ne}global-api#vue-extend-removed`,
    compatFlags: ["GLOBAL_EXTEND"],
    fixable: !1,
    effort: 0.5,
    description: "Use `defineComponent` for type inference, the `extends` option for inheritance and `createApp` to mount."
  },
  {
    id: "config-production-tip",
    title: "Vue.config.productionTip is removed",
    severity: "warning",
    category: "script",
    docs: `${ne}global-api#config-productiontip-removed`,
    compatFlags: ["CONFIG_PRODUCTION_TIP"],
    fixable: !0,
    effort: 0,
    description: "The option no longer exists. The statement can simply be deleted."
  },
  {
    id: "config-ignored-elements",
    title: "Vue.config.ignoredElements is replaced by isCustomElement",
    severity: "warning",
    category: "script",
    docs: `${ne}global-api#config-ignoredelements-is-now-config-compileroptions-iscustomelement`,
    compatFlags: ["CONFIG_IGNORED_ELEMENTS"],
    fixable: !1,
    effort: 0.5,
    description: "Use `compilerOptions.isCustomElement` in your build config (or `app.config.compilerOptions.isCustomElement` with the runtime compiler). It takes a function instead of strings or regular expressions."
  },
  {
    id: "config-key-codes",
    title: "Vue.config.keyCodes is removed",
    severity: "error",
    category: "script",
    docs: `${ne}keycode-modifiers`,
    compatFlags: ["CONFIG_KEY_CODES"],
    fixable: !1,
    effort: 0.5,
    description: "Custom key code aliases are gone. Use kebab-case key names such as `@keyup.page-down`."
  },
  {
    id: "global-config",
    title: "Vue.config moved to app.config",
    severity: "warning",
    category: "script",
    docs: `${ne}global-api#a-new-global-api-createapp`,
    compatFlags: ["CONFIG_SILENT", "CONFIG_DEVTOOLS", "CONFIG_OPTION_MERGE_STRATS"],
    fixable: !1,
    effort: 0.3,
    description: "Global configuration now lives on `app.config`. Some options (`silent`, `devtools`) were removed."
  },
  {
    id: "destroy-hooks",
    title: "beforeDestroy and destroyed are renamed",
    severity: "error",
    category: "script",
    docs: `${ne}#other-minor-changes`,
    compatFlags: ["OPTIONS_BEFORE_DESTROY", "OPTIONS_DESTROYED"],
    fixable: !0,
    effort: 0.05,
    description: "`beforeDestroy` is now `beforeUnmount` and `destroyed` is now `unmounted`. The old hooks are silently ignored."
  },
  {
    id: "directive-hooks",
    title: "Custom directive hooks are renamed",
    severity: "error",
    category: "script",
    docs: `${ne}custom-directives`,
    compatFlags: ["CUSTOM_DIR"],
    fixable: !0,
    effort: 0.3,
    description: "Directive hooks follow the component lifecycle: `bind` is `beforeMount`, `inserted` is `mounted`, `componentUpdated` is `updated`, `unbind` is `unmounted`, and `update` was removed."
  },
  {
    id: "component-v-model",
    title: "v-model on components uses modelValue",
    severity: "error",
    category: "script",
    docs: `${ne}v-model`,
    compatFlags: ["COMPONENT_V_MODEL"],
    fixable: !1,
    effort: 1,
    description: "A component used with `v-model` now receives `modelValue` and must emit `update:modelValue`. The `value` prop, the `input` event and the `model` option no longer apply."
  },
  {
    id: "sync-modifier",
    title: ".sync is replaced by v-model:prop",
    severity: "error",
    category: "template",
    docs: `${ne}v-model`,
    compatFlags: ["COMPILER_V_BIND_SYNC"],
    fixable: !0,
    effort: 0.2,
    description: '`:title.sync="value"` becomes `v-model:title="value"`. The child keeps emitting `update:title`.'
  },
  {
    id: "native-modifier",
    title: "The .native modifier is removed",
    severity: "warning",
    category: "template",
    docs: `${ne}v-on-native-modifier-removed`,
    compatFlags: ["COMPILER_V_ON_NATIVE"],
    fixable: !1,
    effort: 0.3,
    description: "Listeners not declared in the child `emits` option are added to its root element. Remove `.native` and declare the events the child really emits."
  },
  {
    id: "keycode-modifiers",
    title: "KeyCode modifiers are removed",
    severity: "error",
    category: "template",
    docs: `${ne}keycode-modifiers`,
    compatFlags: ["V_ON_KEYCODE_MODIFIER"],
    fixable: !0,
    effort: 0.1,
    description: "Numeric modifiers such as `@keyup.13` must use key names such as `@keyup.enter`."
  },
  {
    id: "functional-components",
    title: "Functional components changed",
    severity: "error",
    category: "template",
    docs: `${ne}functional-components`,
    compatFlags: ["COMPONENT_FUNCTIONAL"],
    fixable: !1,
    effort: 1,
    description: "The `functional` attribute on `<template>` and the `functional: true` option are gone. Use a normal component (the performance gap is negligible) or a plain function."
  },
  {
    id: "inline-template",
    title: "inline-template is removed",
    severity: "error",
    category: "template",
    docs: `${ne}inline-template-attribute`,
    compatFlags: ["COMPILER_INLINE_TEMPLATE"],
    fixable: !1,
    effort: 1,
    description: "Move the inner markup into the component itself, or pass it through a default slot."
  },
  {
    id: "template-v-for-key",
    title: "Key must be on <template v-for>",
    severity: "error",
    category: "template",
    docs: `${ne}key-attribute`,
    compatFlags: [],
    fixable: !1,
    effort: 0.1,
    description: "With `<template v-for>`, the `key` belongs on the `<template>` tag. Keys on its children are a compile error in Vue 3."
  },
  {
    id: "v-if-v-for",
    title: "v-if now has higher priority than v-for",
    severity: "error",
    category: "template",
    docs: `${ne}v-if-v-for`,
    compatFlags: ["COMPILER_V_IF_V_FOR_PRECEDENCE"],
    fixable: !1,
    effort: 0.3,
    description: "On the same element, `v-if` is evaluated first, so it cannot use the `v-for` variable. Filter the list in a computed property or move `v-if` to a wrapper."
  },
  {
    id: "v-bind-object-order",
    title: 'v-bind="object" is order sensitive',
    severity: "warning",
    category: "template",
    docs: `${ne}v-bind`,
    compatFlags: ["COMPILER_V_BIND_OBJECT_ORDER"],
    fixable: !1,
    effort: 0.1,
    description: 'Attributes declared before `v-bind="obj"` can now be overridden by the object. Move `v-bind="obj"` first if the explicit attributes should win, as they did in Vue 2.'
  },
  {
    id: "transition-classes",
    title: "Transition classes renamed",
    severity: "warning",
    category: "style",
    docs: `${ne}transition`,
    compatFlags: ["TRANSITION_CLASSES"],
    fixable: !0,
    effort: 0.05,
    description: "`.v-enter` is now `.v-enter-from` and `.v-leave` is now `.v-leave-from`. The `enter-class` and `leave-class` props are now `enter-from-class` and `leave-from-class`."
  },
  {
    id: "transition-group-root",
    title: "<transition-group> renders no wrapper",
    severity: "info",
    category: "template",
    docs: `${ne}transition-group`,
    compatFlags: ["TRANSITION_GROUP_ROOT"],
    fixable: !1,
    effort: 0.1,
    description: 'Without a `tag` prop, `<transition-group>` no longer renders a `<span>`. Add `tag="span"` if your CSS relies on it.'
  },
  {
    id: "render-function-h",
    title: "Render functions no longer receive h",
    severity: "error",
    category: "script",
    docs: `${ne}render-function-api`,
    compatFlags: ["RENDER_FUNCTION"],
    fixable: !1,
    effort: 1,
    description: "Import `h` from `vue` instead of taking it as an argument. The VNode props shape is also flatter (`on`, `attrs` and `domProps` are gone)."
  },
  {
    id: "attrs-class-style",
    title: "$attrs now includes class and style",
    severity: "info",
    category: "script",
    docs: `${ne}attrs-includes-class-style`,
    compatFlags: ["INSTANCE_ATTRS_CLASS_STYLE"],
    fixable: !1,
    effort: 0.1,
    description: "Check components that forward `$attrs`, especially with `inheritAttrs: false`, because `class` and `style` now travel with them."
  },
  {
    id: "data-object",
    title: "data must be a function",
    severity: "error",
    category: "script",
    docs: `${ne}data-option`,
    compatFlags: ["OPTIONS_DATA_FN"],
    fixable: !1,
    effort: 0.1,
    description: "Declaring `data` as a plain object is no longer allowed, including on the root instance. Use `data() { return { ... } }`."
  },
  {
    id: "watch-array",
    title: "Array watchers need deep for mutations",
    severity: "info",
    category: "script",
    docs: `${ne}watch`,
    compatFlags: ["WATCH_ARRAY"],
    fixable: !1,
    effort: 0.2,
    description: "Watching an array only fires when the array is replaced. Add `deep: true` if you rely on `push`, `splice` and friends."
  },
  {
    id: "deprecated-slot-syntax",
    title: "slot and slot-scope attributes are removed",
    severity: "error",
    category: "template",
    docs: "https://v2.vuejs.org/v2/guide/components-slots.html#Deprecated-Syntax",
    compatFlags: [],
    fixable: !1,
    effort: 0.2,
    description: "The `slot`, `slot-scope` and `scope` attributes were deprecated in Vue 2.6 and removed in Vue 3. Use `v-slot` (or `#name`)."
  },
  {
    id: "is-on-element",
    title: "is on native elements needs the vue: prefix",
    severity: "warning",
    category: "template",
    docs: `${ne}custom-elements-interop#customized-built-in-elements`,
    compatFlags: ["COMPILER_IS_ON_ELEMENT"],
    fixable: !1,
    effort: 0.2,
    description: '`<tr is="my-row">` now creates a customized built-in element. Use `is="vue:my-row"` to render a Vue component.'
  },
  {
    id: "composition-api-plugin",
    title: "@vue/composition-api is built in",
    severity: "warning",
    category: "script",
    docs: "https://github.com/vuejs/composition-api#readme",
    compatFlags: [],
    fixable: !1,
    effort: 0.3,
    description: "Import the Composition API from `vue` and remove the plugin. Some helpers (`set`, `del`) have no Vue 3 equivalent."
  },
  {
    id: "vue-version",
    title: "Vue 2 dependency",
    severity: "warning",
    category: "dependencies",
    docs: "https://v3-migration.vuejs.org/migration-build",
    compatFlags: [],
    fixable: !1,
    effort: 2,
    description: "Upgrade `vue` to version 3. During the migration, alias `vue` to `@vue/compat` to run Vue 2 code on Vue 3."
  },
  {
    id: "vue2-tooling",
    title: "Vue 2 build or test tooling",
    severity: "warning",
    category: "dependencies",
    docs: "https://v3-migration.vuejs.org/migration-build#installation",
    compatFlags: [],
    fixable: !1,
    effort: 0.5,
    description: "Compilers, loaders and test utilities are versioned with Vue. Each one has a Vue 3 replacement."
  },
  {
    id: "vue-router-v3",
    title: "vue-router 3 does not support Vue 3",
    severity: "error",
    category: "dependencies",
    docs: "https://router.vuejs.org/guide/migration/",
    compatFlags: [],
    fixable: !1,
    effort: 4,
    description: "Upgrade to vue-router 4: `new VueRouter()` becomes `createRouter()`, `mode` becomes `history: createWebHistory()`, and catch-all routes need a custom regex."
  },
  {
    id: "vuex-v3",
    title: "Vuex 3 does not support Vue 3",
    severity: "error",
    category: "dependencies",
    docs: "https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html",
    compatFlags: [],
    fixable: !1,
    effort: 3,
    description: "Upgrade to Vuex 4 (`createStore`), or move to Pinia, the official recommendation for new Vue 3 code."
  },
  {
    id: "vue2-libraries",
    title: "Vue 2 only library",
    severity: "error",
    category: "dependencies",
    docs: "https://v3-migration.vuejs.org/",
    compatFlags: [],
    fixable: !1,
    effort: 6,
    description: "This library only supports Vue 2. Each finding names its Vue 3 successor."
  }
], hr = new Map(Wh.map((e) => [e.id, e]));
function _m(e) {
  const t = hr.get(e);
  if (!t) throw new Error(`Unknown rule: ${e}`);
  return t;
}
class Dm {
  constructor(t, i, a) {
    Ot(this, "findings", []);
    Ot(this, "warnings", []);
    Ot(this, "lineStarts");
    this.file = t, this.text = i, this.enabled = a, this.lineStarts = [0];
    for (let l = 0; l < i.length; l++)
      i.charCodeAt(l) === 10 && this.lineStarts.push(l + 1);
  }
  isEnabled(t) {
    return this.enabled(t);
  }
  position(t) {
    let i = 0, a = this.lineStarts.length - 1;
    for (; i < a; ) {
      const l = i + a + 1 >> 1;
      this.lineStarts[l] <= t ? i = l : a = l - 1;
    }
    return { line: i + 1, column: t - this.lineStarts[i] + 1 };
  }
  lineText(t) {
    const i = this.lineStarts[t - 1] ?? 0, a = this.lineStarts[t], l = a === void 0 ? this.text.length : a - 1;
    return this.text.slice(i, l).replace(/\r$/, "");
  }
  report(t, i, a, l, h = {}) {
    if (!this.enabled(t)) return;
    const c = _m(t), p = this.position(i), u = this.position(Math.max(i, a));
    if (this.findings.some((A) => A.ruleId === t && A.line === p.line && A.column === p.column)) return;
    let g = this.lineText(p.line).trim();
    g.length > 160 && (g = `${g.slice(0, 157)}...`);
    const b = h.fix && h.fix.length > 0 ? h.fix : void 0;
    this.findings.push({
      ruleId: t,
      severity: c.severity,
      message: l,
      file: this.file,
      line: p.line,
      column: p.column,
      endLine: u.line,
      endColumn: u.column,
      docs: h.docs ?? c.docs,
      compatFlags: h.compatFlags ?? c.compatFlags,
      fixable: !!b,
      snippet: g,
      ...b ? { fix: b } : {},
      ...h.effort !== void 0 ? { effort: h.effort } : {}
    });
  }
  warn(t) {
    this.warnings.push({ file: this.file, message: t });
  }
}
const Bm = {
  "bootstrap-vue": {
    suggestion: "BootstrapVue only supports Vue 2. Migrate to bootstrap-vue-next (Bootstrap 5) or plain Bootstrap 5 markup.",
    docs: "https://bootstrap-vue-next.github.io/bootstrap-vue-next/",
    effort: 20
  },
  vuetify: {
    below: 3,
    suggestion: "Vuetify 2 only supports Vue 2. Upgrade to Vuetify 3 and follow its upgrade guide.",
    docs: "https://vuetifyjs.com/en/getting-started/upgrade-guide/",
    effort: 30
  },
  "element-ui": {
    suggestion: "Element UI only supports Vue 2. Migrate to Element Plus, its Vue 3 successor.",
    docs: "https://element-plus.org/",
    effort: 25
  },
  "vue-i18n": {
    below: 9,
    suggestion: "vue-i18n 8 only supports Vue 2. Upgrade to vue-i18n 9 or later (createI18n).",
    docs: "https://vue-i18n.intlify.dev/guide/migration/vue3.html",
    effort: 3
  },
  "portal-vue": {
    below: 3,
    suggestion: "portal-vue 2 only supports Vue 2. Use the built-in <Teleport> component (or portal-vue 3).",
    docs: "https://vuejs.org/guide/built-ins/teleport.html",
    effort: 1
  },
  "vue-meta": {
    below: 3,
    suggestion: "vue-meta 2 only supports Vue 2. Use @unhead/vue for document head management.",
    docs: "https://unhead.unjs.io/",
    effort: 2
  },
  "vue-class-component": {
    below: 8,
    suggestion: "vue-class-component 7 only supports Vue 2. Rewrite components with the Composition API and <script setup>, or move to vue-facing-decorator.",
    docs: "https://vuejs.org/guide/extras/composition-api-faq.html",
    effort: 8
  },
  "vue-property-decorator": {
    suggestion: "vue-property-decorator depends on vue-class-component 7 (Vue 2). Rewrite components with the Composition API and <script setup>, or move to vue-facing-decorator.",
    docs: "https://vuejs.org/guide/extras/composition-api-faq.html",
    effort: 8
  },
  vuedraggable: {
    below: 4,
    suggestion: "vuedraggable 2 only supports Vue 2. Upgrade to vuedraggable 4 (published as vuedraggable@next).",
    docs: "https://github.com/SortableJS/vue.draggable.next",
    effort: 1
  },
  "vee-validate": {
    below: 4,
    suggestion: "vee-validate 3 only supports Vue 2. Upgrade to vee-validate 4, which has a new API.",
    docs: "https://vee-validate.logaretm.com/v4/",
    effort: 4
  },
  nuxt: {
    below: 3,
    suggestion: "Nuxt 2 runs on Vue 2. Migrate to Nuxt 3 or later following the Nuxt migration guide.",
    docs: "https://nuxt.com/docs/migration/overview",
    effort: 20
  }
}, Lm = {
  "vue-template-compiler": { suggestion: "vue-template-compiler is Vue 2 only: remove it, Vue 3 ships @vue/compiler-sfc." },
  "vue-loader": { below: 16, suggestion: "vue-loader 15 compiles Vue 2 SFCs: upgrade to vue-loader 17." },
  "@vitejs/plugin-vue2": { suggestion: "@vitejs/plugin-vue2 is for Vue 2: switch to @vitejs/plugin-vue." },
  "@vue/test-utils": { below: 2, suggestion: "@vue/test-utils 1 is for Vue 2: upgrade to @vue/test-utils 2." },
  "vue-server-renderer": { suggestion: "vue-server-renderer is Vue 2 only: use renderToString from 'vue/server-renderer'." },
  "@vue/composition-api": { suggestion: "@vue/composition-api backports the Composition API to Vue 2.6: remove it, the API is built into Vue 3." }
}, Rm = ["dependencies", "devDependencies", "peerDependencies"];
function Ws(e) {
  const t = e.trim();
  if (/^(npm|file|link|git|github|workspace|https?):/i.test(t) || t.includes("/") || t === "*" || t === "latest" || t === "" || t === "next") return;
  const i = /(\d+)/.exec(t);
  return i ? Number(i[1]) : void 0;
}
function Mm(e, t) {
  const i = t.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"), a = new RegExp(`"${i}"\\s*:`).exec(e);
  return a ? a.index : 0;
}
function Fm(e) {
  let t;
  try {
    t = JSON.parse(e.text);
  } catch (g) {
    e.warn(`Could not parse package.json: ${g.message}`);
    return;
  }
  const i = /* @__PURE__ */ new Map();
  for (const g of Rm) {
    const b = t[g];
    if (!(!b || typeof b != "object"))
      for (const [A, m] of Object.entries(b))
        typeof m == "string" && !i.has(A) && i.set(A, m);
  }
  const a = (g) => {
    const b = Mm(e.text, g);
    return [b, b + g.length + 2];
  }, l = i.get("vue");
  l !== void 0 && Ws(l) === 2 && e.report("vue-version", ...a("vue"), `vue ${l} is Vue 2: upgrade to vue@^3.5. To migrate step by step, alias vue to @vue/compat first.`);
  const h = i.get("vue-router"), c = h === void 0 ? void 0 : Ws(h);
  c !== void 0 && c < 4 && e.report("vue-router-v3", ...a("vue-router"), `vue-router ${h} only works with Vue 2: upgrade to vue-router 4 (createRouter, createWebHistory).`);
  const p = i.get("vuex"), u = p === void 0 ? void 0 : Ws(p);
  u !== void 0 && u < 4 && e.report("vuex-v3", ...a("vuex"), `vuex ${p} only works with Vue 2: upgrade to Vuex 4 (createStore) or migrate to Pinia, the recommended store for Vue 3.`);
  for (const [g, b] of Object.entries(Lm)) {
    const A = i.get(g);
    if (A === void 0) continue;
    const m = Ws(A);
    b.below !== void 0 && (m === void 0 || m >= b.below) || e.report("vue2-tooling", ...a(g), `${g} ${A}: ${b.suggestion}`);
  }
  for (const [g, b] of Object.entries(Bm)) {
    const A = i.get(g);
    if (A === void 0) continue;
    const m = Ws(A);
    b.below !== void 0 && (m === void 0 || m >= b.below) || e.report("vue2-libraries", ...a(g), `${g} ${A}: ${b.suggestion}`, { docs: b.docs, effort: b.effort });
  }
}
/**
* @vue/compiler-sfc v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Le(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const Um = Object.freeze({}), fn = () => {
}, vi = () => !1, Qh = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), bt = Object.assign, Vm = Object.prototype.hasOwnProperty, Gm = (e, t) => Vm.call(e, t), $e = Array.isArray, Km = (e) => Ta(e) === "[object Map]", jm = (e) => Ta(e) === "[object Set]", Wm = (e) => typeof e == "function", le = (e) => typeof e == "string", cs = (e) => typeof e == "symbol", Ds = (e) => e !== null && typeof e == "object", $h = Object.prototype.toString, Ta = (e) => $h.call(e), Qm = (e) => Ta(e) === "[object Object]", jl = /* @__PURE__ */ Le(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Hh = /* @__PURE__ */ Le(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), ur = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((i) => t[i] || (t[i] = e(i)));
}, $m = /-\w/g, He = ur(
  (e) => e.replace($m, (t) => t.slice(1).toUpperCase())
), Hm = /\B([A-Z])/g, Ym = ur(
  (e) => e.replace(Hm, "-$1").toLowerCase()
), rs = ur((e) => e.charAt(0).toUpperCase() + e.slice(1)), Jm = ur(
  (e) => e ? `on${rs(e)}` : ""
), Xm = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function Wl(e) {
  return Xm.test(e) ? `__props.${e}` : `__props[${JSON.stringify(e)}]`;
}
function Zm(e, t) {
  return e + JSON.stringify(
    t,
    (i, a) => typeof a == "function" ? a.toString() : a
  );
}
const Js = {
  1: "TEXT",
  2: "CLASS",
  4: "STYLE",
  8: "PROPS",
  16: "FULL_PROPS",
  32: "NEED_HYDRATION",
  64: "STABLE_FRAGMENT",
  128: "KEYED_FRAGMENT",
  256: "UNKEYED_FRAGMENT",
  512: "NEED_PATCH",
  1024: "DYNAMIC_SLOTS",
  2048: "DEV_ROOT_FRAGMENT",
  [-1]: "CACHED",
  [-2]: "BAIL"
}, qm = {
  1: "STABLE",
  2: "DYNAMIC",
  3: "FORWARDED"
}, zm = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol", Yh = /* @__PURE__ */ Le(zm), Ql = 2;
function eA(e, t = 0, i = e.length) {
  if (t = Math.max(0, Math.min(t, e.length)), i = Math.max(0, Math.min(i, e.length)), t > i) return "";
  let a = e.split(/(\r?\n)/);
  const l = a.filter((p, u) => u % 2 === 1);
  a = a.filter((p, u) => u % 2 === 0);
  let h = 0;
  const c = [];
  for (let p = 0; p < a.length; p++)
    if (h += a[p].length + (l[p] && l[p].length || 0), h >= t) {
      for (let u = p - Ql; u <= p + Ql || i > h; u++) {
        if (u < 0 || u >= a.length) continue;
        const g = u + 1;
        c.push(
          `${g}${" ".repeat(Math.max(3 - String(g).length, 0))}|  ${a[u]}`
        );
        const b = a[u].length, A = l[u] && l[u].length || 0;
        if (u === p) {
          const m = t - (h - (b + A)), d = Math.max(
            1,
            i > h ? b - m : i - t
          );
          c.push("   |  " + " ".repeat(m) + "^".repeat(d));
        } else if (u > p) {
          if (i > h) {
            const m = Math.max(Math.min(i - h, b), 1);
            c.push("   |  " + "^".repeat(m));
          }
          h += b + A;
        }
      }
      break;
    }
  return c.join(`
`);
}
function Jh(e) {
  if ($e(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const a = e[i], l = le(a) ? Xh(a) : Jh(a);
      if (l)
        for (const h in l)
          t[h] = l[h];
    }
    return t;
  } else if (le(e) || Ds(e))
    return e;
}
const tA = /;(?![^(]*\))/g, sA = /:([^]+)/, iA = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Xh(e) {
  const t = {};
  return e.replace(iA, (i) => i.startsWith("/*") ? "" : i).split(tA).forEach((i) => {
    if (i) {
      const a = i.split(sA);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function rA(e) {
  if (!e) return "";
  if (le(e)) return e;
  let t = "";
  for (const i in e) {
    const a = e[i];
    if (le(a) || typeof a == "number") {
      const l = i.startsWith("--") ? i : Ym(i);
      t += `${l}:${a};`;
    }
  }
  return t;
}
function Zh(e) {
  let t = "";
  if (le(e))
    t = e;
  else if ($e(e))
    for (let i = 0; i < e.length; i++) {
      const a = Zh(e[i]);
      a && (t += a + " ");
    }
  else if (Ds(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
const nA = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", aA = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", oA = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", lA = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", cA = /* @__PURE__ */ Le(nA), hA = /* @__PURE__ */ Le(aA), uA = /* @__PURE__ */ Le(oA), qh = /* @__PURE__ */ Le(lA), pA = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", fA = /* @__PURE__ */ Le(
  pA + ",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
);
function dA(e) {
  return !!e || e === "";
}
const mA = /* @__PURE__ */ Le(
  "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
), AA = /* @__PURE__ */ Le(
  "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
), gA = /* @__PURE__ */ Le(
  "accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns"
), yA = /["'&<>]/;
function qt(e) {
  const t = "" + e, i = yA.exec(t);
  if (!i)
    return t;
  let a = "", l, h, c = 0;
  for (h = i.index; h < t.length; h++) {
    switch (t.charCodeAt(h)) {
      case 34:
        l = "&quot;";
        break;
      case 38:
        l = "&amp;";
        break;
      case 39:
        l = "&#39;";
        break;
      case 60:
        l = "&lt;";
        break;
      case 62:
        l = "&gt;";
        break;
      default:
        continue;
    }
    c !== h && (a += t.slice(c, h)), c = h + 1, a += l;
  }
  return c !== h ? a + t.slice(c, h) : a;
}
const zh = (e) => !!(e && e.__v_isRef === !0), pr = (e) => le(e) ? e : e == null ? "" : $e(e) || Ds(e) && (e.toString === $h || !Wm(e.toString)) ? zh(e) ? pr(e.value) : JSON.stringify(e, eu, 2) : String(e), eu = (e, t) => zh(t) ? eu(e, t.value) : Km(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (i, [a, l], h) => (i[dn(a, h) + " =>"] = l, i),
    {}
  )
} : jm(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((i) => dn(i))
} : cs(t) ? dn(t) : Ds(t) && !$e(t) && !Qm(t) ? String(t) : t, dn = (e, t = "") => {
  var i;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    cs(e) ? `Symbol(${(i = e.description) != null ? i : t})` : e
  );
}, Ps = /* @__PURE__ */ Symbol("Fragment"), ws = /* @__PURE__ */ Symbol("Teleport"), fr = /* @__PURE__ */ Symbol("Suspense"), qs = /* @__PURE__ */ Symbol("KeepAlive"), Pa = /* @__PURE__ */ Symbol(
  "BaseTransition"
), Vt = /* @__PURE__ */ Symbol("openBlock"), Na = /* @__PURE__ */ Symbol("createBlock"), ka = /* @__PURE__ */ Symbol(
  "createElementBlock"
), dr = /* @__PURE__ */ Symbol("createVNode"), mr = /* @__PURE__ */ Symbol(
  "createElementVNode"
), Bs = /* @__PURE__ */ Symbol(
  "createCommentVNode"
), Ar = /* @__PURE__ */ Symbol(
  "createTextVNode"
), gr = /* @__PURE__ */ Symbol(
  "createStaticVNode"
), zs = /* @__PURE__ */ Symbol(
  "resolveComponent"
), yr = /* @__PURE__ */ Symbol(
  "resolveDynamicComponent"
), Sr = /* @__PURE__ */ Symbol(
  "resolveDirective"
), tu = /* @__PURE__ */ Symbol(
  "resolveFilter"
), xr = /* @__PURE__ */ Symbol(
  "withDirectives"
), Ir = /* @__PURE__ */ Symbol("renderList"), Oa = /* @__PURE__ */ Symbol("renderSlot"), _a = /* @__PURE__ */ Symbol("createSlots"), hi = /* @__PURE__ */ Symbol(
  "toDisplayString"
), ei = /* @__PURE__ */ Symbol("mergeProps"), Er = /* @__PURE__ */ Symbol(
  "normalizeClass"
), br = /* @__PURE__ */ Symbol(
  "normalizeStyle"
), Ns = /* @__PURE__ */ Symbol(
  "normalizeProps"
), Ls = /* @__PURE__ */ Symbol(
  "guardReactiveProps"
), wr = /* @__PURE__ */ Symbol("toHandlers"), Ji = /* @__PURE__ */ Symbol("camelize"), su = /* @__PURE__ */ Symbol("capitalize"), Xi = /* @__PURE__ */ Symbol(
  "toHandlerKey"
), ti = /* @__PURE__ */ Symbol(
  "setBlockTracking"
), iu = /* @__PURE__ */ Symbol("pushScopeId"), ru = /* @__PURE__ */ Symbol("popScopeId"), Cr = /* @__PURE__ */ Symbol("withCtx"), si = /* @__PURE__ */ Symbol("unref"), ii = /* @__PURE__ */ Symbol("isRef"), vr = /* @__PURE__ */ Symbol("withMemo"), Da = /* @__PURE__ */ Symbol("isMemoSame"), Ze = {
  [Ps]: "Fragment",
  [ws]: "Teleport",
  [fr]: "Suspense",
  [qs]: "KeepAlive",
  [Pa]: "BaseTransition",
  [Vt]: "openBlock",
  [Na]: "createBlock",
  [ka]: "createElementBlock",
  [dr]: "createVNode",
  [mr]: "createElementVNode",
  [Bs]: "createCommentVNode",
  [Ar]: "createTextVNode",
  [gr]: "createStaticVNode",
  [zs]: "resolveComponent",
  [yr]: "resolveDynamicComponent",
  [Sr]: "resolveDirective",
  [tu]: "resolveFilter",
  [xr]: "withDirectives",
  [Ir]: "renderList",
  [Oa]: "renderSlot",
  [_a]: "createSlots",
  [hi]: "toDisplayString",
  [ei]: "mergeProps",
  [Er]: "normalizeClass",
  [br]: "normalizeStyle",
  [Ns]: "normalizeProps",
  [Ls]: "guardReactiveProps",
  [wr]: "toHandlers",
  [Ji]: "camelize",
  [su]: "capitalize",
  [Xi]: "toHandlerKey",
  [ti]: "setBlockTracking",
  [iu]: "pushScopeId",
  [ru]: "popScopeId",
  [Cr]: "withCtx",
  [si]: "unref",
  [ii]: "isRef",
  [vr]: "withMemo",
  [Da]: "isMemoSame"
};
function Ba(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
    Ze[t] = e[t];
  });
}
const SA = {
  HTML: 0,
  0: "HTML",
  SVG: 1,
  1: "SVG",
  MATH_ML: 2,
  2: "MATH_ML"
}, xA = {
  ROOT: 0,
  0: "ROOT",
  ELEMENT: 1,
  1: "ELEMENT",
  TEXT: 2,
  2: "TEXT",
  COMMENT: 3,
  3: "COMMENT",
  SIMPLE_EXPRESSION: 4,
  4: "SIMPLE_EXPRESSION",
  INTERPOLATION: 5,
  5: "INTERPOLATION",
  ATTRIBUTE: 6,
  6: "ATTRIBUTE",
  DIRECTIVE: 7,
  7: "DIRECTIVE",
  COMPOUND_EXPRESSION: 8,
  8: "COMPOUND_EXPRESSION",
  IF: 9,
  9: "IF",
  IF_BRANCH: 10,
  10: "IF_BRANCH",
  FOR: 11,
  11: "FOR",
  TEXT_CALL: 12,
  12: "TEXT_CALL",
  VNODE_CALL: 13,
  13: "VNODE_CALL",
  JS_CALL_EXPRESSION: 14,
  14: "JS_CALL_EXPRESSION",
  JS_OBJECT_EXPRESSION: 15,
  15: "JS_OBJECT_EXPRESSION",
  JS_PROPERTY: 16,
  16: "JS_PROPERTY",
  JS_ARRAY_EXPRESSION: 17,
  17: "JS_ARRAY_EXPRESSION",
  JS_FUNCTION_EXPRESSION: 18,
  18: "JS_FUNCTION_EXPRESSION",
  JS_CONDITIONAL_EXPRESSION: 19,
  19: "JS_CONDITIONAL_EXPRESSION",
  JS_CACHE_EXPRESSION: 20,
  20: "JS_CACHE_EXPRESSION",
  JS_BLOCK_STATEMENT: 21,
  21: "JS_BLOCK_STATEMENT",
  JS_TEMPLATE_LITERAL: 22,
  22: "JS_TEMPLATE_LITERAL",
  JS_IF_STATEMENT: 23,
  23: "JS_IF_STATEMENT",
  JS_ASSIGNMENT_EXPRESSION: 24,
  24: "JS_ASSIGNMENT_EXPRESSION",
  JS_SEQUENCE_EXPRESSION: 25,
  25: "JS_SEQUENCE_EXPRESSION",
  JS_RETURN_STATEMENT: 26,
  26: "JS_RETURN_STATEMENT"
}, IA = {
  ELEMENT: 0,
  0: "ELEMENT",
  COMPONENT: 1,
  1: "COMPONENT",
  SLOT: 2,
  2: "SLOT",
  TEMPLATE: 3,
  3: "TEMPLATE"
}, EA = {
  NOT_CONSTANT: 0,
  0: "NOT_CONSTANT",
  CAN_SKIP_PATCH: 1,
  1: "CAN_SKIP_PATCH",
  CAN_CACHE: 2,
  2: "CAN_CACHE",
  CAN_STRINGIFY: 3,
  3: "CAN_STRINGIFY"
}, Pe = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function Tr(e, t = "") {
  return {
    type: 0,
    source: t,
    children: e,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: Pe
  };
}
function ks(e, t, i, a, l, h, c, p = !1, u = !1, g = !1, b = Pe) {
  return e && (p ? (e.helper(Vt), e.helper(os(e.inSSR, g))) : e.helper(as(e.inSSR, g)), c && e.helper(xr)), {
    type: 13,
    tag: t,
    props: i,
    children: a,
    patchFlag: l,
    dynamicProps: h,
    directives: c,
    isBlock: p,
    disableTracking: u,
    isComponent: g,
    loc: b
  };
}
function Ft(e, t = Pe) {
  return {
    type: 17,
    loc: t,
    elements: e
  };
}
function it(e, t = Pe) {
  return {
    type: 15,
    loc: t,
    properties: e
  };
}
function Ee(e, t) {
  return {
    type: 16,
    loc: Pe,
    key: le(e) ? z(e, !0) : e,
    value: t
  };
}
function z(e, t = !1, i = Pe, a = 0) {
  return {
    type: 4,
    loc: i,
    content: e,
    isStatic: t,
    constType: t ? 3 : a
  };
}
function bA(e, t) {
  return {
    type: 5,
    loc: t,
    content: le(e) ? z(e, !1, t) : e
  };
}
function Qe(e, t = Pe) {
  return {
    type: 8,
    loc: t,
    children: e
  };
}
function ve(e, t = [], i = Pe) {
  return {
    type: 14,
    loc: i,
    callee: e,
    arguments: t
  };
}
function ns(e, t = void 0, i = !1, a = !1, l = Pe) {
  return {
    type: 18,
    params: e,
    returns: t,
    newline: i,
    isSlot: a,
    loc: l
  };
}
function Zi(e, t, i, a = !0) {
  return {
    type: 19,
    test: e,
    consequent: t,
    alternate: i,
    newline: a,
    loc: Pe
  };
}
function nu(e, t, i = !1, a = !1) {
  return {
    type: 20,
    index: e,
    value: t,
    needPauseTracking: i,
    inVOnce: a,
    needArraySpread: !1,
    loc: Pe
  };
}
function au(e) {
  return {
    type: 21,
    body: e,
    loc: Pe
  };
}
function wA(e) {
  return {
    type: 22,
    elements: e,
    loc: Pe
  };
}
function CA(e, t, i) {
  return {
    type: 23,
    test: e,
    consequent: t,
    alternate: i,
    loc: Pe
  };
}
function vA(e, t) {
  return {
    type: 24,
    left: e,
    right: t,
    loc: Pe
  };
}
function TA(e) {
  return {
    type: 25,
    expressions: e,
    loc: Pe
  };
}
function PA(e) {
  return {
    type: 26,
    returns: e,
    loc: Pe
  };
}
function as(e, t) {
  return e || t ? dr : mr;
}
function os(e, t) {
  return e || t ? Na : ka;
}
function Pr(e, { helper: t, removeHelper: i, inSSR: a }) {
  e.isBlock || (e.isBlock = !0, i(as(a, e.isComponent)), t(Vt), t(os(a, e.isComponent)));
}
var mn;
const NA = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), ha = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (mn = String.fromCodePoint) !== null && mn !== void 0 ? mn : ((e) => {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  })
);
function kA(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = NA.get(e)) !== null && t !== void 0 ? t : e;
}
var ls = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {}, pt = [], at = [], OA = typeof Uint8Array < "u" ? Uint8Array : Array, La = !1;
function ou() {
  La = !0;
  for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, i = e.length; t < i; ++t)
    pt[t] = e[t], at[e.charCodeAt(t)] = t;
  at[45] = 62, at[95] = 63;
}
function _A(e) {
  La || ou();
  var t, i, a, l, h, c, p = e.length;
  if (p % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  h = e[p - 2] === "=" ? 2 : e[p - 1] === "=" ? 1 : 0, c = new OA(p * 3 / 4 - h), a = h > 0 ? p - 4 : p;
  var u = 0;
  for (t = 0, i = 0; t < a; t += 4, i += 3)
    l = at[e.charCodeAt(t)] << 18 | at[e.charCodeAt(t + 1)] << 12 | at[e.charCodeAt(t + 2)] << 6 | at[e.charCodeAt(t + 3)], c[u++] = l >> 16 & 255, c[u++] = l >> 8 & 255, c[u++] = l & 255;
  return h === 2 ? (l = at[e.charCodeAt(t)] << 2 | at[e.charCodeAt(t + 1)] >> 4, c[u++] = l & 255) : h === 1 && (l = at[e.charCodeAt(t)] << 10 | at[e.charCodeAt(t + 1)] << 4 | at[e.charCodeAt(t + 2)] >> 2, c[u++] = l >> 8 & 255, c[u++] = l & 255), c;
}
function DA(e) {
  return pt[e >> 18 & 63] + pt[e >> 12 & 63] + pt[e >> 6 & 63] + pt[e & 63];
}
function BA(e, t, i) {
  for (var a, l = [], h = t; h < i; h += 3)
    a = (e[h] << 16) + (e[h + 1] << 8) + e[h + 2], l.push(DA(a));
  return l.join("");
}
function $l(e) {
  La || ou();
  for (var t, i = e.length, a = i % 3, l = "", h = [], c = 16383, p = 0, u = i - a; p < u; p += c)
    h.push(BA(e, p, p + c > u ? u : p + c));
  return a === 1 ? (t = e[i - 1], l += pt[t >> 2], l += pt[t << 4 & 63], l += "==") : a === 2 && (t = (e[i - 2] << 8) + e[i - 1], l += pt[t >> 10], l += pt[t >> 4 & 63], l += pt[t << 2 & 63], l += "="), h.push(l), h.join("");
}
function Nr(e, t, i, a, l) {
  var h, c, p = l * 8 - a - 1, u = (1 << p) - 1, g = u >> 1, b = -7, A = i ? l - 1 : 0, m = i ? -1 : 1, d = e[t + A];
  for (A += m, h = d & (1 << -b) - 1, d >>= -b, b += p; b > 0; h = h * 256 + e[t + A], A += m, b -= 8)
    ;
  for (c = h & (1 << -b) - 1, h >>= -b, b += a; b > 0; c = c * 256 + e[t + A], A += m, b -= 8)
    ;
  if (h === 0)
    h = 1 - g;
  else {
    if (h === u)
      return c ? NaN : (d ? -1 : 1) * (1 / 0);
    c = c + Math.pow(2, a), h = h - g;
  }
  return (d ? -1 : 1) * c * Math.pow(2, h - a);
}
function lu(e, t, i, a, l, h) {
  var c, p, u, g = h * 8 - l - 1, b = (1 << g) - 1, A = b >> 1, m = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = a ? 0 : h - 1, y = a ? 1 : -1, I = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (p = isNaN(t) ? 1 : 0, c = b) : (c = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -c)) < 1 && (c--, u *= 2), c + A >= 1 ? t += m / u : t += m * Math.pow(2, 1 - A), t * u >= 2 && (c++, u /= 2), c + A >= b ? (p = 0, c = b) : c + A >= 1 ? (p = (t * u - 1) * Math.pow(2, l), c = c + A) : (p = t * Math.pow(2, A - 1) * Math.pow(2, l), c = 0)); l >= 8; e[i + d] = p & 255, d += y, p /= 256, l -= 8)
    ;
  for (c = c << l | p, g += l; g > 0; e[i + d] = c & 255, d += y, c /= 256, g -= 8)
    ;
  e[i + d - y] |= I * 128;
}
var LA = {}.toString, cu = Array.isArray || function(e) {
  return LA.call(e) == "[object Array]";
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var RA = 50;
K.TYPED_ARRAY_SUPPORT = ls.TYPED_ARRAY_SUPPORT !== void 0 ? ls.TYPED_ARRAY_SUPPORT : !0;
qi();
function qi() {
  return K.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function xt(e, t) {
  if (qi() < t)
    throw new RangeError("Invalid typed array length");
  return K.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = K.prototype) : (e === null && (e = new K(t)), e.length = t), e;
}
function K(e, t, i) {
  if (!K.TYPED_ARRAY_SUPPORT && !(this instanceof K))
    return new K(e, t, i);
  if (typeof e == "number") {
    if (typeof t == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return Ra(this, e);
  }
  return hu(this, e, t, i);
}
K.poolSize = 8192;
K._augment = function(e) {
  return e.__proto__ = K.prototype, e;
};
function hu(e, t, i, a) {
  if (typeof t == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer ? UA(e, t, i, a) : typeof t == "string" ? FA(e, t, i) : VA(e, t);
}
K.from = function(e, t, i) {
  return hu(null, e, t, i);
};
K.TYPED_ARRAY_SUPPORT && (K.prototype.__proto__ = Uint8Array.prototype, K.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && K[Symbol.species]);
function uu(e) {
  if (typeof e != "number")
    throw new TypeError('"size" argument must be a number');
  if (e < 0)
    throw new RangeError('"size" argument must not be negative');
}
function MA(e, t, i, a) {
  return uu(t), t <= 0 ? xt(e, t) : i !== void 0 ? typeof a == "string" ? xt(e, t).fill(i, a) : xt(e, t).fill(i) : xt(e, t);
}
K.alloc = function(e, t, i) {
  return MA(null, e, t, i);
};
function Ra(e, t) {
  if (uu(t), e = xt(e, t < 0 ? 0 : Ma(t) | 0), !K.TYPED_ARRAY_SUPPORT)
    for (var i = 0; i < t; ++i)
      e[i] = 0;
  return e;
}
K.allocUnsafe = function(e) {
  return Ra(null, e);
};
K.allocUnsafeSlow = function(e) {
  return Ra(null, e);
};
function FA(e, t, i) {
  if ((typeof i != "string" || i === "") && (i = "utf8"), !K.isEncoding(i))
    throw new TypeError('"encoding" must be a valid string encoding');
  var a = pu(t, i) | 0;
  e = xt(e, a);
  var l = e.write(t, i);
  return l !== a && (e = e.slice(0, l)), e;
}
function ua(e, t) {
  var i = t.length < 0 ? 0 : Ma(t.length) | 0;
  e = xt(e, i);
  for (var a = 0; a < i; a += 1)
    e[a] = t[a] & 255;
  return e;
}
function UA(e, t, i, a) {
  if (t.byteLength, i < 0 || t.byteLength < i)
    throw new RangeError("'offset' is out of bounds");
  if (t.byteLength < i + (a || 0))
    throw new RangeError("'length' is out of bounds");
  return i === void 0 && a === void 0 ? t = new Uint8Array(t) : a === void 0 ? t = new Uint8Array(t, i) : t = new Uint8Array(t, i, a), K.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = K.prototype) : e = ua(e, t), e;
}
function VA(e, t) {
  if (dt(t)) {
    var i = Ma(t.length) | 0;
    return e = xt(e, i), e.length === 0 || t.copy(e, 0, 0, i), e;
  }
  if (t) {
    if (typeof ArrayBuffer < "u" && t.buffer instanceof ArrayBuffer || "length" in t)
      return typeof t.length != "number" || ng(t.length) ? xt(e, 0) : ua(e, t);
    if (t.type === "Buffer" && cu(t.data))
      return ua(e, t.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function Ma(e) {
  if (e >= qi())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + qi().toString(16) + " bytes");
  return e | 0;
}
K.isBuffer = ag;
function dt(e) {
  return !!(e != null && e._isBuffer);
}
K.compare = function(t, i) {
  if (!dt(t) || !dt(i))
    throw new TypeError("Arguments must be Buffers");
  if (t === i) return 0;
  for (var a = t.length, l = i.length, h = 0, c = Math.min(a, l); h < c; ++h)
    if (t[h] !== i[h]) {
      a = t[h], l = i[h];
      break;
    }
  return a < l ? -1 : l < a ? 1 : 0;
};
K.isEncoding = function(t) {
  switch (String(t).toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return !0;
    default:
      return !1;
  }
};
K.concat = function(t, i) {
  if (!cu(t))
    throw new TypeError('"list" argument must be an Array of Buffers');
  if (t.length === 0)
    return K.alloc(0);
  var a;
  if (i === void 0)
    for (i = 0, a = 0; a < t.length; ++a)
      i += t[a].length;
  var l = K.allocUnsafe(i), h = 0;
  for (a = 0; a < t.length; ++a) {
    var c = t[a];
    if (!dt(c))
      throw new TypeError('"list" argument must be an Array of Buffers');
    c.copy(l, h), h += c.length;
  }
  return l;
};
function pu(e, t) {
  if (dt(e))
    return e.length;
  if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
    return e.byteLength;
  typeof e != "string" && (e = "" + e);
  var i = e.length;
  if (i === 0) return 0;
  for (var a = !1; ; )
    switch (t) {
      case "ascii":
      case "latin1":
      case "binary":
        return i;
      case "utf8":
      case "utf-8":
      case void 0:
        return zi(e).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return i * 2;
      case "hex":
        return i >>> 1;
      case "base64":
        return Su(e).length;
      default:
        if (a) return zi(e).length;
        t = ("" + t).toLowerCase(), a = !0;
    }
}
K.byteLength = pu;
function GA(e, t, i) {
  var a = !1;
  if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((i === void 0 || i > this.length) && (i = this.length), i <= 0) || (i >>>= 0, t >>>= 0, i <= t))
    return "";
  for (e || (e = "utf8"); ; )
    switch (e) {
      case "hex":
        return ZA(this, t, i);
      case "utf8":
      case "utf-8":
        return mu(this, t, i);
      case "ascii":
        return JA(this, t, i);
      case "latin1":
      case "binary":
        return XA(this, t, i);
      case "base64":
        return HA(this, t, i);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return qA(this, t, i);
      default:
        if (a) throw new TypeError("Unknown encoding: " + e);
        e = (e + "").toLowerCase(), a = !0;
    }
}
K.prototype._isBuffer = !0;
function zt(e, t, i) {
  var a = e[t];
  e[t] = e[i], e[i] = a;
}
K.prototype.swap16 = function() {
  var t = this.length;
  if (t % 2 !== 0)
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  for (var i = 0; i < t; i += 2)
    zt(this, i, i + 1);
  return this;
};
K.prototype.swap32 = function() {
  var t = this.length;
  if (t % 4 !== 0)
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (var i = 0; i < t; i += 4)
    zt(this, i, i + 3), zt(this, i + 1, i + 2);
  return this;
};
K.prototype.swap64 = function() {
  var t = this.length;
  if (t % 8 !== 0)
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  for (var i = 0; i < t; i += 8)
    zt(this, i, i + 7), zt(this, i + 1, i + 6), zt(this, i + 2, i + 5), zt(this, i + 3, i + 4);
  return this;
};
K.prototype.toString = function() {
  var t = this.length | 0;
  return t === 0 ? "" : arguments.length === 0 ? mu(this, 0, t) : GA.apply(this, arguments);
};
K.prototype.equals = function(t) {
  if (!dt(t)) throw new TypeError("Argument must be a Buffer");
  return this === t ? !0 : K.compare(this, t) === 0;
};
K.prototype.inspect = function() {
  var t = "", i = RA;
  return this.length > 0 && (t = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (t += " ... ")), "<Buffer " + t + ">";
};
K.prototype.compare = function(t, i, a, l, h) {
  if (!dt(t))
    throw new TypeError("Argument must be a Buffer");
  if (i === void 0 && (i = 0), a === void 0 && (a = t ? t.length : 0), l === void 0 && (l = 0), h === void 0 && (h = this.length), i < 0 || a > t.length || l < 0 || h > this.length)
    throw new RangeError("out of range index");
  if (l >= h && i >= a)
    return 0;
  if (l >= h)
    return -1;
  if (i >= a)
    return 1;
  if (i >>>= 0, a >>>= 0, l >>>= 0, h >>>= 0, this === t) return 0;
  for (var c = h - l, p = a - i, u = Math.min(c, p), g = this.slice(l, h), b = t.slice(i, a), A = 0; A < u; ++A)
    if (g[A] !== b[A]) {
      c = g[A], p = b[A];
      break;
    }
  return c < p ? -1 : p < c ? 1 : 0;
};
function fu(e, t, i, a, l) {
  if (e.length === 0) return -1;
  if (typeof i == "string" ? (a = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = l ? 0 : e.length - 1), i < 0 && (i = e.length + i), i >= e.length) {
    if (l) return -1;
    i = e.length - 1;
  } else if (i < 0)
    if (l) i = 0;
    else return -1;
  if (typeof t == "string" && (t = K.from(t, a)), dt(t))
    return t.length === 0 ? -1 : Hl(e, t, i, a, l);
  if (typeof t == "number")
    return t = t & 255, K.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? l ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : Hl(e, [t], i, a, l);
  throw new TypeError("val must be string, number or Buffer");
}
function Hl(e, t, i, a, l) {
  var h = 1, c = e.length, p = t.length;
  if (a !== void 0 && (a = String(a).toLowerCase(), a === "ucs2" || a === "ucs-2" || a === "utf16le" || a === "utf-16le")) {
    if (e.length < 2 || t.length < 2)
      return -1;
    h = 2, c /= 2, p /= 2, i /= 2;
  }
  function u(d, y) {
    return h === 1 ? d[y] : d.readUInt16BE(y * h);
  }
  var g;
  if (l) {
    var b = -1;
    for (g = i; g < c; g++)
      if (u(e, g) === u(t, b === -1 ? 0 : g - b)) {
        if (b === -1 && (b = g), g - b + 1 === p) return b * h;
      } else
        b !== -1 && (g -= g - b), b = -1;
  } else
    for (i + p > c && (i = c - p), g = i; g >= 0; g--) {
      for (var A = !0, m = 0; m < p; m++)
        if (u(e, g + m) !== u(t, m)) {
          A = !1;
          break;
        }
      if (A) return g;
    }
  return -1;
}
K.prototype.includes = function(t, i, a) {
  return this.indexOf(t, i, a) !== -1;
};
K.prototype.indexOf = function(t, i, a) {
  return fu(this, t, i, a, !0);
};
K.prototype.lastIndexOf = function(t, i, a) {
  return fu(this, t, i, a, !1);
};
function KA(e, t, i, a) {
  i = Number(i) || 0;
  var l = e.length - i;
  a ? (a = Number(a), a > l && (a = l)) : a = l;
  var h = t.length;
  if (h % 2 !== 0) throw new TypeError("Invalid hex string");
  a > h / 2 && (a = h / 2);
  for (var c = 0; c < a; ++c) {
    var p = parseInt(t.substr(c * 2, 2), 16);
    if (isNaN(p)) return c;
    e[i + c] = p;
  }
  return c;
}
function jA(e, t, i, a) {
  return _r(zi(t, e.length - i), e, i, a);
}
function du(e, t, i, a) {
  return _r(ig(t), e, i, a);
}
function WA(e, t, i, a) {
  return du(e, t, i, a);
}
function QA(e, t, i, a) {
  return _r(Su(t), e, i, a);
}
function $A(e, t, i, a) {
  return _r(rg(t, e.length - i), e, i, a);
}
K.prototype.write = function(t, i, a, l) {
  if (i === void 0)
    l = "utf8", a = this.length, i = 0;
  else if (a === void 0 && typeof i == "string")
    l = i, a = this.length, i = 0;
  else if (isFinite(i))
    i = i | 0, isFinite(a) ? (a = a | 0, l === void 0 && (l = "utf8")) : (l = a, a = void 0);
  else
    throw new Error(
      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
    );
  var h = this.length - i;
  if ((a === void 0 || a > h) && (a = h), t.length > 0 && (a < 0 || i < 0) || i > this.length)
    throw new RangeError("Attempt to write outside buffer bounds");
  l || (l = "utf8");
  for (var c = !1; ; )
    switch (l) {
      case "hex":
        return KA(this, t, i, a);
      case "utf8":
      case "utf-8":
        return jA(this, t, i, a);
      case "ascii":
        return du(this, t, i, a);
      case "latin1":
      case "binary":
        return WA(this, t, i, a);
      case "base64":
        return QA(this, t, i, a);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return $A(this, t, i, a);
      default:
        if (c) throw new TypeError("Unknown encoding: " + l);
        l = ("" + l).toLowerCase(), c = !0;
    }
};
K.prototype.toJSON = function() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function HA(e, t, i) {
  return t === 0 && i === e.length ? $l(e) : $l(e.slice(t, i));
}
function mu(e, t, i) {
  i = Math.min(e.length, i);
  for (var a = [], l = t; l < i; ) {
    var h = e[l], c = null, p = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
    if (l + p <= i) {
      var u, g, b, A;
      switch (p) {
        case 1:
          h < 128 && (c = h);
          break;
        case 2:
          u = e[l + 1], (u & 192) === 128 && (A = (h & 31) << 6 | u & 63, A > 127 && (c = A));
          break;
        case 3:
          u = e[l + 1], g = e[l + 2], (u & 192) === 128 && (g & 192) === 128 && (A = (h & 15) << 12 | (u & 63) << 6 | g & 63, A > 2047 && (A < 55296 || A > 57343) && (c = A));
          break;
        case 4:
          u = e[l + 1], g = e[l + 2], b = e[l + 3], (u & 192) === 128 && (g & 192) === 128 && (b & 192) === 128 && (A = (h & 15) << 18 | (u & 63) << 12 | (g & 63) << 6 | b & 63, A > 65535 && A < 1114112 && (c = A));
      }
    }
    c === null ? (c = 65533, p = 1) : c > 65535 && (c -= 65536, a.push(c >>> 10 & 1023 | 55296), c = 56320 | c & 1023), a.push(c), l += p;
  }
  return YA(a);
}
var Yl = 4096;
function YA(e) {
  var t = e.length;
  if (t <= Yl)
    return String.fromCharCode.apply(String, e);
  for (var i = "", a = 0; a < t; )
    i += String.fromCharCode.apply(
      String,
      e.slice(a, a += Yl)
    );
  return i;
}
function JA(e, t, i) {
  var a = "";
  i = Math.min(e.length, i);
  for (var l = t; l < i; ++l)
    a += String.fromCharCode(e[l] & 127);
  return a;
}
function XA(e, t, i) {
  var a = "";
  i = Math.min(e.length, i);
  for (var l = t; l < i; ++l)
    a += String.fromCharCode(e[l]);
  return a;
}
function ZA(e, t, i) {
  var a = e.length;
  (!t || t < 0) && (t = 0), (!i || i < 0 || i > a) && (i = a);
  for (var l = "", h = t; h < i; ++h)
    l += sg(e[h]);
  return l;
}
function qA(e, t, i) {
  for (var a = e.slice(t, i), l = "", h = 0; h < a.length; h += 2)
    l += String.fromCharCode(a[h] + a[h + 1] * 256);
  return l;
}
K.prototype.slice = function(t, i) {
  var a = this.length;
  t = ~~t, i = i === void 0 ? a : ~~i, t < 0 ? (t += a, t < 0 && (t = 0)) : t > a && (t = a), i < 0 ? (i += a, i < 0 && (i = 0)) : i > a && (i = a), i < t && (i = t);
  var l;
  if (K.TYPED_ARRAY_SUPPORT)
    l = this.subarray(t, i), l.__proto__ = K.prototype;
  else {
    var h = i - t;
    l = new K(h, void 0);
    for (var c = 0; c < h; ++c)
      l[c] = this[c + t];
  }
  return l;
};
function Oe(e, t, i) {
  if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
  if (e + t > i) throw new RangeError("Trying to access beyond buffer length");
}
K.prototype.readUIntLE = function(t, i, a) {
  t = t | 0, i = i | 0, a || Oe(t, i, this.length);
  for (var l = this[t], h = 1, c = 0; ++c < i && (h *= 256); )
    l += this[t + c] * h;
  return l;
};
K.prototype.readUIntBE = function(t, i, a) {
  t = t | 0, i = i | 0, a || Oe(t, i, this.length);
  for (var l = this[t + --i], h = 1; i > 0 && (h *= 256); )
    l += this[t + --i] * h;
  return l;
};
K.prototype.readUInt8 = function(t, i) {
  return i || Oe(t, 1, this.length), this[t];
};
K.prototype.readUInt16LE = function(t, i) {
  return i || Oe(t, 2, this.length), this[t] | this[t + 1] << 8;
};
K.prototype.readUInt16BE = function(t, i) {
  return i || Oe(t, 2, this.length), this[t] << 8 | this[t + 1];
};
K.prototype.readUInt32LE = function(t, i) {
  return i || Oe(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
};
K.prototype.readUInt32BE = function(t, i) {
  return i || Oe(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
};
K.prototype.readIntLE = function(t, i, a) {
  t = t | 0, i = i | 0, a || Oe(t, i, this.length);
  for (var l = this[t], h = 1, c = 0; ++c < i && (h *= 256); )
    l += this[t + c] * h;
  return h *= 128, l >= h && (l -= Math.pow(2, 8 * i)), l;
};
K.prototype.readIntBE = function(t, i, a) {
  t = t | 0, i = i | 0, a || Oe(t, i, this.length);
  for (var l = i, h = 1, c = this[t + --l]; l > 0 && (h *= 256); )
    c += this[t + --l] * h;
  return h *= 128, c >= h && (c -= Math.pow(2, 8 * i)), c;
};
K.prototype.readInt8 = function(t, i) {
  return i || Oe(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
};
K.prototype.readInt16LE = function(t, i) {
  i || Oe(t, 2, this.length);
  var a = this[t] | this[t + 1] << 8;
  return a & 32768 ? a | 4294901760 : a;
};
K.prototype.readInt16BE = function(t, i) {
  i || Oe(t, 2, this.length);
  var a = this[t + 1] | this[t] << 8;
  return a & 32768 ? a | 4294901760 : a;
};
K.prototype.readInt32LE = function(t, i) {
  return i || Oe(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
};
K.prototype.readInt32BE = function(t, i) {
  return i || Oe(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
};
K.prototype.readFloatLE = function(t, i) {
  return i || Oe(t, 4, this.length), Nr(this, t, !0, 23, 4);
};
K.prototype.readFloatBE = function(t, i) {
  return i || Oe(t, 4, this.length), Nr(this, t, !1, 23, 4);
};
K.prototype.readDoubleLE = function(t, i) {
  return i || Oe(t, 8, this.length), Nr(this, t, !0, 52, 8);
};
K.prototype.readDoubleBE = function(t, i) {
  return i || Oe(t, 8, this.length), Nr(this, t, !1, 52, 8);
};
function ze(e, t, i, a, l, h) {
  if (!dt(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (t > l || t < h) throw new RangeError('"value" argument is out of bounds');
  if (i + a > e.length) throw new RangeError("Index out of range");
}
K.prototype.writeUIntLE = function(t, i, a, l) {
  if (t = +t, i = i | 0, a = a | 0, !l) {
    var h = Math.pow(2, 8 * a) - 1;
    ze(this, t, i, a, h, 0);
  }
  var c = 1, p = 0;
  for (this[i] = t & 255; ++p < a && (c *= 256); )
    this[i + p] = t / c & 255;
  return i + a;
};
K.prototype.writeUIntBE = function(t, i, a, l) {
  if (t = +t, i = i | 0, a = a | 0, !l) {
    var h = Math.pow(2, 8 * a) - 1;
    ze(this, t, i, a, h, 0);
  }
  var c = a - 1, p = 1;
  for (this[i + c] = t & 255; --c >= 0 && (p *= 256); )
    this[i + c] = t / p & 255;
  return i + a;
};
K.prototype.writeUInt8 = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 1, 255, 0), K.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[i] = t & 255, i + 1;
};
function kr(e, t, i, a) {
  t < 0 && (t = 65535 + t + 1);
  for (var l = 0, h = Math.min(e.length - i, 2); l < h; ++l)
    e[i + l] = (t & 255 << 8 * (a ? l : 1 - l)) >>> (a ? l : 1 - l) * 8;
}
K.prototype.writeUInt16LE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 2, 65535, 0), K.TYPED_ARRAY_SUPPORT ? (this[i] = t & 255, this[i + 1] = t >>> 8) : kr(this, t, i, !0), i + 2;
};
K.prototype.writeUInt16BE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 2, 65535, 0), K.TYPED_ARRAY_SUPPORT ? (this[i] = t >>> 8, this[i + 1] = t & 255) : kr(this, t, i, !1), i + 2;
};
function Or(e, t, i, a) {
  t < 0 && (t = 4294967295 + t + 1);
  for (var l = 0, h = Math.min(e.length - i, 4); l < h; ++l)
    e[i + l] = t >>> (a ? l : 3 - l) * 8 & 255;
}
K.prototype.writeUInt32LE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 4, 4294967295, 0), K.TYPED_ARRAY_SUPPORT ? (this[i + 3] = t >>> 24, this[i + 2] = t >>> 16, this[i + 1] = t >>> 8, this[i] = t & 255) : Or(this, t, i, !0), i + 4;
};
K.prototype.writeUInt32BE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 4, 4294967295, 0), K.TYPED_ARRAY_SUPPORT ? (this[i] = t >>> 24, this[i + 1] = t >>> 16, this[i + 2] = t >>> 8, this[i + 3] = t & 255) : Or(this, t, i, !1), i + 4;
};
K.prototype.writeIntLE = function(t, i, a, l) {
  if (t = +t, i = i | 0, !l) {
    var h = Math.pow(2, 8 * a - 1);
    ze(this, t, i, a, h - 1, -h);
  }
  var c = 0, p = 1, u = 0;
  for (this[i] = t & 255; ++c < a && (p *= 256); )
    t < 0 && u === 0 && this[i + c - 1] !== 0 && (u = 1), this[i + c] = (t / p >> 0) - u & 255;
  return i + a;
};
K.prototype.writeIntBE = function(t, i, a, l) {
  if (t = +t, i = i | 0, !l) {
    var h = Math.pow(2, 8 * a - 1);
    ze(this, t, i, a, h - 1, -h);
  }
  var c = a - 1, p = 1, u = 0;
  for (this[i + c] = t & 255; --c >= 0 && (p *= 256); )
    t < 0 && u === 0 && this[i + c + 1] !== 0 && (u = 1), this[i + c] = (t / p >> 0) - u & 255;
  return i + a;
};
K.prototype.writeInt8 = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 1, 127, -128), K.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[i] = t & 255, i + 1;
};
K.prototype.writeInt16LE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 2, 32767, -32768), K.TYPED_ARRAY_SUPPORT ? (this[i] = t & 255, this[i + 1] = t >>> 8) : kr(this, t, i, !0), i + 2;
};
K.prototype.writeInt16BE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 2, 32767, -32768), K.TYPED_ARRAY_SUPPORT ? (this[i] = t >>> 8, this[i + 1] = t & 255) : kr(this, t, i, !1), i + 2;
};
K.prototype.writeInt32LE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 4, 2147483647, -2147483648), K.TYPED_ARRAY_SUPPORT ? (this[i] = t & 255, this[i + 1] = t >>> 8, this[i + 2] = t >>> 16, this[i + 3] = t >>> 24) : Or(this, t, i, !0), i + 4;
};
K.prototype.writeInt32BE = function(t, i, a) {
  return t = +t, i = i | 0, a || ze(this, t, i, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), K.TYPED_ARRAY_SUPPORT ? (this[i] = t >>> 24, this[i + 1] = t >>> 16, this[i + 2] = t >>> 8, this[i + 3] = t & 255) : Or(this, t, i, !1), i + 4;
};
function Au(e, t, i, a, l, h) {
  if (i + a > e.length) throw new RangeError("Index out of range");
  if (i < 0) throw new RangeError("Index out of range");
}
function gu(e, t, i, a, l) {
  return l || Au(e, t, i, 4), lu(e, t, i, a, 23, 4), i + 4;
}
K.prototype.writeFloatLE = function(t, i, a) {
  return gu(this, t, i, !0, a);
};
K.prototype.writeFloatBE = function(t, i, a) {
  return gu(this, t, i, !1, a);
};
function yu(e, t, i, a, l) {
  return l || Au(e, t, i, 8), lu(e, t, i, a, 52, 8), i + 8;
}
K.prototype.writeDoubleLE = function(t, i, a) {
  return yu(this, t, i, !0, a);
};
K.prototype.writeDoubleBE = function(t, i, a) {
  return yu(this, t, i, !1, a);
};
K.prototype.copy = function(t, i, a, l) {
  if (a || (a = 0), !l && l !== 0 && (l = this.length), i >= t.length && (i = t.length), i || (i = 0), l > 0 && l < a && (l = a), l === a || t.length === 0 || this.length === 0) return 0;
  if (i < 0)
    throw new RangeError("targetStart out of bounds");
  if (a < 0 || a >= this.length) throw new RangeError("sourceStart out of bounds");
  if (l < 0) throw new RangeError("sourceEnd out of bounds");
  l > this.length && (l = this.length), t.length - i < l - a && (l = t.length - i + a);
  var h = l - a, c;
  if (this === t && a < i && i < l)
    for (c = h - 1; c >= 0; --c)
      t[c + i] = this[c + a];
  else if (h < 1e3 || !K.TYPED_ARRAY_SUPPORT)
    for (c = 0; c < h; ++c)
      t[c + i] = this[c + a];
  else
    Uint8Array.prototype.set.call(
      t,
      this.subarray(a, a + h),
      i
    );
  return h;
};
K.prototype.fill = function(t, i, a, l) {
  if (typeof t == "string") {
    if (typeof i == "string" ? (l = i, i = 0, a = this.length) : typeof a == "string" && (l = a, a = this.length), t.length === 1) {
      var h = t.charCodeAt(0);
      h < 256 && (t = h);
    }
    if (l !== void 0 && typeof l != "string")
      throw new TypeError("encoding must be a string");
    if (typeof l == "string" && !K.isEncoding(l))
      throw new TypeError("Unknown encoding: " + l);
  } else typeof t == "number" && (t = t & 255);
  if (i < 0 || this.length < i || this.length < a)
    throw new RangeError("Out of range index");
  if (a <= i)
    return this;
  i = i >>> 0, a = a === void 0 ? this.length : a >>> 0, t || (t = 0);
  var c;
  if (typeof t == "number")
    for (c = i; c < a; ++c)
      this[c] = t;
  else {
    var p = dt(t) ? t : zi(new K(t, l).toString()), u = p.length;
    for (c = 0; c < a - i; ++c)
      this[c + i] = p[c % u];
  }
  return this;
};
var zA = /[^+\/0-9A-Za-z-_]/g;
function eg(e) {
  if (e = tg(e).replace(zA, ""), e.length < 2) return "";
  for (; e.length % 4 !== 0; )
    e = e + "=";
  return e;
}
function tg(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function sg(e) {
  return e < 16 ? "0" + e.toString(16) : e.toString(16);
}
function zi(e, t) {
  t = t || 1 / 0;
  for (var i, a = e.length, l = null, h = [], c = 0; c < a; ++c) {
    if (i = e.charCodeAt(c), i > 55295 && i < 57344) {
      if (!l) {
        if (i > 56319) {
          (t -= 3) > -1 && h.push(239, 191, 189);
          continue;
        } else if (c + 1 === a) {
          (t -= 3) > -1 && h.push(239, 191, 189);
          continue;
        }
        l = i;
        continue;
      }
      if (i < 56320) {
        (t -= 3) > -1 && h.push(239, 191, 189), l = i;
        continue;
      }
      i = (l - 55296 << 10 | i - 56320) + 65536;
    } else l && (t -= 3) > -1 && h.push(239, 191, 189);
    if (l = null, i < 128) {
      if ((t -= 1) < 0) break;
      h.push(i);
    } else if (i < 2048) {
      if ((t -= 2) < 0) break;
      h.push(
        i >> 6 | 192,
        i & 63 | 128
      );
    } else if (i < 65536) {
      if ((t -= 3) < 0) break;
      h.push(
        i >> 12 | 224,
        i >> 6 & 63 | 128,
        i & 63 | 128
      );
    } else if (i < 1114112) {
      if ((t -= 4) < 0) break;
      h.push(
        i >> 18 | 240,
        i >> 12 & 63 | 128,
        i >> 6 & 63 | 128,
        i & 63 | 128
      );
    } else
      throw new Error("Invalid code point");
  }
  return h;
}
function ig(e) {
  for (var t = [], i = 0; i < e.length; ++i)
    t.push(e.charCodeAt(i) & 255);
  return t;
}
function rg(e, t) {
  for (var i, a, l, h = [], c = 0; c < e.length && !((t -= 2) < 0); ++c)
    i = e.charCodeAt(c), a = i >> 8, l = i % 256, h.push(l), h.push(a);
  return h;
}
function Su(e) {
  return _A(eg(e));
}
function _r(e, t, i, a) {
  for (var l = 0; l < a && !(l + i >= t.length || l >= e.length); ++l)
    t[l + i] = e[l];
  return l;
}
function ng(e) {
  return e !== e;
}
function ag(e) {
  return e != null && (!!e._isBuffer || xu(e) || og(e));
}
function xu(e) {
  return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function og(e) {
  return typeof e.readFloatLE == "function" && typeof e.slice == "function" && xu(e.slice(0, 0));
}
function lg(e) {
  const t = (
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    typeof atob == "function" ? (
      // Browser (and Node >=16)
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      atob(e)
    ) : (
      // Older Node versions (<16)
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      typeof K.from == "function" ? (
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        K.from(e, "base64").toString("binary")
      ) : (
        // eslint-disable-next-line unicorn/no-new-buffer, n/no-deprecated-api
        new K(e, "base64").toString("binary")
      )
    )
  ), i = t.length & -2, a = new Uint16Array(i / 2);
  for (let l = 0, h = 0; l < i; l += 2) {
    const c = t.charCodeAt(l), p = t.charCodeAt(l + 1);
    a[h++] = c | p << 8;
  }
  return a;
}
const Iu = /* @__PURE__ */ lg("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IAAOA12J/c8iFvaxBhAAhOVGFjZGZnbG1vcHFzdHV4owOlA6kDsAO/A8IDxgPNA9ID8gP9AwEEFAQeBCAEJQRHAEphSAA7gNAA0EBjAHUAdABlADuAyQDJQIABYWl5ALYDuQO+A/Ihb24aYXIAYwA7gMoAykAtZG8AdAAWYXIAAOA12AjdcgBhAHYAZQA7gMgAyEDlIm1lbnQAoAgiAAFhcNYD2QNjAHIAEmF0AHkAUwLhAwAAAADpA20lYWxsU3F1YXJlAACg+yVlJ3J5U21hbGxTcXVhcmUAAKCrJQABZ3D2A/kDbwBuABhhZgAA4DXYPN3zImlsb26VY3UAAAFhaQYEDgRsAFSgdSppImxkZQAAoEIi7CNpYnJpdW0AoMwhAAFjaRgEGwRyAACgMCFtAACgcyphAJdjbQBsADuAywDLQAABaXApBC0E8yF0cwCgAyLvJG5lbnRpYWxFAKBHIYACY2Zpb3MAPQQ/BEMEXQRyBHkAJGRyAADgNdgJ3WwibGVkAFMCTAQAAAAAVARtJWFsbFNxdWFyZQAAoPwlZSdyeVNtYWxsU3F1YXJlAACgqiVwA2UEAABpBAAAAABtBGYAAOA12D3dwSFsbACgACLyI2llcnRyZgCgMSFjAPIAcQQABkpUYWJjZGZnb3JzdIgEiwSOBJMElwSkBKcEqwStBLIE5QTqBGMAeQADZDuAPgA+QO0hbWFkoJMD3GNyImV2ZQAeYYABZWl5AJ0EoASjBOQhaWwiYXIAYwAcYRNkbwB0ACBhcgAA4DXYCt0AoNkicABmAADgNdg+3eUiYXRlcgADRUZHTFNUvwTIBM8E1QTZBOAEcSJ1YWwATKBlIuUhc3MAoNsidSRsbEVxdWFsAACgZyJyI2VhdGVyAACgoirlIXNzAKB3IuwkYW50RXF1YWwAoH4qaSJsZGUAAKBzImMAcgAA4DXYotwAoGsiAARBYWNmaW9zdfkE/QQFBQgFCwUTBSIFKwVSIkRjeQAqZAABY3QBBQQFZQBrAMdiXmDpIXJjJGFyAACgDCFsJWJlcnRTcGFjZQAAoAsh8AEYBQAAGwVmAACgDSHpJXpvbnRhbExpbmUAoAAlAAFjdCYFKAXyABIF8iFvayZhbQBwAEQBMQU5BW8AdwBuAEgAdQBtAPAAAAFxInVhbAAAoE8iAAdFSk9hY2RmZ21ub3N0dVMFVgVZBVwFYwVtBXAFcwV6BZAFtgXFBckFzQVjAHkAFWTsIWlnMmFjAHkAAWRjAHUAdABlADuAzQDNQAABaXlnBWwFcgBjADuAzgDOQBhkbwB0ADBhcgAAoBEhcgBhAHYAZQA7gMwAzEAAoREhYXB/BYsFAAFjZ4MFhQVyACphaSNuYXJ5SQAAoEghbABpAGUA8wD6AvQBlQUAAKUFZaAsIgABZ3KaBZ4F8iFhbACgKyLzI2VjdGlvbgCgwiJpI3NpYmxlAAABQ1SsBbEFbyJtbWEAAKBjIGkibWVzAACgYiCAAWdwdAC8Bb8FwwVvAG4ALmFmAADgNdhA3WEAmWNjAHIAAKAQIWkibGRlAChh6wHSBQAA1QVjAHkABmRsADuAzwDPQIACY2Zvc3UA4QXpBe0F8gX9BQABaXnlBegFcgBjADRhGWRyAADgNdgN3XAAZgAA4DXYQd3jAfcFAAD7BXIAAOA12KXc8iFjeQhk6yFjeQRkgANISmFjZm9zAAwGDwYSBhUGHQYhBiYGYwB5ACVkYwB5AAxk8CFwYZpjAAFleRkGHAbkIWlsNmEaZHIAAOA12A7dcABmAADgNdhC3WMAcgAA4DXYptyABUpUYWNlZmxtb3N0AD0GQAZDBl4GawZkB2gHcAd0B80H2gdjAHkACWQ7gDwAPECAAmNtbnByAEwGTwZSBlUGWwb1IXRlOWHiIWRhm2NnAACg6ifsI2FjZXRyZgCgEiFyAACgniGAAWFleQBkBmcGagbyIW9uPWHkIWlsO2EbZAABZnNvBjQHdAAABUFDREZSVFVWYXKABp4GpAbGBssG3AYDByEHwQIqBwABbnKEBowGZyVsZUJyYWNrZXQAAKDoJ/Ihb3cAoZAhQlKTBpcGYQByAACg5CHpJGdodEFycm93AKDGIWUjaWxpbmcAAKAII28A9QGqBgAAsgZiJWxlQnJhY2tldAAAoOYnbgDUAbcGAAC+BmUkZVZlY3RvcgAAoGEp5SJjdG9yQqDDIWEAcgAAoFkpbCJvb3IAAKAKI2kiZ2h0AAABQVbSBtcGciJyb3cAAKCUIeUiY3RvcgCgTikAAWVy4AbwBmUAAKGjIkFW5gbrBnIicm93AACgpCHlImN0b3IAoFopaSNhbmdsZQBCorIi+wYAAAAA/wZhAHIAAKDPKXEidWFsAACgtCJwAIABRFRWAAoHEQcYB+8kd25WZWN0b3IAoFEpZSRlVmVjdG9yAACgYCnlImN0b3JCoL8hYQByAACgWCnlImN0b3JCoLwhYQByAACgUilpAGcAaAB0AGEAcgByAG8A9wDMAnMAAANFRkdMU1Q/B0cHTgdUB1gHXwfxJXVhbEdyZWF0ZXIAoNoidSRsbEVxdWFsAACgZiJyI2VhdGVyAACgdiLlIXNzAKChKuwkYW50RXF1YWwAoH0qaSJsZGUAAKByInIAAOA12A/dZaDYIuYjdGFycm93AKDaIWkiZG90AD9hgAFucHcAege1B7kHZwAAAkxSbHKCB5QHmwerB+UhZnQAAUFSiAeNB3Iicm93AACg9SfpJGdodEFycm93AKD3J+kkZ2h0QXJyb3cAoPYn5SFmdAABYXLcAqEHaQBnAGgAdABhAHIAcgBvAPcA5wJpAGcAaAB0AGEAcgByAG8A9wDuAmYAAOA12EPdZQByAAABTFK/B8YHZSRmdEFycm93AACgmSHpJGdodEFycm93AKCYIYABY2h0ANMH1QfXB/IAWgYAoLAh8iFva0FhAKBqIgAEYWNlZmlvc3XpB+wH7gf/BwMICQgOCBEIcAAAoAUpeQAcZAABZGzyB/kHaSR1bVNwYWNlAACgXyBsI2ludHJmAACgMyFyAADgNdgQ3e4jdXNQbHVzAKATInAAZgAA4DXYRN1jAPIA/gecY4AESmFjZWZvc3R1ACEIJAgoCDUIgQiFCDsKQApHCmMAeQAKZGMidXRlAENhgAFhZXkALggxCDQI8iFvbkdh5CFpbEVhHWSAAWdzdwA7CGEIfQjhInRpdmWAAU1UVgBECEwIWQhlJWRpdW1TcGFjZQAAoAsgaABpAAABY25SCFMIawBTAHAAYQBjAOUASwhlAHIAeQBUAGgAaQDuAFQI9CFlZAABR0xnCHUIcgBlAGEAdABlAHIARwByAGUAYQB0AGUA8gDrBGUAcwBzAEwAZQBzAPMA2wdMImluZQAKYHIAAOA12BHdAAJCbnB0jAiRCJkInAhyImVhawAAoGAgwiZyZWFraW5nU3BhY2WgYGYAAKAVIUOq7CqzCMIIzQgAAOcIGwkAAAAAAAAtCQAAbwkAAIcJAACdCcAJGQoAADQKAAFvdbYIvAjuI2dydWVudACgYiJwIkNhcAAAoG0ibyh1YmxlVmVydGljYWxCYXIAAKAmIoABbHF4ANII1wjhCOUibWVudACgCSL1IWFsVKBgImkibGRlAADgQiI4A2kic3RzAACgBCJyI2VhdGVyAACjbyJFRkdMU1T1CPoIAgkJCQ0JFQlxInVhbAAAoHEidSRsbEVxdWFsAADgZyI4A3IjZWF0ZXIAAOBrIjgD5SFzcwCgeSLsJGFudEVxdWFsAOB+KjgDaSJsZGUAAKB1IvUhbXBEASAJJwnvI3duSHVtcADgTiI4A3EidWFsAADgTyI4A2UAAAFmczEJRgn0JFRyaWFuZ2xlQqLqIj0JAAAAAEIJYQByAADgzyk4A3EidWFsAACg7CJzAICibiJFR0xTVABRCVYJXAlhCWkJcSJ1YWwAAKBwInIjZWF0ZXIAAKB4IuUhc3MA4GoiOAPsJGFudEVxdWFsAOB9KjgDaSJsZGUAAKB0IuUic3RlZAABR0x1CX8J8iZlYXRlckdyZWF0ZXIA4KIqOAPlI3NzTGVzcwDgoSo4A/IjZWNlZGVzAKGAIkVTjwmVCXEidWFsAADgryo4A+wkYW50RXF1YWwAoOAiAAFlaaAJqQl2JmVyc2VFbGVtZW50AACgDCLnJWh0VHJpYW5nbGVCousitgkAAAAAuwlhAHIAAODQKTgDcSJ1YWwAAKDtIgABcXXDCeAJdSNhcmVTdQAAAWJwywnVCfMhZXRF4I8iOANxInVhbAAAoOIi5SJyc2V0ReCQIjgDcSJ1YWwAAKDjIoABYmNwAOYJ8AkNCvMhZXRF4IIi0iBxInVhbAAAoIgi4yJlZWRzgKGBIkVTVAD6CQAKBwpxInVhbAAA4LAqOAPsJGFudEVxdWFsAKDhImkibGRlAADgfyI4A+UicnNldEXggyLSIHEidWFsAACgiSJpImxkZQCAoUEiRUZUACIKJwouCnEidWFsAACgRCJ1JGxsRXF1YWwAAKBHImkibGRlAACgSSJlJXJ0aWNhbEJhcgAAoCQiYwByAADgNdip3GkAbABkAGUAO4DRANFAnWMAB0VhY2RmZ21vcHJzdHV2XgphCmgKcgp2CnoKgQqRCpYKqwqtCrsKyArNCuwhaWdSYWMAdQB0AGUAO4DTANNAAAFpeWwKcQpyAGMAO4DUANRAHmRiImxhYwBQYXIAAOA12BLdcgBhAHYAZQA7gNIA0kCAAWFlaQCHCooKjQpjAHIATGFnAGEAqWNjInJvbgCfY3AAZgAA4DXYRt3lI25DdXJseQABRFGeCqYKbyV1YmxlUXVvdGUAAKAcIHUib3RlAACgGCAAoFQqAAFjbLEKtQpyAADgNdiq3GEAcwBoADuA2ADYQGkAbAHACsUKZABlADuA1QDVQGUAcwAAoDcqbQBsADuA1gDWQGUAcgAAAUJQ0wrmCgABYXLXCtoKcgAAoD4gYQBjAAABZWvgCuIKAKDeI2UAdAAAoLQjYSVyZW50aGVzaXMAAKDcI4AEYWNmaGlsb3JzAP0KAwsFCwkLCwsMCxELIwtaC3IjdGlhbEQAAKACInkAH2RyAADgNdgT3WkApmOgY/Ujc01pbnVzsWAAAWlwFQsgC24AYwBhAHIAZQBwAGwAYQBuAOUACgVmAACgGSGAobsqZWlvACoLRQtJC+MiZWRlc4CheiJFU1QANAs5C0ALcSJ1YWwAAKCvKuwkYW50RXF1YWwAoHwiaSJsZGUAAKB+Im0AZQAAoDMgAAFkcE0LUQv1IWN0AKAPIm8jcnRpb24AYaA3ImwAAKAdIgABY2leC2ILcgAA4DXYq9yoYwACVWZvc2oLbwtzC3cLTwBUADuAIgAiQHIAAOA12BTdcABmAACgGiFjAHIAAOA12KzcAAZCRWFjZWZoaW9yc3WPC5MLlwupC7YL2AvbC90LhQyTDJoMowzhIXJyAKAQKUcAO4CuAK5AgAFjbnIAnQugC6ML9SF0ZVRhZwAAoOsncgB0oKAhbAAAoBYpgAFhZXkArwuyC7UL8iFvblhh5CFpbFZhIGR2oBwhZSJyc2UAAAFFVb8LzwsAAWxxwwvIC+UibWVudACgCyL1JGlsaWJyaXVtAKDLIXAmRXF1aWxpYnJpdW0AAKBvKXIAAKAcIW8AoWPnIWh0AARBQ0RGVFVWYewLCgwQDDIMNwxeDHwM9gIAAW5y8Av4C2clbGVCcmFja2V0AACg6SfyIW93AKGSIUJM/wsDDGEAcgAAoOUhZSRmdEFycm93AACgxCFlI2lsaW5nAACgCSNvAPUBFgwAAB4MYiVsZUJyYWNrZXQAAKDnJ24A1AEjDAAAKgxlJGVWZWN0b3IAAKBdKeUiY3RvckKgwiFhAHIAAKBVKWwib29yAACgCyMAAWVyOwxLDGUAAKGiIkFWQQxGDHIicm93AACgpiHlImN0b3IAoFspaSNhbmdsZQBCorMiVgwAAAAAWgxhAHIAAKDQKXEidWFsAACgtSJwAIABRFRWAGUMbAxzDO8kd25WZWN0b3IAoE8pZSRlVmVjdG9yAACgXCnlImN0b3JCoL4hYQByAACgVCnlImN0b3JCoMAhYQByAACgUykAAXB1iQyMDGYAAKAdIe4kZEltcGxpZXMAoHAp6SRnaHRhcnJvdwCg2yEAAWNongyhDHIAAKAbIQCgsSHsJGVEZWxheWVkAKD0KYAGSE9hY2ZoaW1vcXN0dQC/DMgMzAzQDOIM5gwKDQ0NFA0ZDU8NVA1YDQABQ2PDDMYMyCFjeSlkeQAoZEYiVGN5ACxkYyJ1dGUAWmEAorwqYWVpedgM2wzeDOEM8iFvbmBh5CFpbF5hcgBjAFxhIWRyAADgNdgW3e8hcnQAAkRMUlXvDPYM/QwEDW8kd25BcnJvdwAAoJMhZSRmdEFycm93AACgkCHpJGdodEFycm93AKCSIXAjQXJyb3cAAKCRIechbWGjY+EkbGxDaXJjbGUAoBgicABmAADgNdhK3XICHw0AAAAAIg10AACgGiLhIXJlgKGhJUlTVQAqDTINSg3uJXRlcnNlY3Rpb24AoJMidQAAAWJwNw1ADfMhZXRFoI8icSJ1YWwAAKCRIuUicnNldEWgkCJxInVhbAAAoJIibiJpb24AAKCUImMAcgAA4DXYrtxhAHIAAKDGIgACYmNtcF8Nag2ODZANc6DQImUAdABFoNAicSJ1YWwAAKCGIgABY2huDYkNZSJlZHMAgKF7IkVTVAB4DX0NhA1xInVhbAAAoLAq7CRhbnRFcXVhbACgfSJpImxkZQAAoH8iVABoAGEA9ADHCwCgESIAodEiZXOVDZ8NciJzZXQARaCDInEidWFsAACghyJlAHQAAKDRIoAFSFJTYWNmaGlvcnMAtQ27Db8NyA3ODdsN3w3+DRgOHQ4jDk8AUgBOADuA3gDeQMEhREUAoCIhAAFIY8MNxg1jAHkAC2R5ACZkAAFidcwNzQ0JYKRjgAFhZXkA1A3XDdoN8iFvbmRh5CFpbGJhImRyAADgNdgX3QABZWnjDe4N8gHoDQAA7Q3lImZvcmUAoDQiYQCYYwABY27yDfkNayNTcGFjZQAA4F8gCiDTInBhY2UAoAkg7CFkZYChPCJFRlQABw4MDhMOcSJ1YWwAAKBDInUkbGxFcXVhbAAAoEUiaSJsZGUAAKBIInAAZgAA4DXYS93pI3BsZURvdACg2yAAAWN0Jw4rDnIAAOA12K/c8iFva2Zh4QpFDlYOYA5qDgAAbg5yDgAAAAAAAAAAAAB5DnwOqA6zDgAADg8RDxYPGg8AAWNySA5ODnUAdABlADuA2gDaQHIAb6CfIeMhaXIAoEkpcgDjAVsOAABdDnkADmR2AGUAbGEAAWl5Yw5oDnIAYwA7gNsA20AjZGIibGFjAHBhcgAA4DXYGN1yAGEAdgBlADuA2QDZQOEhY3JqYQABZGl/Dp8OZQByAAABQlCFDpcOAAFhcokOiw5yAF9gYQBjAAABZWuRDpMOAKDfI2UAdAAAoLUjYSVyZW50aGVzaXMAAKDdI28AbgBQoMMi7CF1cwCgjiIAAWdwqw6uDm8AbgByYWYAAOA12EzdAARBREVUYWRwc78O0g7ZDuEOBQPqDvMOBw9yInJvdwDCoZEhyA4AAMwOYQByAACgEilvJHduQXJyb3cAAKDFIW8kd25BcnJvdwAAoJUhcSV1aWxpYnJpdW0AAKBuKWUAZQBBoKUiciJyb3cAAKClIW8AdwBuAGEAcgByAG8A9wAQA2UAcgAAAUxS+Q4AD2UkZnRBcnJvdwAAoJYh6SRnaHRBcnJvdwCglyFpAGyg0gNvAG4ApWPpIW5nbmFjAHIAAOA12LDcaSJsZGUAaGFtAGwAO4DcANxAgAREYmNkZWZvc3YALQ8xDzUPNw89D3IPdg97D4AP4SFzaACgqyJhAHIAAKDrKnkAEmThIXNobKCpIgCg5ioAAWVyQQ9DDwCgwSKAAWJ0eQBJD00Paw9hAHIAAKAWIGmgFiDjIWFsAAJCTFNUWA9cD18PZg9hAHIAAKAjIukhbmV8YGUkcGFyYXRvcgAAoFgnaSJsZGUAAKBAItQkaGluU3BhY2UAoAogcgAA4DXYGd1wAGYAAOA12E3dYwByAADgNdix3GQiYXNoAACgqiKAAmNlZm9zAI4PkQ+VD5kPng/pIXJjdGHkIWdlAKDAInIAAOA12BrdcABmAADgNdhO3WMAcgAA4DXYstwAAmZpb3OqD64Prw+0D3IAAOA12BvdnmNwAGYAAOA12E/dYwByAADgNdiz3IAEQUlVYWNmb3N1AMgPyw/OD9EP2A/gD+QP6Q/uD2MAeQAvZGMAeQAHZGMAeQAuZGMAdQB0AGUAO4DdAN1AAAFpedwP3w9yAGMAdmErZHIAAOA12BzdcABmAADgNdhQ3WMAcgAA4DXYtNxtAGwAeGEABEhhY2RlZm9z/g8BEAUQDRAQEB0QIBAkEGMAeQAWZGMidXRlAHlhAAFheQkQDBDyIW9ufWEXZG8AdAB7YfIBFRAAABwQbwBXAGkAZAB0AOgAVAhhAJZjcgAAoCghcABmAACgJCFjAHIAAOA12LXc4QtCEEkQTRAAAGcQbRByEAAAAAAAAAAAeRCKEJcQ8hD9EAAAGxEhETIROREAAD4RYwB1AHQAZQA7gOEA4UByImV2ZQADYYCiPiJFZGl1eQBWEFkQWxBgEGUQAOA+IjMDAKA/InIAYwA7gOIA4kB0AGUAO4C0ALRAMGRsAGkAZwA7gOYA5kByoGEgAOA12B7dcgBhAHYAZQA7gOAA4EAAAWVwfBCGEAABZnCAEIQQ8yF5bQCgNSHoAIMQaABhALFjAAFhcI0QWwAAAWNskRCTEHIAAWFnAACgPypkApwQAAAAALEQAKInImFkc3ajEKcQqRCuEG4AZAAAoFUqAKBcKmwib3BlAACgWCoAoFoqAKMgImVsbXJzersQvRDAEN0Q5RDtEACgpCllAACgICJzAGQAYaAhImEEzhDQENIQ1BDWENgQ2hDcEACgqCkAoKkpAKCqKQCgqykAoKwpAKCtKQCgrikAoK8pdAB2oB8iYgBkoL4iAKCdKQABcHTpEOwQaAAAoCIixWDhIXJyAKB8IwABZ3D1EPgQbwBuAAVhZgAA4DXYUt0Ao0giRWFlaW9wBxEJEQ0RDxESERQRAKBwKuMhaXIAoG8qAKBKImQAAKBLInMAJ2DyIW94ZaBIIvEADhFpAG4AZwA7gOUA5UCAAWN0eQAmESoRKxFyAADgNdi23CpgbQBwAGWgSCLxAPgBaQBsAGQAZQA7gOMA40BtAGwAO4DkAORAAAFjaUERRxFvAG4AaQBuAPQA6AFuAHQAAKARKgAITmFiY2RlZmlrbG5vcHJzdWQRaBGXEZ8RpxGrEdIR1hErEjASexKKEn0RThNbE3oTbwB0AACg7SoAAWNybBGJEWsAAAJjZXBzdBF4EX0RghHvIW5nAKBMInAjc2lsb24A9mNyImltZQAAoDUgaQBtAGWgPSJxAACgzSJ2AY0RkRFlAGUAAKC9ImUAZABnoAUjZQAAoAUjcgBrAHSgtSPiIXJrAKC2IwABb3mjEaYRbgDnAHcRMWTxIXVvAKAeIIACY21wcnQAtBG5Eb4RwRHFEeEhdXPloDUi5ABwInR5dgAAoLApcwDpAH0RbgBvAPUA6gCAAWFodwDLEcwRzhGyYwCgNiHlIWVuAKBsInIAAOA12B/dZwCAA2Nvc3R1dncA4xHyEQUSEhIhEiYSKRKAAWFpdQDpEesR7xHwAKMFcgBjAACg7yVwAACgwyKAAWRwdAD4EfwRABJvAHQAAKAAKuwhdXMAoAEqaSJtZXMAAKACKnECCxIAAAAADxLjIXVwAKAGKmEAcgAAoAUm8iNpYW5nbGUAAWR1GhIeEu8hd24AoL0lcAAAoLMlcCJsdXMAAKAEKmUA5QBCD+UAkg9hInJvdwAAoA0pgAFha28ANhJoEncSAAFjbjoSZRJrAIABbHN0AEESRxJNEm8jemVuZ2UAAKDrKXEAdQBhAHIA5QBcBPIjaWFuZ2xlgKG0JWRscgBYElwSYBLvIXduAKC+JeUhZnQAoMIlaSJnaHQAAKC4JWsAAKAjJLEBbRIAAHUSsgFxEgAAcxIAoJIlAKCRJTQAAKCTJWMAawAAoIglAAFlb38ShxJx4D0A5SD1IWl2AOBhIuUgdAAAoBAjAAJwdHd4kRKVEpsSnxJmAADgNdhT3XSgpSJvAG0AAKClIvQhaWUAoMgiAAZESFVWYmRobXB0dXayEsES0RLgEvcS+xIKExoTHxMjEygTNxMAAkxSbHK5ErsSvRK/EgCgVyUAoFQlAKBWJQCgUyUAolAlRFVkdckSyxLNEs8SAKBmJQCgaSUAoGQlAKBnJQACTFJsctgS2hLcEt4SAKBdJQCgWiUAoFwlAKBZJQCjUSVITFJobHLrEu0S7xLxEvMS9RIAoGwlAKBjJQCgYCUAoGslAKBiJQCgXyVvAHgAAKDJKQACTFJscgITBBMGEwgTAKBVJQCgUiUAoBAlAKAMJQCiACVEVWR1EhMUExYTGBMAoGUlAKBoJQCgLCUAoDQlaSJudXMAAKCfIuwhdXMAoJ4iaSJtZXMAAKCgIgACTFJsci8TMRMzEzUTAKBbJQCgWCUAoBglAKAUJQCjAiVITFJobHJCE0QTRhNIE0oTTBMAoGolAKBhJQCgXiUAoDwlAKAkJQCgHCUAAWV2UhNVE3YA5QD5AGIAYQByADuApgCmQAACY2Vpb2ITZhNqE24TcgAA4DXYt9xtAGkAAKBPIG0A5aA9IogRbAAAoVwAYmh0E3YTAKDFKfMhdWIAoMgnbAF+E4QTbABloCIgdAAAoCIgcAAAoU4iRWWJE4sTAKCuKvGgTyI8BeEMqRMAAN8TABQDFB8UAAAjFDQUAAAAAIUUAAAAAI0UAAAAANcU4xT3FPsUAACIFQAAlhWAAWNwcgCuE7ET1RP1IXRlB2GAoikiYWJjZHMAuxO/E8QTzhPSE24AZAAAoEQqciJjdXAAAKBJKgABYXXIE8sTcAAAoEsqcAAAoEcqbwB0AACgQCoA4CkiAP4AAWVv2RPcE3QAAKBBIO4ABAUAAmFlaXXlE+8T9RP4E/AB6hMAAO0TcwAAoE0qbwBuAA1hZABpAGwAO4DnAOdAcgBjAAlhcABzAHOgTCptAACgUCpvAHQAC2GAAWRtbgAIFA0UEhRpAGwAO4C4ALhAcCJ0eXYAAKCyKXQAAIGiADtlGBQZFKJAcgBkAG8A9ABiAXIAAOA12CDdgAFjZWkAKBQqFDIUeQBHZGMAawBtoBMn4SFyawCgEyfHY3IAAKPLJUVjZWZtcz8UQRRHFHcUfBSAFACgwykAocYCZWxGFEkUcQAAoFciZQBhAlAUAAAAAGAUciJyb3cAAAFsclYUWhTlIWZ0AKC6IWkiZ2h0AACguyGAAlJTYWNkAGgUaRRrFG8UcxSuYACgyCRzAHQAAKCbIukhcmMAoJoi4SFzaACgnSJuImludAAAoBAqaQBkAACg7yrjIWlyAKDCKfUhYnN1oGMmaQB0AACgYybsApMUmhS2FAAAwxRvAG4AZaA6APGgVCKrAG0CnxQAAAAAoxRhAHSgLABAYAChASJmbKcUqRTuABMNZQAAAW14rhSyFOUhbnQAoAEiZQDzANIB5wG6FAAAwBRkoEUibwB0AACgbSpuAPQAzAGAAWZyeQDIFMsUzhQA4DXYVN1vAOQA1wEAgakAO3MeAdMUcgAAoBchAAFhb9oU3hRyAHIAAKC1IXMAcwAAoBcnAAFjdeYU6hRyAADgNdi43AABYnDuFPIUZaDPKgCg0SploNAqAKDSKuQhb3QAoO8igANkZWxwcnZ3AAYVEBUbFSEVRBVlFYQV4SFycgABbHIMFQ4VAKA4KQCgNSlwAhYVAAAAABkVcgAAoN4iYwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWlsN2E6ZHIAAOA12CjdciJlZW4AOGFjAHkARWRjAHkAXGRwAGYAAOA12FzdYwByAADgNdjA3IALQUJFSGFiY2RlZmdoamxtbm9wcnN0dXYAXhxtHHEcdRx5HN8cBx0dHTwd3B3tHfEdAR4EHh0eLB5FHrwewx7hHgkfPR9LH4ABYXJ0AGQcZxxpHHIA8gBvB/IAxQLhIWlsAKAbKeEhcnIAoA4pZ6BmIgCgiyphAHIAAKBiKWMJjRwAAJAcAACVHAAAAAAAAAAAAACZHJwcAACmHKgcrRwAANIc9SF0ZTph7SJwdHl2AKC0KXIAYQDuAFoG4iFkYbtjZwAAoegnZGyhHKMcAKCRKeUAiwYAoIUqdQBvADuAqwCrQHIAgKOQIWJmaGxwc3QAuhy/HMIcxBzHHMoczhxmoOQhcwAAoB8pcwAAoB0p6wCyGnAAAKCrIWwAAKA5KWkAbQAAoHMpbAAAoKIhAKGrKmFl1hzaHGkAbAAAoBkpc6CtKgDgrSoA/oABYWJyAOUc6RztHHIAcgAAoAwpcgBrAACgcicAAWFr8Rz4HGMAAAFla/Yc9xx7YFtgAAFlc/wc/hwAoIspbAAAAWR1Ax0FHQCgjykAoI0pAAJhZXV5Dh0RHRodHB3yIW9uPmEAAWRpFR0YHWkAbAA8YewAowbiAPccO2QAAmNxcnMkHScdLB05HWEAAKA2KXUAbwDyoBwgqhEAAWR1MB00HeghYXIAoGcpcyJoYXIAAKBLKWgAAKCyIQCiZCJmZ3FzRB1FB5Qdnh10AIACYWhscnQATh1WHWUdbB2NHXIicm93AHSgkCFhAOkAzxxhI3Jwb29uAAABZHVeHWId7yF3bgCgvSFwAACgvCHlJGZ0YXJyb3dzAKDHIWkiZ2h0AIABYWhzAHUdex2DHXIicm93APOglCGdBmEAcgBwAG8AbwBuAPMAzgtxAHUAaQBnAGEAcgByAG8A9wBlGugkcmVldGltZXMAoMsi8aFkIk0HAACaHWwAYQBuAPQAXgcAon0qY2Rnc6YdqR2xHbcdYwAAoKgqbwB0AG+gfypyoIEqAKCDKmXg2iIA/nMAAKCTKoACYWRlZ3MAwB3GHcod1h3ZHXAAcAByAG8A+ACmHG8AdAAAoNYicQAAAWdxzx3SHXQA8gBGB2cAdADyAHQcdADyAFMHaQDtAGMHgAFpbHIA4h3mHeod8yFodACgfClvAG8A8gDKBgDgNdgp3UWgdiIAoJEqYQH1Hf4dcgAAAWR1YB35HWygvCEAoGopbABrAACghCVjAHkAWWQAomoiYWNodAweDx4VHhkecgDyAGsdbwByAG4AZQDyAGAW4SFyZACgaylyAGkAAKD6JQABaW8hHiQe5CFvdEBh9SFzdGGgsCPjIWhlAKCwIwACRWFlczMeNR48HkEeAKBoInAAcKCJKvIhb3gAoIkqcaCHKvGghyo0HmkAbQAAoOYiAARhYm5vcHR3elIeXB5fHoUelh6mHqsetB4AAW5yVh5ZHmcAAKDsJ3IAAKD9IXIA6wCwBmcAgAFsbXIAZh52Hnse5SFmdAABYXKIB2weaQBnAGgAdABhAHIAcgBvAPcAkwfhInBzdG8AoPwnaQBnAGgAdABhAHIAcgBvAPcAmgdwI2Fycm93AAABbHKNHpEeZQBmAPQAxhxpImdodAAAoKwhgAFhZmwAnB6fHqIecgAAoIUpAOA12F3ddQBzAACgLSppIm1lcwAAoDQqYQGvHrMecwB0AACgFyLhAIoOZaHKJbkeRhLuIWdlAKDKJWEAcgBsoCgAdAAAoJMpgAJhY2htdADMHs8e1R7bHt0ecgDyAJ0GbwByAG4AZQDyANYWYQByAGSgyyEAoG0pAKAOIHIAaQAAoL8iAANhY2hpcXTrHu8e1QfzHv0eBh/xIXVvAKA5IHIAAOA12MHcbQDloXIi+h4AAPweAKCNKgCgjyoAAWJ19xwBH28AcqAYIACgGiDyIW9rQmEAhDwAO2NkaGlscXJCBhcfxh0gHyQfKB8sHzEfAAFjaRsfHR8AoKYqcgAAoHkqcgBlAOUAkx3tIWVzAKDJIuEhcnIAoHYpdSJlc3QAAKB7KgABUGk1HzkfYQByAACglillocMlAgdfEnIAAAFkdUIfRx9zImhhcgAAoEop6CFhcgCgZikAAWVuTx9WH3IjdG5lcXEAAOBoIgD+xQBUHwAHRGFjZGVmaGlsbm9wc3VuH3Ifoh+rH68ftx+7H74f5h/uH/MfBwj/HwsgxCFvdACgOiIAAmNscHJ5H30fiR+eH3IAO4CvAK9AAAFldIEfgx8AoEImZaAgJ3MAZQAAoCAnc6CmIXQAbwCAoaYhZGx1AJQfmB+cH28AdwDuAHkDZQBmAPQA6gbwAOkO6yFlcgCgriUAAW95ph+qH+0hbWEAoCkqPGThIXNoAKAUIOElc3VyZWRhbmdsZQCgISJyAADgNdgq3W8AAKAnIYABY2RuAMQfyR/bH3IAbwA7gLUAtUBhoiMi0B8AANMf1x9zAPQAKxFpAHIAAKDwKm8AdAA7gLcAt0B1AHMA4qESIh4TAADjH3WgOCIAoCoqYwHqH+0fcAAAoNsq8gB+GnAAbAB1APMACAgAAWRw9x/7H+UhbHMAoKciZgAA4DXYXt0AAWN0AyAHIHIAAOA12MLc8CFvcwCgPiJsobwDECAVIPQiaW1hcACguCJhAPAAEyAADEdMUlZhYmNkZWZnaGlqbG1vcHJzdHV2dzwgRyBmIG0geSCqILgg2iDeIBEhFSEyIUMhTSFQIZwhnyHSIQAiIyKLIrEivyIUIwABZ3RAIEMgAODZIjgD9uBrItIgBwmAAWVsdABNIF8gYiBmAHQAAAFhclMgWCByInJvdwAAoM0h6SRnaHRhcnJvdwCgziEA4NgiOAP24Goi0iBfCekkZ2h0YXJyb3cAoM8hAAFEZHEgdSDhIXNoAKCvIuEhc2gAoK4igAJiY25wdACCIIYgiSCNIKIgbABhAACgByL1IXRlRGFnAADgICLSIACiSSJFaW9wlSCYIJwgniAA4HAqOANkAADgSyI4A3MASWFyAG8A+AAyCnUAcgBhoG4mbADzoG4mmwjzAa8gAACzIHAAO4CgAKBAbQBwAOXgTiI4AyoJgAJhZW91eQDBIMogzSDWINkg8AHGIAAAyCAAoEMqbwBuAEhh5CFpbEZhbgBnAGSgRyJvAHQAAOBtKjgDcAAAoEIqPWThIXNoAKATIACjYCJBYWRxc3jpIO0g+SD+IAIhDCFyAHIAAKDXIXIAAAFocvIg9SBrAACgJClvoJch9wAGD28AdAAA4FAiOAN1AGkA9gC7CAABZWkGIQohYQByAACgKCntAN8I6SFzdPOgBCLlCHIAAOA12CvdAAJFZXN0/wgcISshLiHxoXEiIiEAABMJ8aFxIgAJAAAnIWwAYQBuAPQAEwlpAO0AGQlyoG8iAKBvIoABQWFwADghOyE/IXIA8gBeIHIAcgAAoK4hYQByAACg8ipzogsiSiEAAAAAxwtkoPwiAKD6ImMAeQBaZIADQUVhZGVzdABcIV8hYiFmIWkhkyGWIXIA8gBXIADgZiI4A3IAcgAAoJohcgAAoCUggKFwImZxcwBwIYQhjiF0AAABYXJ1IXohcgByAG8A9wBlIWkAZwBoAHQAYQByAHIAbwD3AD4h8aFwImAhAACKIWwAYQBuAPQAZwlz4H0qOAMAoG4iaQDtAG0JcqBuImkA5aDqIkUJaQDkADoKAAFwdKMhpyFmAADgNdhf3YCBrAA7aW4AriGvIcchrEBuAIChCSJFZHYAtyG6Ib8hAOD5IjgDbwB0AADg9SI4A+EB1gjEIcYhAKD3IgCg9iJpAHagDCLhAagJzyHRIQCg/iIAoP0igAFhb3IA2CHsIfEhcgCAoSYiYXN0AOAh5SHpIWwAbABlAOwAywhsAADg/SrlIADgAiI4A2wiaW50AACgFCrjoYAi9yEAAPohdQDlAJsJY+CvKjgDZaCAIvEAkwkAAkFhaXQHIgoiFyIeInIA8gBsIHIAcgAAoZshY3cRIhQiAOAzKTgDAOCdITgDZyRodGFycm93AACgmyFyAGkA5aDrIr4JgANjaGltcHF1AC8iPCJHIpwhTSJQIloigKGBImNlcgA2Iv0JOSJ1AOUABgoA4DXYw9zvIXJ0bQKdIQAAAABEImEAcgDhAOEhbQBloEEi8aBEIiYKYQDyAMsIcwB1AAABYnBWIlgi5QDUCeUA3wmAAWJjcABgInMieCKAoYQiRWVzAGci7glqIgDgxSo4A2UAdABl4IIi0iBxAPGgiCJoImMAZaCBIvEA/gmAoYUiRWVzAH8iFgqCIgDgxio4A2UAdABl4IMi0iBxAPGgiSKAIgACZ2lscpIilCKaIpwi7AAMCWwAZABlADuA8QDxQOcAWwlpI2FuZ2xlAAABbHKkIqoi5SFmdGWg6iLxAEUJaSJnaHQAZaDrIvEAvgltoL0DAKEjAGVzuCK8InIAbwAAoBYhcAAAoAcggARESGFkZ2lscnMAziLSItYi2iLeIugi7SICIw8j4SFzaACgrSLhIXJyAKAEKXAAAOBNItIg4SFzaACgrCIAAWV04iLlIgDgZSLSIADgPgDSIG4iZmluAACg3imAAUFldADzIvci+iJyAHIAAKACKQDgZCLSIHLgPADSIGkAZQAA4LQi0iAAAUF0BiMKI3IAcgAAoAMp8iFpZQDgtSLSIGkAbQAA4Dwi0iCAAUFhbgAaIx4jKiNyAHIAAKDWIXIAAAFociMjJiNrAACgIylvoJYh9wD/DuUhYXIAoCcpUxJqFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVCMAAF4jaSN/I4IjjSOeI8AUAAAAAKYjwCMAANoj3yMAAO8jHiQvJD8kRCQAAWNzVyNsFHUAdABlADuA8wDzQAABaXlhI2cjcgBjoJoiO4D0APRAPmSAAmFiaW9zAHEjdCN3I3EBeiNzAOgAdhTsIWFjUWF2AACgOCrvIWxkAKC8KewhaWdTYQABY3KFI4kjaQByAACgvykA4DXYLN1vA5QjAAAAAJYjAACcI24A22JhAHYAZQA7gPIA8kAAoMEpAAFibaEjjAphAHIAAKC1KQACYWNpdKwjryO6I70jcgDyAFkUAAFpcrMjtiNyAACgvinvIXNzAKC7KW4A5QDZCgCgwCmAAWFlaQDFI8gjyyNjAHIATWFnAGEAyWOAAWNkbgDRI9Qj1iPyIW9uv2MAoLYpdQDzAHgBcABmAADgNdhg3YABYWVsAOQj5yPrI3IAAKC3KXIAcAAAoLkpdQDzAHwBAKMoImFkaW9zdvkj/CMPJBMkFiQbJHIA8gBeFIChXSplZm0AAyQJJAwkcgBvoDQhZgAAoDQhO4CqAKpAO4C6ALpA5yFvZgCgtiJyAACgVipsIm9wZQAAoFcqAKBbKoABY2xvACMkJSQrJPIACCRhAHMAaAA7gPgA+EBsAACgmCJpAGwBMyQ4JGQAZQA7gPUA9UBlAHMAYaCXInMAAKA2Km0AbAA7gPYA9kDiIWFyAKA9I+EKXiQAAHokAAB8JJQkAACYJKkkAAAAALUkEQsAAPAkAAAAAAQleiUAAIMlcgCAoSUiYXN0AGUkbyQBCwCBtgA7bGokayS2QGwAZQDsABgDaQJ1JAAAAAB4JG0AAKDzKgCg/Sp5AD9kcgCAAmNpbXB0AIUkiCSLJJkSjyRuAHQAJWBvAGQALmBpAGwAAKAwIOUhbmsAoDEgcgAA4DXYLd2AAWltbwCdJKAkpCR2oMYD1WNtAGEA9AD+B24AZQAAoA4m9KHAA64kAAC0JGMjaGZvcmsAAKDUItZjAAFhdbgkxCRuAAABY2u9JMIkawBooA8hAKAOIfYAaRpzAACkKwBhYmNkZW1zdNMkIRPXJNsk4STjJOck6yTjIWlyAKAjKmkAcgAAoCIqAAFvdYsW3yQAoCUqAKByKm4AO4CxALFAaQBtAACgJip3AG8AAKAnKoABaXB1APUk+iT+JO4idGludACgFSpmAADgNdhh3W4AZAA7gKMAo0CApHoiRWFjZWlub3N1ABMlFSUYJRslTCVRJVklSSV1JQCgsypwAACgtyp1AOUAPwtjoK8qgKJ6ImFjZW5zACclLSU0JTYlSSVwAHAAcgBvAPgAFyV1AHIAbAB5AGUA8QA/C/EAOAuAAWFlcwA8JUElRSXwInByb3gAoLkqcQBxAACgtSppAG0AAKDoImkA7QBEC20AZQDzoDIgIguAAUVhcwBDJVclRSXwAEAlgAFkZnAATwtfJXElgAFhbHMAZSVpJW0l7CFhcgCgLiPpIW5lAKASI/UhcmYAoBMjdKAdIu8AWQvyIWVsAKCwIgABY2l9JYElcgAA4DXYxdzIY24iY3NwAACgCCAAA2Zpb3BzdZElKxuVJZolnyWkJXIAAOA12C7dcABmAADgNdhi3XIiaW1lAACgVyBjAHIAAOA12MbcgAFhZW8AqiW6JcAldAAAAWVpryW2JXIAbgBpAG8AbgDzABkFbgB0AACgFipzAHQAZaA/APEACRj0AG0LgApBQkhhYmNkZWZoaWxtbm9wcnN0dXgA4yXyJfYl+iVpJpAmpia9JtUm5ib4JlonaCdxJ3UnnietJ7EnyCfiJ+cngAFhcnQA6SXsJe4lcgDyAJkM8gD6AuEhaWwAoBwpYQByAPIA3BVhAHIAAKBkKYADY2RlbnFydAAGJhAmEyYYJiYmKyZaJgABZXUKJg0mAOA9IjEDdABlAFVhaQDjACAN7SJwdHl2AKCzKWcAgKHpJ2RlbAAgJiImJCYAoJIpAKClKeUA9wt1AG8AO4C7ALtAcgAApZIhYWJjZmhscHN0dz0mQCZFJkcmSiZMJk4mUSZVJlgmcAAAoHUpZqDlIXMAAKAgKQCgMylzAACgHinrALka8ACVHmwAAKBFKWkAbQAAoHQpbAAAoKMhAKCdIQABYWleJmImaQBsAACgGilvAG6gNiJhAGwA8wB2C4ABYWJyAG8mciZ2JnIA8gAvEnIAawAAoHMnAAFha3omgSZjAAABZWt/JoAmfWBdYAABZXOFJocmAKCMKWwAAAFkdYwmjiYAoI4pAKCQKQACYWV1eZcmmiajJqUm8iFvbllhAAFkaZ4moSZpAGwAV2HsAA8M4gCAJkBkAAJjbHFzrSawJrUmuiZhAACgNylkImhhcgAAoGkpdQBvAPKgHSCjAWgAAKCzIYABYWNnAMMm0iaUC2wAgKEcIWlwcwDLJs4migxuAOUAoAxhAHIA9ADaC3QAAKCtJYABaWxyANsm3ybjJvMhaHQAoH0pbwBvAPIANgwA4DXYL90AAWFv6ib1JnIAAAFkde8m8SYAoMEhbKDAIQCgbCl2oMED8WOAAWducwD+Jk4nUCdoAHQAAANhaGxyc3QKJxInISc1Jz0nRydyInJvdwB0oJIhYQDpAFYmYSNycG9vbgAAAWR1GiceJ28AdwDuAPAmcAAAoMAh5SFmdAABYWgnJy0ncgByAG8AdwDzAAkMYQByAHAAbwBvAG4A8wATBGklZ2h0YXJyb3dzAACgySFxAHUAaQBnAGEAcgByAG8A9wBZJugkcmVldGltZXMAoMwiZwDaYmkAbgBnAGQAbwB0AHMAZQDxABwYgAFhaG0AYCdjJ2YncgDyAAkMYQDyABMEAKAPIG8idXN0AGGgsSPjIWhlAKCxI+0haWQAoO4qAAJhYnB0fCeGJ4knmScAAW5ygCeDJ2cAAKDtJ3IAAKD+IXIA6wAcDIABYWZsAI8nkieVJ3IAAKCGKQDgNdhj3XUAcwAAoC4qaSJtZXMAAKA1KgABYXCiJ6gncgBnoCkAdAAAoJQp7yJsaW50AKASKmEAcgDyADwnAAJhY2hxuCe8J6EMwCfxIXVvAKA6IHIAAOA12MfcAAFidYAmxCdvAPKgGSCoAYABaGlyAM4n0ifWJ3IAZQDlAE0n7SFlcwCgyiJpAIChuSVlZmwAXAxjEt4n9CFyaQCgzinsInVoYXIAoGgpAKAeIWENBSgJKA0oSyhVKIYoAACLKLAoAAAAAOMo5ygAABApJCkxKW0pcSmHKaYpAACYKgAAAACxKmMidXRlAFthcQB1AO8ABR+ApHsiRWFjZWlucHN5ABwoHignKCooLygyKEEoRihJKACgtCrwASMoAAAlKACguCpvAG4AYWF1AOUAgw1koLAqaQBsAF9hcgBjAF1hgAFFYXMAOCg6KD0oAKC2KnAAAKC6KmkAbQAAoOki7yJsaW50AKATKmkA7QCIDUFkbwB0AGKixSKRFgAAAABTKACgZiqAA0FhY21zdHgAYChkKG8ocyh1KHkogihyAHIAAKDYIXIAAAFocmkoayjrAJAab6CYIfcAzAd0ADuApwCnQGkAO2D3IWFyAKApKW0AAAFpbn4ozQBuAHUA8wDOAHQAAKA2J3IA7+A12DDdIxkAAmFjb3mRKJUonSisKHIAcAAAoG8mAAFoeZkonChjAHkASWRIZHIAdABtAqUoAAAAAKgoaQDkAFsPYQByAGEA7ABsJDuArQCtQAABZ22zKLsobQBhAAChwwNmdroouijCY4CjPCJkZWdsbnByAMgozCjPKNMo1yjaKN4obwB0AACgairxoEMiCw5FoJ4qAKCgKkWgnSoAoJ8qZQAAoEYi7CF1cwCgJCrhIXJyAKByKWEAcgDyAPwMAAJhZWl07Sj8KAEpCCkAAWxz8Sj4KGwAcwBlAHQAbQDpAH8oaABwAACgMyrwImFyc2wAoOQpAAFkbFoPBSllAACgIyNloKoqc6CsKgDgrCoA/oABZmxwABUpGCkfKfQhY3lMZGKgLwBhoMQpcgAAoD8jZgAA4DXYZN1hAAABZHIoKRcDZQBzAHWgYCZpAHQAAKBgJoABY3N1ADYpRilhKQABYXU6KUApcABzoJMiAOCTIgD+cABzoJQiAOCUIgD+dQAAAWJwSylWKQChjyJlcz4NUCllAHQAZaCPIvEAPw0AoZAiZXNIDVspZQB0AGWgkCLxAEkNAKGhJWFmZilbBHIAZQFrKVwEAKChJWEAcgDyAAMNAAJjZW10dyl7KX8pgilyAADgNdjI3HQAbQDuAM4AaQDsAAYpYQByAOYAVw0AAWFyiimOKXIA5qAGJhESAAFhbpIpoylpImdodAAAAWVwmSmgKXAAcwBpAGwAbwDuANkXaADpAKAkcwCvYIACYmNtbnAArin8KY4NJSooKgCkgiJFZGVtbnByc7wpvinCKcgpzCnUKdgp3CkAoMUqbwB0AACgvSpkoIYibwB0AACgwyr1IWx0AKDBKgABRWXQKdIpAKDLKgCgiiLsIXVzAKC/KuEhcnIAoHkpgAFlaXUA4inxKfQpdAAAoYIiZW7oKewpcQDxoIYivSllAHEA8aCKItEpbQAAoMcqAAFicPgp+ikAoNUqAKDTKmMAgKJ7ImFjZW5zAAcqDSoUKhYqRihwAHAAcgBvAPgAIyh1AHIAbAB5AGUA8QCDDfEAfA2AAWFlcwAcKiIqPShwAHAAcgBvAPgAPChxAPEAOShnAACgaiYApoMiMTIzRWRlaGxtbnBzPCo/KkIqRSpHKlIqWCpjKmcqaypzKncqO4C5ALlAO4CyALJAO4CzALNAAKDGKgABb3NLKk4qdAAAoL4qdQBiAACg2CpkoIcibwB0AACgxCpzAAABb3VdKmAqbAAAoMknYgAAoNcq4SFycgCgeyn1IWx0AKDCKgABRWVvKnEqAKDMKgCgiyLsIXVzAKDAKoABZWl1AH0qjCqPKnQAAKGDImVugyqHKnEA8aCHIkYqZQBxAPGgiyJwKm0AAKDIKgABYnCTKpUqAKDUKgCg1iqAAUFhbgCdKqEqrCpyAHIAAKDZIXIAAAFocqYqqCrrAJUab6CZIfcAxQf3IWFyAKAqKWwAaQBnADuA3wDfQOELzyrZKtwq6SrsKvEqAAD1KjQrAAAAAAAAAAAAAEwrbCsAAHErvSsAAAAAAADRK3IC1CoAAAAA2CrnIWV0AKAWI8RjcgDrAOUKgAFhZXkA4SrkKucq8iFvbmVh5CFpbGNhQmRvAPQAIg5sInJlYwAAoBUjcgAA4DXYMd0AAmVpa2/7KhIrKCsuK/IBACsAAAkrZQAAATRm6g0EK28AcgDlAOsNYQBzorgDECsAAAAAEit5AG0A0WMAAWNuFislK2sAAAFhcxsrIStwAHAAcgBvAPgAFw5pAG0AAKA8InMA8AD9DQABYXMsKyEr8AAXDnIAbgA7gP4A/kDsATgrOyswG2QA5QBnAmUAcwCAgdcAO2JkAEMrRCtJK9dAYaCgInIAAKAxKgCgMCqAAWVwcwBRK1MraSvhAAkh4qKkIlsrXysAAAAAYytvAHQAAKA2I2kAcgAAoPEqb+A12GXdcgBrAACg2irhAHgociJpbWUAAKA0IIABYWlwAHYreSu3K2QA5QC+DYADYWRlbXBzdACFK6MrmiunK6wrsCuzK24iZ2xlAACitSVkbHFykCuUK5ornCvvIXduAKC/JeUhZnRloMMl8QACBwCgXCJpImdodABloLkl8QBdDG8AdAAAoOwlaSJudXMAAKA6KuwhdXMAoDkqYgAAoM0p6SFtZQCgOyrlInppdW0AoOIjgAFjaHQAwivKK80rAAFyecYrySsA4DXYydxGZGMAeQBbZPIhb2tnYQABaW/UK9creAD0ANERaCJlYWQAAAFsct4r5ytlAGYAdABhAHIAcgBvAPcAXQbpJGdodGFycm93AKCgIQAJQUhhYmNkZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg");
var We;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.FLAG13 = 8192] = "FLAG13", e[e.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(We || (We = {}));
var Ie;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Ie || (Ie = {}));
const Jl = 32;
function pa(e) {
  return e >= Ie.ZERO && e <= Ie.NINE;
}
function cg(e) {
  return e >= Ie.UPPER_A && e <= Ie.UPPER_F || e >= Ie.LOWER_A && e <= Ie.LOWER_F;
}
function hg(e) {
  return e >= Ie.UPPER_A && e <= Ie.UPPER_Z || e >= Ie.LOWER_A && e <= Ie.LOWER_Z || pa(e);
}
function ug(e) {
  return e === Ie.EQUALS || hg(e);
}
var ke;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(ke || (ke = {}));
var ft;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ft || (ft = {}));
class Eu {
  constructor(t, i, a) {
    this.decodeTree = t, this.emitCodePoint = i, this.errors = a, this.state = ke.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ft.Strict, this.runConsumed = 0;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = ke.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, i) {
    switch (this.state) {
      case ke.EntityStart:
        return t.charCodeAt(i) === Ie.NUM ? (this.state = ke.NumericStart, this.consumed += 1, this.stateNumericStart(t, i + 1)) : (this.state = ke.NamedEntity, this.stateNamedEntity(t, i));
      case ke.NumericStart:
        return this.stateNumericStart(t, i);
      case ke.NumericDecimal:
        return this.stateNumericDecimal(t, i);
      case ke.NumericHex:
        return this.stateNumericHex(t, i);
      case ke.NamedEntity:
        return this.stateNamedEntity(t, i);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, i) {
    return i >= t.length ? -1 : (t.charCodeAt(i) | Jl) === Ie.LOWER_X ? (this.state = ke.NumericHex, this.consumed += 1, this.stateNumericHex(t, i + 1)) : (this.state = ke.NumericDecimal, this.stateNumericDecimal(t, i));
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, i) {
    for (; i < t.length; ) {
      const a = t.charCodeAt(i);
      if (pa(a) || cg(a)) {
        const l = a <= Ie.NINE ? a - Ie.ZERO : (a | Jl) - Ie.LOWER_A + 10;
        this.result = this.result * 16 + l, this.consumed++, i++;
      } else
        return this.emitNumericEntity(a, 3);
    }
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, i) {
    for (; i < t.length; ) {
      const a = t.charCodeAt(i);
      if (pa(a))
        this.result = this.result * 10 + (a - Ie.ZERO), this.consumed++, i++;
      else
        return this.emitNumericEntity(a, 2);
    }
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, i) {
    var a;
    if (this.consumed <= i)
      return (a = this.errors) === null || a === void 0 || a.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === Ie.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ft.Strict)
      return 0;
    return this.emitCodePoint(kA(this.result), this.consumed), this.errors && (t !== Ie.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, i) {
    const { decodeTree: a } = this;
    let l = a[this.treeIndex], h = (l & We.VALUE_LENGTH) >> 14;
    for (; i < t.length; ) {
      if (h === 0 && (l & We.FLAG13) !== 0) {
        const p = (l & We.BRANCH_LENGTH) >> 7;
        if (this.runConsumed === 0) {
          const u = l & We.JUMP_TABLE;
          if (t.charCodeAt(i) !== u)
            return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
          i++, this.excess++, this.runConsumed++;
        }
        for (; this.runConsumed < p; ) {
          if (i >= t.length)
            return -1;
          const u = this.runConsumed - 1, g = a[this.treeIndex + 1 + (u >> 1)], b = u % 2 === 0 ? g & 255 : g >> 8 & 255;
          if (t.charCodeAt(i) !== b)
            return this.runConsumed = 0, this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
          i++, this.excess++, this.runConsumed++;
        }
        this.runConsumed = 0, this.treeIndex += 1 + (p >> 1), l = a[this.treeIndex], h = (l & We.VALUE_LENGTH) >> 14;
      }
      if (i >= t.length)
        break;
      const c = t.charCodeAt(i);
      if (c === Ie.SEMI && h !== 0 && (l & We.FLAG13) !== 0)
        return this.emitNamedEntityData(this.treeIndex, h, this.consumed + this.excess);
      if (this.treeIndex = fg(a, l, this.treeIndex + Math.max(1, h), c), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ft.Attribute && // We shouldn't have consumed any characters after the entity,
        (h === 0 || // And there should be no invalid characters.
        ug(c)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (l = a[this.treeIndex], h = (l & We.VALUE_LENGTH) >> 14, h !== 0) {
        if (c === Ie.SEMI)
          return this.emitNamedEntityData(this.treeIndex, h, this.consumed + this.excess);
        this.decodeMode !== ft.Strict && (l & We.FLAG13) === 0 && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
      i++, this.excess++;
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: i, decodeTree: a } = this, l = (a[i] & We.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(i, l, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, i, a) {
    const { decodeTree: l } = this;
    return this.emitCodePoint(i === 1 ? l[t] & ~(We.VALUE_LENGTH | We.FLAG13) : l[t + 1], a), i === 3 && this.emitCodePoint(l[t + 2], a), a;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case ke.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ft.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case ke.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case ke.NumericHex:
        return this.emitNumericEntity(0, 3);
      case ke.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case ke.EntityStart:
        return 0;
    }
  }
}
function pg(e) {
  let t = "";
  const i = new Eu(e, (a) => t += ha(a));
  return function(l, h) {
    let c = 0, p = 0;
    for (; (p = l.indexOf("&", p)) >= 0; ) {
      t += l.slice(c, p), i.startEntity(h);
      const g = i.write(
        l,
        // Skip the "&"
        p + 1
      );
      if (g < 0) {
        c = p + i.end();
        break;
      }
      c = p + g, p = g === 0 ? c + 1 : c;
    }
    const u = t + l.slice(c);
    return t = "", u;
  };
}
function fg(e, t, i, a) {
  const l = (t & We.BRANCH_LENGTH) >> 7, h = t & We.JUMP_TABLE;
  if (l === 0)
    return h !== 0 && a === h ? i : -1;
  if (h) {
    const g = a - h;
    return g < 0 || g >= l ? -1 : e[i + g] - 1;
  }
  const c = l + 1 >> 1;
  let p = 0, u = l - 1;
  for (; p <= u; ) {
    const g = p + u >>> 1, b = g >> 1, m = e[i + b] >> (g & 1) * 8 & 255;
    if (m < a)
      p = g + 1;
    else if (m > a)
      u = g - 1;
    else
      return e[i + c + g];
  }
  return -1;
}
const dg = /* @__PURE__ */ pg(Iu);
function mg(e, t = ft.Legacy) {
  return dg(e, t);
}
const Xl = new Uint8Array([123, 123]), Zl = new Uint8Array([125, 125]);
function ql(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function st(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function Dt(e) {
  return e === 47 || e === 62 || st(e);
}
function er(e) {
  const t = new Uint8Array(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t;
}
const _e = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Ag {
  constructor(t, i) {
    this.stack = t, this.cbs = i, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = Xl, this.delimiterClose = Zl, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0, this.entityDecoder = new Eu(
      Iu,
      (a, l) => this.emitCodePoint(a, l)
    );
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Xl, this.delimiterClose = Zl;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(t) {
    let i = 1, a = t + 1;
    const l = this.newlines.length;
    let h = -1;
    if (l > 100) {
      let c = -1, p = l;
      for (; c + 1 < p; ) {
        const u = c + p >>> 1;
        this.newlines[u] < t ? c = u : p = u;
      }
      h = c;
    } else
      for (let c = l - 1; c >= 0; c--)
        if (t > this.newlines[c]) {
          h = c;
          break;
        }
    return h >= 0 && (i = h + 2, a = t - this.newlines[h]), {
      column: a,
      line: i,
      offset: t
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : t === 38 ? this.startEntity() : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const i = this.index + 1 - this.delimiterOpen.length;
        i > this.sectionStart && this.cbs.ontext(this.sectionStart, i), this.state = 3, this.sectionStart = i;
      } else
        this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    const i = this.sequenceIndex === this.currentSequence.length;
    if (!(i ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      Dt(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.inRCDATA = !1;
    else if (!i) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || st(t)) {
        const i = this.index - this.currentSequence.length;
        if (this.sectionStart < i) {
          const a = this.index;
          this.index = i, this.cbs.ontext(this.sectionStart, i), this.index = a;
        }
        this.sectionStart = i + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === _e.TitleEnd || this.currentSequence === _e.TextareaEnd && !this.inSFCRoot ? t === 38 ? this.startEntity() : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === _e.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === _e.Cdata.length && (this.state = 28, this.currentSequence = _e.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      const i = this.buffer.charCodeAt(this.index);
      if (i === 10 && this.newlines.push(this.index), i === t)
        return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === _e.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, i) {
    this.enterRCDATA(t, i), this.state = 31;
  }
  enterRCDATA(t, i) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = i;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : ql(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    Dt(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (Dt(t)) {
      const i = this.buffer.slice(this.sectionStart, this.index);
      i !== "template" && this.enterRCDATA(er("</" + i), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    st(t) || (t === 62 ? (this.cbs.onerr(14, this.index), this.state = 1, this.sectionStart = this.index + 1) : (this.state = ql(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || st(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? (this.state = 7, this.peek() !== 62 && this.cbs.onerr(22, this.index)) : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : st(t) || (t === 61 && this.cbs.onerr(
      19,
      this.index
    ), this.handleAttrStart(t));
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : st(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    t === 61 || Dt(t) ? (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : (t === 34 || t === 39 || t === 60) && this.cbs.onerr(
      17,
      this.index
    );
  }
  stateInDirName(t) {
    t === 61 || Dt(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || Dt(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || Dt(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t), this.cbs.onerr(
      27,
      this.index
    ));
  }
  stateInDirModifier(t) {
    t === 61 || Dt(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : st(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : st(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, i) {
    t === i ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(
      i === 34 ? 3 : 2,
      this.index + 1
    ), this.state = 11) : t === 38 && this.startEntity();
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    st(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? this.cbs.onerr(
      18,
      this.index
    ) : t === 38 && this.startEntity();
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = _e.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === _e.ScriptEnd[3] ? this.startSpecial(_e.ScriptEnd, 4) : t === _e.StyleEnd[3] ? this.startSpecial(_e.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === _e.TitleEnd[3] ? this.startSpecial(_e.TitleEnd, 4) : t === _e.TextareaEnd[3] ? this.startSpecial(_e.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
    this.baseState = this.state, this.state = 33, this.entityStart = this.index, this.entityDecoder.startEntity(
      this.baseState === 1 || this.baseState === 32 ? ft.Legacy : ft.Attribute
    );
  }
  stateInEntity() {
    {
      const t = this.entityDecoder.write(this.buffer, this.index);
      t >= 0 ? (this.state = this.baseState, t === 0 && (this.index = this.entityStart)) : this.index = this.buffer.length - 1;
    }
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      const i = this.buffer.charCodeAt(this.index);
      switch (i === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
        case 1: {
          this.stateText(i);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(i);
          break;
        }
        case 3: {
          this.stateInterpolation(i);
          break;
        }
        case 4: {
          this.stateInterpolationClose(i);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(i);
          break;
        }
        case 32: {
          this.stateInRCDATA(i);
          break;
        }
        case 26: {
          this.stateCDATASequence(i);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(i);
          break;
        }
        case 12: {
          this.stateInAttrName(i);
          break;
        }
        case 13: {
          this.stateInDirName(i);
          break;
        }
        case 14: {
          this.stateInDirArg(i);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(i);
          break;
        }
        case 16: {
          this.stateInDirModifier(i);
          break;
        }
        case 28: {
          this.stateInCommentLike(i);
          break;
        }
        case 27: {
          this.stateInSpecialComment(i);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(i);
          break;
        }
        case 6: {
          this.stateInTagName(i);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(i);
          break;
        }
        case 9: {
          this.stateInClosingTagName(i);
          break;
        }
        case 5: {
          this.stateBeforeTagName(i);
          break;
        }
        case 17: {
          this.stateAfterAttrName(i);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(i);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(i);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(i);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(i);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(i);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(i);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(i);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(i);
          break;
        }
        case 23: {
          this.stateInDeclaration(i);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(i);
          break;
        }
        case 25: {
          this.stateBeforeComment(i);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(i);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.state === 33 && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === _e.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, i) {
    this.baseState !== 1 && this.baseState !== 32 ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + i, this.index = this.sectionStart - 1, this.cbs.onattribentity(
      ha(t),
      this.entityStart,
      this.sectionStart
    )) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + i, this.index = this.sectionStart - 1, this.cbs.ontextentity(
      ha(t),
      this.entityStart,
      this.sectionStart
    ));
  }
}
const gg = {
  COMPILER_IS_ON_ELEMENT: "COMPILER_IS_ON_ELEMENT",
  COMPILER_V_BIND_SYNC: "COMPILER_V_BIND_SYNC",
  COMPILER_V_BIND_OBJECT_ORDER: "COMPILER_V_BIND_OBJECT_ORDER",
  COMPILER_V_ON_NATIVE: "COMPILER_V_ON_NATIVE",
  COMPILER_V_IF_V_FOR_PRECEDENCE: "COMPILER_V_IF_V_FOR_PRECEDENCE",
  COMPILER_NATIVE_TEMPLATE: "COMPILER_NATIVE_TEMPLATE",
  COMPILER_INLINE_TEMPLATE: "COMPILER_INLINE_TEMPLATE",
  COMPILER_FILTERS: "COMPILER_FILTERS"
}, yg = {
  COMPILER_IS_ON_ELEMENT: {
    message: 'Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".',
    link: "https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html"
  },
  COMPILER_V_BIND_SYNC: {
    message: (e) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${e}.sync\` should be changed to \`v-model:${e}\`.`,
    link: "https://v3-migration.vuejs.org/breaking-changes/v-model.html"
  },
  COMPILER_V_BIND_OBJECT_ORDER: {
    message: 'v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.',
    link: "https://v3-migration.vuejs.org/breaking-changes/v-bind.html"
  },
  COMPILER_V_ON_NATIVE: {
    message: ".native modifier for v-on has been removed as is no longer necessary.",
    link: "https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html"
  },
  COMPILER_V_IF_V_FOR_PRECEDENCE: {
    message: "v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.",
    link: "https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html"
  },
  COMPILER_NATIVE_TEMPLATE: {
    message: "<template> with no special directives will render as a native template element instead of its inner content in Vue 3."
  },
  COMPILER_INLINE_TEMPLATE: {
    message: '"inline-template" has been removed in Vue 3.',
    link: "https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html"
  },
  COMPILER_FILTERS: {
    message: 'filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.',
    link: "https://v3-migration.vuejs.org/breaking-changes/filters.html"
  }
};
function fa(e, { compatConfig: t }) {
  const i = t && t[e];
  return e === "MODE" ? i || 3 : i;
}
function Sg(e, t) {
  const i = fa("MODE", t), a = fa(e, t);
  return i === 3 ? a === !0 : a !== !1;
}
function xg(e, t, i, ...a) {
  const l = Sg(e, t);
  return l && bu(e, t, i, ...a), l;
}
function bu(e, t, i, ...a) {
  if (fa(e, t) === "suppress-warning")
    return;
  const { message: h, link: c } = yg[e], p = `(deprecation ${e}) ${typeof h == "function" ? h(...a) : h}${c ? `
  Details: ${c}` : ""}`, u = new SyntaxError(p);
  u.code = e, i && (u.loc = i), t.onWarn(u);
}
function Fa(e) {
  throw e;
}
function wu(e) {
  console.warn(`[Vue warn] ${e.message}`);
}
function he(e, t, i, a) {
  const l = (i || Ua)[e] + (a || ""), h = new SyntaxError(String(l));
  return h.code = e, h.loc = t, h;
}
const Ig = {
  ABRUPT_CLOSING_OF_EMPTY_COMMENT: 0,
  0: "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
  CDATA_IN_HTML_CONTENT: 1,
  1: "CDATA_IN_HTML_CONTENT",
  DUPLICATE_ATTRIBUTE: 2,
  2: "DUPLICATE_ATTRIBUTE",
  END_TAG_WITH_ATTRIBUTES: 3,
  3: "END_TAG_WITH_ATTRIBUTES",
  END_TAG_WITH_TRAILING_SOLIDUS: 4,
  4: "END_TAG_WITH_TRAILING_SOLIDUS",
  EOF_BEFORE_TAG_NAME: 5,
  5: "EOF_BEFORE_TAG_NAME",
  EOF_IN_CDATA: 6,
  6: "EOF_IN_CDATA",
  EOF_IN_COMMENT: 7,
  7: "EOF_IN_COMMENT",
  EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT: 8,
  8: "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
  EOF_IN_TAG: 9,
  9: "EOF_IN_TAG",
  INCORRECTLY_CLOSED_COMMENT: 10,
  10: "INCORRECTLY_CLOSED_COMMENT",
  INCORRECTLY_OPENED_COMMENT: 11,
  11: "INCORRECTLY_OPENED_COMMENT",
  INVALID_FIRST_CHARACTER_OF_TAG_NAME: 12,
  12: "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
  MISSING_ATTRIBUTE_VALUE: 13,
  13: "MISSING_ATTRIBUTE_VALUE",
  MISSING_END_TAG_NAME: 14,
  14: "MISSING_END_TAG_NAME",
  MISSING_WHITESPACE_BETWEEN_ATTRIBUTES: 15,
  15: "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
  NESTED_COMMENT: 16,
  16: "NESTED_COMMENT",
  UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME: 17,
  17: "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
  UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE: 18,
  18: "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
  UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME: 19,
  19: "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
  UNEXPECTED_NULL_CHARACTER: 20,
  20: "UNEXPECTED_NULL_CHARACTER",
  UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME: 21,
  21: "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
  UNEXPECTED_SOLIDUS_IN_TAG: 22,
  22: "UNEXPECTED_SOLIDUS_IN_TAG",
  X_INVALID_END_TAG: 23,
  23: "X_INVALID_END_TAG",
  X_MISSING_END_TAG: 24,
  24: "X_MISSING_END_TAG",
  X_MISSING_INTERPOLATION_END: 25,
  25: "X_MISSING_INTERPOLATION_END",
  X_MISSING_DIRECTIVE_NAME: 26,
  26: "X_MISSING_DIRECTIVE_NAME",
  X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END: 27,
  27: "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
  X_V_IF_NO_EXPRESSION: 28,
  28: "X_V_IF_NO_EXPRESSION",
  X_V_IF_SAME_KEY: 29,
  29: "X_V_IF_SAME_KEY",
  X_V_ELSE_NO_ADJACENT_IF: 30,
  30: "X_V_ELSE_NO_ADJACENT_IF",
  X_V_FOR_NO_EXPRESSION: 31,
  31: "X_V_FOR_NO_EXPRESSION",
  X_V_FOR_MALFORMED_EXPRESSION: 32,
  32: "X_V_FOR_MALFORMED_EXPRESSION",
  X_V_FOR_TEMPLATE_KEY_PLACEMENT: 33,
  33: "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
  X_V_BIND_NO_EXPRESSION: 34,
  34: "X_V_BIND_NO_EXPRESSION",
  X_V_ON_NO_EXPRESSION: 35,
  35: "X_V_ON_NO_EXPRESSION",
  X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET: 36,
  36: "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
  X_V_SLOT_MIXED_SLOT_USAGE: 37,
  37: "X_V_SLOT_MIXED_SLOT_USAGE",
  X_V_SLOT_DUPLICATE_SLOT_NAMES: 38,
  38: "X_V_SLOT_DUPLICATE_SLOT_NAMES",
  X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN: 39,
  39: "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
  X_V_SLOT_MISPLACED: 40,
  40: "X_V_SLOT_MISPLACED",
  X_V_MODEL_NO_EXPRESSION: 41,
  41: "X_V_MODEL_NO_EXPRESSION",
  X_V_MODEL_MALFORMED_EXPRESSION: 42,
  42: "X_V_MODEL_MALFORMED_EXPRESSION",
  X_V_MODEL_ON_SCOPE_VARIABLE: 43,
  43: "X_V_MODEL_ON_SCOPE_VARIABLE",
  X_V_MODEL_ON_PROPS: 44,
  44: "X_V_MODEL_ON_PROPS",
  X_V_MODEL_ON_CONST: 45,
  45: "X_V_MODEL_ON_CONST",
  X_INVALID_EXPRESSION: 46,
  46: "X_INVALID_EXPRESSION",
  X_KEEP_ALIVE_INVALID_CHILDREN: 47,
  47: "X_KEEP_ALIVE_INVALID_CHILDREN",
  X_PREFIX_ID_NOT_SUPPORTED: 48,
  48: "X_PREFIX_ID_NOT_SUPPORTED",
  X_MODULE_MODE_NOT_SUPPORTED: 49,
  49: "X_MODULE_MODE_NOT_SUPPORTED",
  X_CACHE_HANDLER_NOT_SUPPORTED: 50,
  50: "X_CACHE_HANDLER_NOT_SUPPORTED",
  X_SCOPE_ID_NOT_SUPPORTED: 51,
  51: "X_SCOPE_ID_NOT_SUPPORTED",
  X_VNODE_HOOKS: 52,
  52: "X_VNODE_HOOKS",
  X_V_BIND_INVALID_SAME_NAME_ARGUMENT: 53,
  53: "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
  __EXTEND_POINT__: 54,
  54: "__EXTEND_POINT__"
}, Ua = {
  // parse errors
  0: "Illegal comment.",
  1: "CDATA section is allowed only in XML context.",
  2: "Duplicate attribute.",
  3: "End tag cannot have attributes.",
  4: "Illegal '/' in tags.",
  5: "Unexpected EOF in tag.",
  6: "Unexpected EOF in CDATA section.",
  7: "Unexpected EOF in comment.",
  8: "Unexpected EOF in script.",
  9: "Unexpected EOF in tag.",
  10: "Incorrectly closed comment.",
  11: "Incorrectly opened comment.",
  12: "Illegal tag name. Use '&lt;' to print '<'.",
  13: "Attribute value was expected.",
  14: "End tag name was expected.",
  15: "Whitespace was expected.",
  16: "Unexpected '<!--' in comment.",
  17: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
  18: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
  19: "Attribute name cannot start with '='.",
  21: "'<?' is allowed only in XML context.",
  20: "Unexpected null character.",
  22: "Illegal '/' in tags.",
  // Vue-specific parse errors
  23: "Invalid end tag.",
  24: "Element is missing end tag.",
  25: "Interpolation end sign was not found.",
  27: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
  26: "Legal directive name was expected.",
  // transform errors
  28: "v-if/v-else-if is missing expression.",
  29: "v-if/else branches must use unique keys.",
  30: "v-else/v-else-if has no adjacent v-if or v-else-if.",
  31: "v-for is missing expression.",
  32: "v-for has invalid expression.",
  33: "<template v-for> key should be placed on the <template> tag.",
  34: "v-bind is missing expression.",
  53: "v-bind with same-name shorthand only allows static argument.",
  35: "v-on is missing expression.",
  36: "Unexpected custom directive on <slot> outlet.",
  37: "Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.",
  38: "Duplicate slot names found. ",
  39: "Extraneous children found when component already has explicitly named default slot. These children will be ignored.",
  40: "v-slot can only be used on components or <template> tags.",
  41: "v-model is missing expression.",
  42: "v-model value must be a valid JavaScript member expression.",
  43: "v-model cannot be used on v-for or v-slot scope variables because they are not writable.",
  44: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
  45: "v-model cannot be used on a const binding because it is not writable.",
  46: "Error parsing JavaScript expression: ",
  47: "<KeepAlive> expects exactly one child component.",
  52: "@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.",
  // generic errors
  48: '"prefixIdentifiers" option is not supported in this build of compiler.',
  49: "ES module mode is not supported in this build of compiler.",
  50: '"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.',
  51: '"scopeId" option is only supported in module mode.',
  // just to fulfill types
  54: ""
};
function Eg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Va(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var i = function a() {
      var l = !1;
      try {
        l = this instanceof a;
      } catch {
      }
      return l ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    i.prototype = t.prototype;
  } else i = {};
  return Object.defineProperty(i, "__esModule", { value: !0 }), Object.keys(e).forEach(function(a) {
    var l = Object.getOwnPropertyDescriptor(e, a);
    Object.defineProperty(i, a, l.get ? l : {
      enumerable: !0,
      get: function() {
        return e[a];
      }
    });
  }), i;
}
var ms = {}, zl;
function bg() {
  if (zl) return ms;
  zl = 1, Object.defineProperty(ms, "__esModule", {
    value: !0
  });
  function e(x, r) {
    if (x == null) return {};
    var s = {};
    for (var n in x) if ({}.hasOwnProperty.call(x, n)) {
      if (r.indexOf(n) !== -1) continue;
      s[n] = x[n];
    }
    return s;
  }
  class t {
    constructor(r, s, n) {
      this.line = void 0, this.column = void 0, this.index = void 0, this.line = r, this.column = s, this.index = n;
    }
  }
  class i {
    constructor(r, s) {
      this.start = void 0, this.end = void 0, this.filename = void 0, this.identifierName = void 0, this.start = r, this.end = s;
    }
  }
  function a(x, r) {
    const {
      line: s,
      column: n,
      index: o
    } = x;
    return new t(s, n + r, o + r);
  }
  const l = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";
  var h = {
    ImportMetaOutsideModule: {
      message: `import.meta may appear only with 'sourceType: "module"'`,
      code: l
    },
    ImportOutsideModule: {
      message: `'import' and 'export' may appear only with 'sourceType: "module"'`,
      code: l
    }
  };
  const c = {
    ArrayPattern: "array destructuring pattern",
    AssignmentExpression: "assignment expression",
    AssignmentPattern: "assignment expression",
    ArrowFunctionExpression: "arrow function expression",
    ConditionalExpression: "conditional expression",
    CatchClause: "catch clause",
    ForOfStatement: "for-of statement",
    ForInStatement: "for-in statement",
    ForStatement: "for-loop",
    FormalParameters: "function parameter list",
    Identifier: "identifier",
    ImportSpecifier: "import specifier",
    ImportDefaultSpecifier: "import default specifier",
    ImportNamespaceSpecifier: "import namespace specifier",
    ObjectPattern: "object destructuring pattern",
    ParenthesizedExpression: "parenthesized expression",
    RestElement: "rest element",
    UpdateExpression: {
      true: "prefix operation",
      false: "postfix operation"
    },
    VariableDeclarator: "variable declaration",
    YieldExpression: "yield expression"
  }, p = (x) => x.type === "UpdateExpression" ? c.UpdateExpression[`${x.prefix}`] : c[x.type];
  var u = {
    AccessorIsGenerator: ({
      kind: x
    }) => `A ${x}ter cannot be a generator.`,
    ArgumentsInClass: "'arguments' is only allowed in functions and class methods.",
    AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.",
    AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.",
    AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.",
    AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.",
    AwaitUsingNotInAsyncContext: "'await using' is only allowed within async functions and at the top levels of modules.",
    AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.",
    BadGetterArity: "A 'get' accessor must not have any formal parameters.",
    BadSetterArity: "A 'set' accessor must have exactly one formal parameter.",
    BadSetterRestParameter: "A 'set' accessor function argument must not be a rest parameter.",
    ConstructorClassField: "Classes may not have a field named 'constructor'.",
    ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.",
    ConstructorIsAccessor: "Class constructor may not be an accessor.",
    ConstructorIsAsync: "Constructor can't be an async function.",
    ConstructorIsGenerator: "Constructor can't be a generator.",
    DeclarationMissingInitializer: ({
      kind: x
    }) => `Missing initializer in ${x} declaration.`,
    DecoratorArgumentsOutsideParentheses: "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
    DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.",
    DecoratorsBeforeAfterExport: "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
    DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
    DecoratorExportClass: "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.",
    DecoratorSemicolon: "Decorators must not be followed by a semicolon.",
    DecoratorStaticBlock: "Decorators can't be used with a static block.",
    DeferImportRequiresNamespace: 'Only `import defer * as x from "./module"` is valid.',
    DeletePrivateField: "Deleting a private field is not allowed.",
    DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
    DuplicateConstructor: "Duplicate constructor in the same class.",
    DuplicateDefaultExport: "Only one default export allowed per module.",
    DuplicateExport: ({
      exportName: x
    }) => `\`${x}\` has already been exported. Exported identifiers must be unique.`,
    DuplicateProto: "Redefinition of __proto__ property.",
    DuplicateRegExpFlags: "Duplicate regular expression flag.",
    ElementAfterRest: "Rest element must be last element.",
    EscapedCharNotAnIdentifier: "Invalid Unicode escape.",
    ExportBindingIsString: ({
      localName: x,
      exportName: r
    }) => `A string literal cannot be used as an exported binding without \`from\`.
- Did you mean \`export { '${x}' as '${r}' } from 'some-module'\`?`,
    ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.",
    ForInOfLoopInitializer: ({
      type: x
    }) => `'${x === "ForInStatement" ? "for-in" : "for-of"}' loop variable declaration may not have an initializer.`,
    ForInUsing: "For-in loop may not start with 'using' declaration.",
    ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
    ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
    GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block.",
    IllegalBreakContinue: ({
      type: x
    }) => `Unsyntactic ${x === "BreakStatement" ? "break" : "continue"}.`,
    IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.",
    IllegalReturn: "'return' outside of function.",
    ImportAttributesUseAssert: "The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedImportAssert` parser plugin to suppress this error.",
    ImportBindingIsString: ({
      importName: x
    }) => `A string literal cannot be used as an imported binding.
- Did you mean \`import { "${x}" as foo }\`?`,
    ImportCallArity: "`import()` requires exactly one or two arguments.",
    ImportCallNotNewExpression: "Cannot use new with import(...).",
    ImportCallSpreadArgument: "`...` is not allowed in `import()`.",
    ImportJSONBindingNotDefault: "A JSON module can only be imported with `default`.",
    ImportReflectionHasAssertion: "`import module x` cannot have assertions.",
    ImportReflectionNotBinding: 'Only `import module x from "./module"` is valid.',
    IncompatibleRegExpUVFlags: "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
    InvalidBigIntLiteral: "Invalid BigIntLiteral.",
    InvalidCodePoint: "Code point out of bounds.",
    InvalidCoverDiscardElement: "'void' must be followed by an expression when not used in a binding position.",
    InvalidCoverInitializedName: "Invalid shorthand property initializer.",
    InvalidDecimal: "Invalid decimal.",
    InvalidDigit: ({
      radix: x
    }) => `Expected number in radix ${x}.`,
    InvalidEscapeSequence: "Bad character escape sequence.",
    InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.",
    InvalidEscapedReservedWord: ({
      reservedWord: x
    }) => `Escape sequence in keyword ${x}.`,
    InvalidIdentifier: ({
      identifierName: x
    }) => `Invalid identifier ${x}.`,
    InvalidLhs: ({
      ancestor: x
    }) => `Invalid left-hand side in ${p(x)}.`,
    InvalidLhsBinding: ({
      ancestor: x
    }) => `Binding invalid left-hand side in ${p(x)}.`,
    InvalidLhsOptionalChaining: ({
      ancestor: x
    }) => `Invalid optional chaining in the left-hand side of ${p(x)}.`,
    InvalidNumber: "Invalid number.",
    InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.",
    InvalidOrUnexpectedToken: ({
      unexpected: x
    }) => `Unexpected character '${x}'.`,
    InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.",
    InvalidPrivateFieldResolution: ({
      identifierName: x
    }) => `Private name #${x} is not defined.`,
    InvalidPropertyBindingPattern: "Binding member expression.",
    InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions.",
    InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
    LabelRedeclaration: ({
      labelName: x
    }) => `Label '${x}' is already declared.`,
    LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
    LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
    MalformedRegExpFlags: "Invalid regular expression flag.",
    MissingClassName: "A class name is required.",
    MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
    MissingSemicolon: "Missing semicolon.",
    MissingPlugin: ({
      missingPlugin: x
    }) => `This experimental syntax requires enabling the parser plugin: ${x.map((r) => JSON.stringify(r)).join(", ")}.`,
    MissingOneOfPlugins: ({
      missingPlugin: x
    }) => `This experimental syntax requires enabling one of the following parser plugin(s): ${x.map((r) => JSON.stringify(r)).join(", ")}.`,
    MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.",
    MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators.",
    ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`.",
    ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values.",
    ModuleAttributesWithDuplicateKeys: ({
      key: x
    }) => `Duplicate key "${x}" is not allowed in module attributes.`,
    ModuleExportNameHasLoneSurrogate: ({
      surrogateCharCode: x
    }) => `An export name cannot include a lone surrogate, found '\\u${x.toString(16)}'.`,
    ModuleExportUndefined: ({
      localName: x
    }) => `Export '${x}' is not defined.`,
    MultipleDefaultsInSwitch: "Multiple default clauses.",
    NewlineAfterThrow: "Illegal newline after throw.",
    NoCatchOrFinally: "Missing catch or finally clause.",
    NumberIdentifier: "Identifier directly after number.",
    NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.",
    ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
    OptionalChainingNoNew: "Constructors in/after an Optional Chain are not allowed.",
    OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain.",
    OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.",
    ParamDupe: "Argument name clash.",
    PatternHasAccessor: "Object pattern can't contain getter or setter.",
    PatternHasMethod: "Object pattern can't contain methods.",
    PrivateInExpectedIn: ({
      identifierName: x
    }) => `Private names are only allowed in property accesses (\`obj.#${x}\`) or in \`in\` expressions (\`#${x} in obj\`).`,
    PrivateNameRedeclaration: ({
      identifierName: x
    }) => `Duplicate private name #${x}.`,
    RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
    RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
    RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
    RecordNoProto: "'__proto__' is not allowed in Record expressions.",
    RestTrailingComma: "Unexpected trailing comma after rest element.",
    SloppyFunction: "In non-strict mode code, functions can only be declared at top level or inside a block.",
    SloppyFunctionAnnexB: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.",
    SourcePhaseImportRequiresDefault: 'Only `import source x from "./module"` is valid.',
    StaticPrototype: "Classes may not have static property named prototype.",
    SuperCallNotNewExpression: "Cannot use new with super(...).",
    SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
    SuperPrivateField: "Private fields can't be accessed on super.",
    TrailingDecorator: "Decorators must be attached to a class element.",
    TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
    TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
    TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
    UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
    UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
    UnexpectedDigitAfterHash: "Unexpected digit after hash token.",
    UnexpectedImportExport: "'import' and 'export' may only appear at the top level.",
    UnexpectedKeyword: ({
      keyword: x
    }) => `Unexpected keyword '${x}'.`,
    UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
    UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context.",
    UnexpectedNewTarget: "`new.target` can only be used in functions or class properties.",
    UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits.",
    UnexpectedPrivateField: "Unexpected private name.",
    UnexpectedReservedWord: ({
      reservedWord: x
    }) => `Unexpected reserved word '${x}'.`,
    UnexpectedSuper: "'super' is only allowed in object methods and classes.",
    UnexpectedToken: ({
      expected: x,
      unexpected: r
    }) => `Unexpected token${r ? ` '${r}'.` : ""}${x ? `, expected "${x}"` : ""}`,
    UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
    UnexpectedUsingDeclaration: "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement.",
    UnexpectedVoidPattern: "Unexpected void binding.",
    UnsupportedDecoratorExport: "A decorated export must export a class declaration.",
    UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
    UnsupportedImport: "`import` can only be used in `import()` or `import.meta`.",
    UnsupportedMetaProperty: ({
      target: x,
      onlyValidPropertyName: r
    }) => `The only valid meta property for ${x} is ${x}.${r}.`,
    UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters.",
    UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties.",
    UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
    UnterminatedComment: "Unterminated comment.",
    UnterminatedRegExp: "Unterminated regular expression.",
    UnterminatedString: "Unterminated string constant.",
    UnterminatedTemplate: "Unterminated template.",
    UsingDeclarationExport: "Using declaration cannot be exported.",
    UsingDeclarationHasBindingPattern: "Using declaration cannot have destructuring patterns.",
    VarRedeclaration: ({
      identifierName: x
    }) => `Identifier '${x}' has already been declared.`,
    VoidPatternCatchClauseParam: "A void binding can not be the catch clause parameter. Use `try { ... } catch { ... }` if you want to discard the caught error.",
    VoidPatternInitializer: "A void binding may not have an initializer.",
    YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.",
    YieldInParameter: "Yield expression is not allowed in formal parameters.",
    YieldNotInGeneratorFunction: "'yield' is only allowed within generator functions.",
    ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0."
  }, g = {
    StrictDelete: "Deleting local variable in strict mode.",
    StrictEvalArguments: ({
      referenceName: x
    }) => `Assigning to '${x}' in strict mode.`,
    StrictEvalArgumentsBinding: ({
      bindingName: x
    }) => `Binding '${x}' in strict mode.`,
    StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block.",
    StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",
    StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.",
    StrictWith: "'with' in strict mode."
  }, b = {
    ParseExpressionEmptyInput: "Unexpected parseExpression() input: The input is empty or contains only comments.",
    ParseExpressionExpectsEOF: ({
      unexpected: x
    }) => `Unexpected parseExpression() input: The input should contain exactly one expression, but the first expression is followed by the unexpected character \`${String.fromCodePoint(x)}\`.`
  };
  const A = /* @__PURE__ */ new Set(["ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression"]);
  var m = Object.assign({
    PipeBodyIsTighter: "Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.",
    PipeTopicRequiresHackPipes: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.',
    PipeTopicUnbound: "Topic reference is unbound; it must be inside a pipe body.",
    PipeTopicUnconfiguredToken: ({
      token: x
    }) => `Invalid topic token ${x}. In order to use ${x} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${x}" }.`,
    PipeTopicUnused: "Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.",
    PipeUnparenthesizedBody: ({
      type: x
    }) => `Hack-style pipe body cannot be an unparenthesized ${p({
      type: x
    })}; please wrap it in parentheses.`
  }, {
    PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.',
    PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression.",
    PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression.",
    PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference.",
    PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding.",
    PrimaryTopicRequiresSmartPipeline: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.'
  }), d = {
    UnsupportedBind: "Binding should be performed on object property.",
    UnsupportedBindRHS: "The right-hand side of binding can not be super or import."
  };
  const y = ["message"];
  function I(x, r, s) {
    Object.defineProperty(x, r, {
      enumerable: !1,
      configurable: !0,
      value: s
    });
  }
  function w({
    toMessage: x,
    code: r,
    reasonCode: s,
    syntaxPlugin: n
  }) {
    const o = s === "MissingPlugin" || s === "MissingOneOfPlugins", f = {
      AccessorCannotDeclareThisParameter: "AccesorCannotDeclareThisParameter",
      AccessorCannotHaveTypeParameters: "AccesorCannotHaveTypeParameters",
      ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference",
      SetAccessorCannotHaveOptionalParameter: "SetAccesorCannotHaveOptionalParameter",
      SetAccessorCannotHaveRestParameter: "SetAccesorCannotHaveRestParameter",
      SetAccessorCannotHaveReturnType: "SetAccesorCannotHaveReturnType"
    };
    return f[s] && (s = f[s]), function E(C, T) {
      const N = new SyntaxError();
      return N.code = r, N.reasonCode = s, N.loc = C, N.pos = C.index, N.syntaxPlugin = n, o && (N.missingPlugin = T.missingPlugin), I(N, "clone", function(V = {}) {
        var j;
        const {
          line: W,
          column: H,
          index: re
        } = (j = V.loc) != null ? j : C;
        return E(new t(W, H, re), Object.assign({}, T, V.details));
      }), I(N, "details", T), Object.defineProperty(N, "message", {
        configurable: !0,
        get() {
          const D = `${x(T)} (${C.line}:${C.column})`;
          return this.message = D, D;
        },
        set(D) {
          Object.defineProperty(this, "message", {
            value: D,
            writable: !0
          });
        }
      }), N;
    };
  }
  function v(x, r) {
    if (Array.isArray(x))
      return (n) => v(n, x[0]);
    const s = {};
    for (const n of Object.keys(x)) {
      const o = x[n], f = typeof o == "string" ? {
        message: () => o
      } : typeof o == "function" ? {
        message: o
      } : o, {
        message: E
      } = f, C = e(f, y), T = typeof E == "string" ? () => E : E;
      s[n] = w(Object.assign({
        code: "BABEL_PARSER_SYNTAX_ERROR",
        reasonCode: n,
        toMessage: T
      }, r ? {
        syntaxPlugin: r
      } : {}, C));
    }
    return s;
  }
  const S = Object.assign({}, v(h), v(u), v(g), v(b), v`pipelineOperator`(m), v`functionBind`(d));
  function P() {
    return {
      sourceType: "script",
      sourceFilename: void 0,
      startIndex: 0,
      startColumn: 0,
      startLine: 1,
      allowAwaitOutsideFunction: !1,
      allowReturnOutsideFunction: !1,
      allowNewTargetOutsideFunction: !1,
      allowImportExportEverywhere: !1,
      allowSuperOutsideMethod: !1,
      allowUndeclaredExports: !1,
      allowYieldOutsideFunction: !1,
      plugins: [],
      strictMode: void 0,
      ranges: !1,
      tokens: !1,
      createImportExpressions: !1,
      createParenthesizedExpressions: !1,
      errorRecovery: !1,
      attachComment: !0,
      annexB: !0
    };
  }
  function M(x) {
    const r = P();
    if (x == null)
      return r;
    if (x.annexB != null && x.annexB !== !1)
      throw new Error("The `annexB` option can only be set to `false`.");
    for (const s of Object.keys(r))
      x[s] != null && (r[s] = x[s]);
    if (r.startLine === 1)
      x.startIndex == null && r.startColumn > 0 ? r.startIndex = r.startColumn : x.startColumn == null && r.startIndex > 0 && (r.startColumn = r.startIndex);
    else if ((x.startColumn == null || x.startIndex == null) && x.startIndex != null)
      throw new Error("With a `startLine > 1` you must also specify `startIndex` and `startColumn`.");
    if (r.sourceType === "commonjs") {
      if (x.allowAwaitOutsideFunction != null)
        throw new Error("The `allowAwaitOutsideFunction` option cannot be used with `sourceType: 'commonjs'`.");
      if (x.allowReturnOutsideFunction != null)
        throw new Error("`sourceType: 'commonjs'` implies `allowReturnOutsideFunction: true`, please remove the `allowReturnOutsideFunction` option or use `sourceType: 'script'`.");
      if (x.allowNewTargetOutsideFunction != null)
        throw new Error("`sourceType: 'commonjs'` implies `allowNewTargetOutsideFunction: true`, please remove the `allowNewTargetOutsideFunction` option or use `sourceType: 'script'`.");
    }
    return r;
  }
  const {
    defineProperty: R
  } = Object, L = (x, r) => {
    x && R(x, r, {
      enumerable: !1,
      value: x[r]
    });
  };
  function F(x) {
    return L(x.loc.start, "index"), L(x.loc.end, "index"), x;
  }
  var k = (x) => class extends x {
    parse() {
      const s = F(super.parse());
      return this.optionFlags & 256 && (s.tokens = s.tokens.map(F)), s;
    }
    parseRegExpLiteral({
      pattern: s,
      flags: n
    }) {
      let o = null;
      try {
        o = new RegExp(s, n);
      } catch {
      }
      const f = this.estreeParseLiteral(o);
      return f.regex = {
        pattern: s,
        flags: n
      }, f;
    }
    parseBigIntLiteral(s) {
      let n;
      try {
        n = BigInt(s);
      } catch {
        n = null;
      }
      const o = this.estreeParseLiteral(n);
      return o.bigint = String(o.value || s), o;
    }
    parseDecimalLiteral(s) {
      const o = this.estreeParseLiteral(null);
      return o.decimal = String(o.value || s), o;
    }
    estreeParseLiteral(s) {
      return this.parseLiteral(s, "Literal");
    }
    parseStringLiteral(s) {
      return this.estreeParseLiteral(s);
    }
    parseNumericLiteral(s) {
      return this.estreeParseLiteral(s);
    }
    parseNullLiteral() {
      return this.estreeParseLiteral(null);
    }
    parseBooleanLiteral(s) {
      return this.estreeParseLiteral(s);
    }
    estreeParseChainExpression(s, n) {
      const o = this.startNodeAtNode(s);
      return o.expression = s, this.finishNodeAt(o, "ChainExpression", n);
    }
    directiveToStmt(s) {
      const n = s.value;
      delete s.value, this.castNodeTo(n, "Literal"), n.raw = n.extra.raw, n.value = n.extra.expressionValue;
      const o = this.castNodeTo(s, "ExpressionStatement");
      return o.expression = n, o.directive = n.extra.rawValue, delete n.extra, o;
    }
    fillOptionalPropertiesForTSESLint(s) {
    }
    cloneEstreeStringLiteral(s) {
      const {
        start: n,
        end: o,
        loc: f,
        range: E,
        raw: C,
        value: T
      } = s, N = Object.create(s.constructor.prototype);
      return N.type = "Literal", N.start = n, N.end = o, N.loc = f, N.range = E, N.raw = C, N.value = T, N;
    }
    initFunction(s, n) {
      super.initFunction(s, n), s.expression = !1;
    }
    checkDeclaration(s) {
      s != null && this.isObjectProperty(s) ? this.checkDeclaration(s.value) : super.checkDeclaration(s);
    }
    getObjectOrClassMethodParams(s) {
      return s.value.params;
    }
    isValidDirective(s) {
      var n;
      return s.type === "ExpressionStatement" && s.expression.type === "Literal" && typeof s.expression.value == "string" && !((n = s.expression.extra) != null && n.parenthesized);
    }
    parseBlockBody(s, n, o, f, E) {
      super.parseBlockBody(s, n, o, f, E);
      const C = s.directives.map((T) => this.directiveToStmt(T));
      s.body = C.concat(s.body), delete s.directives;
    }
    parsePrivateName() {
      const s = super.parsePrivateName();
      return this.getPluginOption("estree", "classFeatures") ? this.convertPrivateNameToPrivateIdentifier(s) : s;
    }
    convertPrivateNameToPrivateIdentifier(s) {
      const n = super.getPrivateNameSV(s);
      return delete s.id, s.name = n, this.castNodeTo(s, "PrivateIdentifier");
    }
    isPrivateName(s) {
      return this.getPluginOption("estree", "classFeatures") ? s.type === "PrivateIdentifier" : super.isPrivateName(s);
    }
    getPrivateNameSV(s) {
      return this.getPluginOption("estree", "classFeatures") ? s.name : super.getPrivateNameSV(s);
    }
    parseLiteral(s, n) {
      const o = super.parseLiteral(s, n);
      return o.raw = o.extra.raw, delete o.extra, o;
    }
    parseFunctionBody(s, n, o = !1) {
      super.parseFunctionBody(s, n, o), s.expression = s.body.type !== "BlockStatement";
    }
    parseMethod(s, n, o, f, E, C, T = !1) {
      let N = this.startNode();
      N.kind = s.kind, N = super.parseMethod(N, n, o, f, E, C, T), delete N.kind;
      const {
        typeParameters: D
      } = s;
      D && (delete s.typeParameters, N.typeParameters = D, this.resetStartLocationFromNode(N, D));
      const V = this.castNodeTo(N, "FunctionExpression");
      return s.value = V, C === "ClassPrivateMethod" && (s.computed = !1), C === "ObjectMethod" ? (s.kind === "method" && (s.kind = "init"), s.shorthand = !1, this.finishNode(s, "Property")) : this.finishNode(s, "MethodDefinition");
    }
    nameIsConstructor(s) {
      return s.type === "Literal" ? s.value === "constructor" : super.nameIsConstructor(s);
    }
    parseClassProperty(...s) {
      const n = super.parseClassProperty(...s);
      return this.getPluginOption("estree", "classFeatures") && this.castNodeTo(n, "PropertyDefinition"), n;
    }
    parseClassPrivateProperty(...s) {
      const n = super.parseClassPrivateProperty(...s);
      return this.getPluginOption("estree", "classFeatures") && (this.castNodeTo(n, "PropertyDefinition"), n.computed = !1), n;
    }
    parseClassAccessorProperty(s) {
      const n = super.parseClassAccessorProperty(s);
      return this.getPluginOption("estree", "classFeatures") && (n.abstract && this.hasPlugin("typescript") ? (delete n.abstract, this.castNodeTo(n, "TSAbstractAccessorProperty")) : this.castNodeTo(n, "AccessorProperty")), n;
    }
    parseObjectProperty(s, n, o, f) {
      const E = super.parseObjectProperty(s, n, o, f);
      return E && (E.kind = "init", this.castNodeTo(E, "Property")), E;
    }
    finishObjectProperty(s) {
      return s.kind = "init", this.finishNode(s, "Property");
    }
    isValidLVal(s, n, o, f) {
      return s === "Property" ? "value" : super.isValidLVal(s, n, o, f);
    }
    isAssignable(s, n) {
      return s != null && this.isObjectProperty(s) ? this.isAssignable(s.value, n) : super.isAssignable(s, n);
    }
    toAssignable(s, n = !1) {
      if (s != null && this.isObjectProperty(s)) {
        const {
          key: o,
          value: f
        } = s;
        this.isPrivateName(o) && this.classScope.usePrivateName(this.getPrivateNameSV(o), o.loc.start), this.toAssignable(f, n);
      } else
        super.toAssignable(s, n);
    }
    toAssignableObjectExpressionProp(s, n, o) {
      s.type === "Property" && (s.kind === "get" || s.kind === "set") ? this.raise(S.PatternHasAccessor, s.key) : s.type === "Property" && s.method ? this.raise(S.PatternHasMethod, s.key) : super.toAssignableObjectExpressionProp(s, n, o);
    }
    finishCallExpression(s, n) {
      const o = super.finishCallExpression(s, n);
      if (o.callee.type === "Import") {
        var f, E;
        this.castNodeTo(o, "ImportExpression"), o.source = o.arguments[0], o.options = (f = o.arguments[1]) != null ? f : null, o.attributes = (E = o.arguments[1]) != null ? E : null, delete o.arguments, delete o.callee;
      } else o.type === "OptionalCallExpression" ? this.castNodeTo(o, "CallExpression") : o.optional = !1;
      return o;
    }
    toReferencedArguments(s) {
      s.type !== "ImportExpression" && super.toReferencedArguments(s);
    }
    parseExport(s, n) {
      const o = this.state.lastTokStartLoc, f = super.parseExport(s, n);
      switch (f.type) {
        case "ExportAllDeclaration":
          f.exported = null;
          break;
        case "ExportNamedDeclaration":
          f.specifiers.length === 1 && f.specifiers[0].type === "ExportNamespaceSpecifier" && (this.castNodeTo(f, "ExportAllDeclaration"), f.exported = f.specifiers[0].exported, delete f.specifiers);
        case "ExportDefaultDeclaration":
          {
            var E;
            const {
              declaration: C
            } = f;
            C?.type === "ClassDeclaration" && ((E = C.decorators) == null ? void 0 : E.length) > 0 && C.start === f.start && this.resetStartLocation(f, o);
          }
          break;
      }
      return f;
    }
    stopParseSubscript(s, n) {
      const o = super.stopParseSubscript(s, n);
      return n.optionalChainMember ? this.estreeParseChainExpression(o, s.loc.end) : o;
    }
    parseMember(s, n, o, f, E) {
      const C = super.parseMember(s, n, o, f, E);
      return C.type === "OptionalMemberExpression" ? this.castNodeTo(C, "MemberExpression") : C.optional = !1, C;
    }
    isOptionalMemberExpression(s) {
      return s.type === "ChainExpression" ? s.expression.type === "MemberExpression" : super.isOptionalMemberExpression(s);
    }
    hasPropertyAsPrivateName(s) {
      return s.type === "ChainExpression" && (s = s.expression), super.hasPropertyAsPrivateName(s);
    }
    isObjectProperty(s) {
      return s.type === "Property" && s.kind === "init" && !s.method;
    }
    isObjectMethod(s) {
      return s.type === "Property" && (s.method || s.kind === "get" || s.kind === "set");
    }
    castNodeTo(s, n) {
      const o = super.castNodeTo(s, n);
      return this.fillOptionalPropertiesForTSESLint(o), o;
    }
    cloneIdentifier(s) {
      const n = super.cloneIdentifier(s);
      return this.fillOptionalPropertiesForTSESLint(n), n;
    }
    cloneStringLiteral(s) {
      return s.type === "Literal" ? this.cloneEstreeStringLiteral(s) : super.cloneStringLiteral(s);
    }
    finishNodeAt(s, n, o) {
      return F(super.finishNodeAt(s, n, o));
    }
    finishNode(s, n) {
      const o = super.finishNode(s, n);
      return this.fillOptionalPropertiesForTSESLint(o), o;
    }
    resetStartLocation(s, n) {
      super.resetStartLocation(s, n), F(s);
    }
    resetEndLocation(s, n = this.state.lastTokEndLoc) {
      super.resetEndLocation(s, n), F(s);
    }
  };
  class O {
    constructor(r, s) {
      this.token = void 0, this.preserveSpace = void 0, this.token = r, this.preserveSpace = !!s;
    }
  }
  const B = {
    brace: new O("{"),
    j_oTag: new O("<tag"),
    j_cTag: new O("</tag"),
    j_expr: new O("<tag>...</tag>", !0)
  };
  B.template = new O("`", !0);
  const _ = !0, U = !0, J = !0, $ = !0, G = !0, pe = !0;
  class ee {
    constructor(r, s = {}) {
      this.label = void 0, this.keyword = void 0, this.beforeExpr = void 0, this.startsExpr = void 0, this.rightAssociative = void 0, this.isLoop = void 0, this.isAssign = void 0, this.prefix = void 0, this.postfix = void 0, this.binop = void 0, this.label = r, this.keyword = s.keyword, this.beforeExpr = !!s.beforeExpr, this.startsExpr = !!s.startsExpr, this.rightAssociative = !!s.rightAssociative, this.isLoop = !!s.isLoop, this.isAssign = !!s.isAssign, this.prefix = !!s.prefix, this.postfix = !!s.postfix, this.binop = s.binop != null ? s.binop : null, this.updateContext = null;
    }
  }
  const ye = /* @__PURE__ */ new Map();
  function Z(x, r = {}) {
    r.keyword = x;
    const s = Y(x, r);
    return ye.set(x, s), s;
  }
  function ue(x, r) {
    return Y(x, {
      beforeExpr: _,
      binop: r
    });
  }
  let lt = -1;
  const Ne = [], q = [], jt = [], Ct = [], us = [], Fs = [];
  function Y(x, r = {}) {
    var s, n, o, f;
    return ++lt, q.push(x), jt.push((s = r.binop) != null ? s : -1), Ct.push((n = r.beforeExpr) != null ? n : !1), us.push((o = r.startsExpr) != null ? o : !1), Fs.push((f = r.prefix) != null ? f : !1), Ne.push(new ee(x, r)), lt;
  }
  function se(x, r = {}) {
    var s, n, o, f;
    return ++lt, ye.set(x, lt), q.push(x), jt.push((s = r.binop) != null ? s : -1), Ct.push((n = r.beforeExpr) != null ? n : !1), us.push((o = r.startsExpr) != null ? o : !1), Fs.push((f = r.prefix) != null ? f : !1), Ne.push(new ee("name", r)), lt;
  }
  const Xr = {
    bracketL: Y("[", {
      beforeExpr: _,
      startsExpr: U
    }),
    bracketHashL: Y("#[", {
      beforeExpr: _,
      startsExpr: U
    }),
    bracketBarL: Y("[|", {
      beforeExpr: _,
      startsExpr: U
    }),
    bracketR: Y("]"),
    bracketBarR: Y("|]"),
    braceL: Y("{", {
      beforeExpr: _,
      startsExpr: U
    }),
    braceBarL: Y("{|", {
      beforeExpr: _,
      startsExpr: U
    }),
    braceHashL: Y("#{", {
      beforeExpr: _,
      startsExpr: U
    }),
    braceR: Y("}"),
    braceBarR: Y("|}"),
    parenL: Y("(", {
      beforeExpr: _,
      startsExpr: U
    }),
    parenR: Y(")"),
    comma: Y(",", {
      beforeExpr: _
    }),
    semi: Y(";", {
      beforeExpr: _
    }),
    colon: Y(":", {
      beforeExpr: _
    }),
    doubleColon: Y("::", {
      beforeExpr: _
    }),
    dot: Y("."),
    question: Y("?", {
      beforeExpr: _
    }),
    questionDot: Y("?."),
    arrow: Y("=>", {
      beforeExpr: _
    }),
    template: Y("template"),
    ellipsis: Y("...", {
      beforeExpr: _
    }),
    backQuote: Y("`", {
      startsExpr: U
    }),
    dollarBraceL: Y("${", {
      beforeExpr: _,
      startsExpr: U
    }),
    templateTail: Y("...`", {
      startsExpr: U
    }),
    templateNonTail: Y("...${", {
      beforeExpr: _,
      startsExpr: U
    }),
    at: Y("@"),
    hash: Y("#", {
      startsExpr: U
    }),
    interpreterDirective: Y("#!..."),
    eq: Y("=", {
      beforeExpr: _,
      isAssign: $
    }),
    assign: Y("_=", {
      beforeExpr: _,
      isAssign: $
    }),
    slashAssign: Y("_=", {
      beforeExpr: _,
      isAssign: $
    }),
    xorAssign: Y("_=", {
      beforeExpr: _,
      isAssign: $
    }),
    moduloAssign: Y("_=", {
      beforeExpr: _,
      isAssign: $
    }),
    incDec: Y("++/--", {
      prefix: G,
      postfix: pe,
      startsExpr: U
    }),
    bang: Y("!", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    tilde: Y("~", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    doubleCaret: Y("^^", {
      startsExpr: U
    }),
    doubleAt: Y("@@", {
      startsExpr: U
    }),
    pipeline: ue("|>", 0),
    nullishCoalescing: ue("??", 1),
    logicalOR: ue("||", 1),
    logicalAND: ue("&&", 2),
    bitwiseOR: ue("|", 3),
    bitwiseXOR: ue("^", 4),
    bitwiseAND: ue("&", 5),
    equality: ue("==/!=/===/!==", 6),
    lt: ue("</>/<=/>=", 7),
    gt: ue("</>/<=/>=", 7),
    relational: ue("</>/<=/>=", 7),
    bitShift: ue("<</>>/>>>", 8),
    bitShiftL: ue("<</>>/>>>", 8),
    bitShiftR: ue("<</>>/>>>", 8),
    plusMin: Y("+/-", {
      beforeExpr: _,
      binop: 9,
      prefix: G,
      startsExpr: U
    }),
    modulo: Y("%", {
      binop: 10,
      startsExpr: U
    }),
    star: Y("*", {
      binop: 10
    }),
    slash: ue("/", 10),
    exponent: Y("**", {
      beforeExpr: _,
      binop: 11,
      rightAssociative: !0
    }),
    _in: Z("in", {
      beforeExpr: _,
      binop: 7
    }),
    _instanceof: Z("instanceof", {
      beforeExpr: _,
      binop: 7
    }),
    _break: Z("break"),
    _case: Z("case", {
      beforeExpr: _
    }),
    _catch: Z("catch"),
    _continue: Z("continue"),
    _debugger: Z("debugger"),
    _default: Z("default", {
      beforeExpr: _
    }),
    _else: Z("else", {
      beforeExpr: _
    }),
    _finally: Z("finally"),
    _function: Z("function", {
      startsExpr: U
    }),
    _if: Z("if"),
    _return: Z("return", {
      beforeExpr: _
    }),
    _switch: Z("switch"),
    _throw: Z("throw", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    _try: Z("try"),
    _var: Z("var"),
    _const: Z("const"),
    _with: Z("with"),
    _new: Z("new", {
      beforeExpr: _,
      startsExpr: U
    }),
    _this: Z("this", {
      startsExpr: U
    }),
    _super: Z("super", {
      startsExpr: U
    }),
    _class: Z("class", {
      startsExpr: U
    }),
    _extends: Z("extends", {
      beforeExpr: _
    }),
    _export: Z("export"),
    _import: Z("import", {
      startsExpr: U
    }),
    _null: Z("null", {
      startsExpr: U
    }),
    _true: Z("true", {
      startsExpr: U
    }),
    _false: Z("false", {
      startsExpr: U
    }),
    _typeof: Z("typeof", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    _void: Z("void", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    _delete: Z("delete", {
      beforeExpr: _,
      prefix: G,
      startsExpr: U
    }),
    _do: Z("do", {
      isLoop: J,
      beforeExpr: _
    }),
    _for: Z("for", {
      isLoop: J
    }),
    _while: Z("while", {
      isLoop: J
    }),
    _as: se("as", {
      startsExpr: U
    }),
    _assert: se("assert", {
      startsExpr: U
    }),
    _async: se("async", {
      startsExpr: U
    }),
    _await: se("await", {
      startsExpr: U
    }),
    _defer: se("defer", {
      startsExpr: U
    }),
    _from: se("from", {
      startsExpr: U
    }),
    _get: se("get", {
      startsExpr: U
    }),
    _let: se("let", {
      startsExpr: U
    }),
    _meta: se("meta", {
      startsExpr: U
    }),
    _of: se("of", {
      startsExpr: U
    }),
    _sent: se("sent", {
      startsExpr: U
    }),
    _set: se("set", {
      startsExpr: U
    }),
    _source: se("source", {
      startsExpr: U
    }),
    _static: se("static", {
      startsExpr: U
    }),
    _using: se("using", {
      startsExpr: U
    }),
    _yield: se("yield", {
      startsExpr: U
    }),
    _asserts: se("asserts", {
      startsExpr: U
    }),
    _checks: se("checks", {
      startsExpr: U
    }),
    _exports: se("exports", {
      startsExpr: U
    }),
    _global: se("global", {
      startsExpr: U
    }),
    _implements: se("implements", {
      startsExpr: U
    }),
    _intrinsic: se("intrinsic", {
      startsExpr: U
    }),
    _infer: se("infer", {
      startsExpr: U
    }),
    _is: se("is", {
      startsExpr: U
    }),
    _mixins: se("mixins", {
      startsExpr: U
    }),
    _proto: se("proto", {
      startsExpr: U
    }),
    _require: se("require", {
      startsExpr: U
    }),
    _satisfies: se("satisfies", {
      startsExpr: U
    }),
    _keyof: se("keyof", {
      startsExpr: U
    }),
    _readonly: se("readonly", {
      startsExpr: U
    }),
    _unique: se("unique", {
      startsExpr: U
    }),
    _abstract: se("abstract", {
      startsExpr: U
    }),
    _declare: se("declare", {
      startsExpr: U
    }),
    _enum: se("enum", {
      startsExpr: U
    }),
    _module: se("module", {
      startsExpr: U
    }),
    _namespace: se("namespace", {
      startsExpr: U
    }),
    _interface: se("interface", {
      startsExpr: U
    }),
    _type: se("type", {
      startsExpr: U
    }),
    _opaque: se("opaque", {
      startsExpr: U
    }),
    name: Y("name", {
      startsExpr: U
    }),
    placeholder: Y("%%", {
      startsExpr: U
    }),
    string: Y("string", {
      startsExpr: U
    }),
    num: Y("num", {
      startsExpr: U
    }),
    bigint: Y("bigint", {
      startsExpr: U
    }),
    decimal: Y("decimal", {
      startsExpr: U
    }),
    regexp: Y("regexp", {
      startsExpr: U
    }),
    privateName: Y("#name", {
      startsExpr: U
    }),
    eof: Y("eof"),
    jsxName: Y("jsxName"),
    jsxText: Y("jsxText", {
      beforeExpr: _
    }),
    jsxTagStart: Y("jsxTagStart", {
      startsExpr: U
    }),
    jsxTagEnd: Y("jsxTagEnd")
  };
  function ae(x) {
    return x >= 93 && x <= 133;
  }
  function vt(x) {
    return x <= 92;
  }
  function Ke(x) {
    return x >= 58 && x <= 133;
  }
  function Us(x) {
    return x >= 58 && x <= 137;
  }
  function Sf(x) {
    return Ct[x];
  }
  function Vs(x) {
    return us[x];
  }
  function xf(x) {
    return x >= 29 && x <= 33;
  }
  function Do(x) {
    return x >= 129 && x <= 131;
  }
  function If(x) {
    return x >= 90 && x <= 92;
  }
  function Zr(x) {
    return x >= 58 && x <= 92;
  }
  function Ef(x) {
    return x >= 39 && x <= 59;
  }
  function bf(x) {
    return x === 34;
  }
  function wf(x) {
    return Fs[x];
  }
  function Cf(x) {
    return x >= 121 && x <= 123;
  }
  function vf(x) {
    return x >= 124 && x <= 130;
  }
  function Tt(x) {
    return q[x];
  }
  function Ai(x) {
    return jt[x];
  }
  function Tf(x) {
    return x === 57;
  }
  function gi(x) {
    return x >= 24 && x <= 25;
  }
  function At(x) {
    return Ne[x];
  }
  Ne[8].updateContext = (x) => {
    x.pop();
  }, Ne[5].updateContext = Ne[7].updateContext = Ne[23].updateContext = (x) => {
    x.push(B.brace);
  }, Ne[22].updateContext = (x) => {
    x[x.length - 1] === B.template ? x.pop() : x.push(B.template);
  }, Ne[143].updateContext = (x) => {
    x.push(B.j_expr, B.j_oTag);
  };
  let qr = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Bo = "·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･";
  const Pf = new RegExp("[" + qr + "]"), Nf = new RegExp("[" + qr + Bo + "]");
  qr = Bo = null;
  const Lo = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 7, 25, 39, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 5, 57, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 24, 43, 261, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 33, 24, 3, 24, 45, 74, 6, 0, 67, 12, 65, 1, 2, 0, 15, 4, 10, 7381, 42, 31, 98, 114, 8702, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 208, 30, 2, 2, 2, 1, 2, 6, 3, 4, 10, 1, 225, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4381, 3, 5773, 3, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 8489], kf = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 78, 5, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 199, 7, 137, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 55, 9, 266, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 233, 0, 3, 0, 8, 1, 6, 0, 475, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
  function zr(x, r) {
    let s = 65536;
    for (let n = 0, o = r.length; n < o; n += 2) {
      if (s += r[n], s > x) return !1;
      if (s += r[n + 1], s >= x) return !0;
    }
    return !1;
  }
  function ut(x) {
    return x < 65 ? x === 36 : x <= 90 ? !0 : x < 97 ? x === 95 : x <= 122 ? !0 : x <= 65535 ? x >= 170 && Pf.test(String.fromCharCode(x)) : zr(x, Lo);
  }
  function Wt(x) {
    return x < 48 ? x === 36 : x < 58 ? !0 : x < 65 ? !1 : x <= 90 ? !0 : x < 97 ? x === 95 : x <= 122 ? !0 : x <= 65535 ? x >= 170 && Nf.test(String.fromCharCode(x)) : zr(x, Lo) || zr(x, kf);
  }
  const en = {
    keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
    strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
    strictBind: ["eval", "arguments"]
  }, Of = new Set(en.keyword), _f = new Set(en.strict), Df = new Set(en.strictBind);
  function Ro(x, r) {
    return r && x === "await" || x === "enum";
  }
  function Mo(x, r) {
    return Ro(x, r) || _f.has(x);
  }
  function Fo(x) {
    return Df.has(x);
  }
  function Uo(x, r) {
    return Mo(x, r) || Fo(x);
  }
  function Bf(x) {
    return Of.has(x);
  }
  function Lf(x, r, s) {
    return x === 64 && r === 64 && ut(s);
  }
  const Rf = /* @__PURE__ */ new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
  function Mf(x) {
    return Rf.has(x);
  }
  class tn {
    constructor(r) {
      this.flags = 0, this.names = /* @__PURE__ */ new Map(), this.firstLexicalName = "", this.flags = r;
    }
  }
  class sn {
    constructor(r, s) {
      this.parser = void 0, this.scopeStack = [], this.inModule = void 0, this.undefinedExports = /* @__PURE__ */ new Map(), this.parser = r, this.inModule = s;
    }
    get inTopLevel() {
      return (this.currentScope().flags & 1) > 0;
    }
    get inFunction() {
      return (this.currentVarScopeFlags() & 2) > 0;
    }
    get allowSuper() {
      return (this.currentThisScopeFlags() & 16) > 0;
    }
    get allowDirectSuper() {
      return (this.currentThisScopeFlags() & 32) > 0;
    }
    get allowNewTarget() {
      return (this.currentThisScopeFlags() & 512) > 0;
    }
    get inClass() {
      return (this.currentThisScopeFlags() & 64) > 0;
    }
    get inClassAndNotInNonArrowFunction() {
      const r = this.currentThisScopeFlags();
      return (r & 64) > 0 && (r & 2) === 0;
    }
    get inStaticBlock() {
      for (let r = this.scopeStack.length - 1; ; r--) {
        const {
          flags: s
        } = this.scopeStack[r];
        if (s & 128)
          return !0;
        if (s & 1731)
          return !1;
      }
    }
    get inNonArrowFunction() {
      return (this.currentThisScopeFlags() & 2) > 0;
    }
    get inBareCaseStatement() {
      return (this.currentScope().flags & 256) > 0;
    }
    get treatFunctionsAsVar() {
      return this.treatFunctionsAsVarInScope(this.currentScope());
    }
    createScope(r) {
      return new tn(r);
    }
    enter(r) {
      this.scopeStack.push(this.createScope(r));
    }
    exit() {
      return this.scopeStack.pop().flags;
    }
    treatFunctionsAsVarInScope(r) {
      return !!(r.flags & 130 || !this.parser.inModule && r.flags & 1);
    }
    declareName(r, s, n) {
      let o = this.currentScope();
      if (s & 8 || s & 16) {
        this.checkRedeclarationInScope(o, r, s, n);
        let f = o.names.get(r) || 0;
        s & 16 ? f = f | 4 : (o.firstLexicalName || (o.firstLexicalName = r), f = f | 2), o.names.set(r, f), s & 8 && this.maybeExportDefined(o, r);
      } else if (s & 4)
        for (let f = this.scopeStack.length - 1; f >= 0 && (o = this.scopeStack[f], this.checkRedeclarationInScope(o, r, s, n), o.names.set(r, (o.names.get(r) || 0) | 1), this.maybeExportDefined(o, r), !(o.flags & 1667)); --f)
          ;
      this.parser.inModule && o.flags & 1 && this.undefinedExports.delete(r);
    }
    maybeExportDefined(r, s) {
      this.parser.inModule && r.flags & 1 && this.undefinedExports.delete(s);
    }
    checkRedeclarationInScope(r, s, n, o) {
      this.isRedeclaredInScope(r, s, n) && this.parser.raise(S.VarRedeclaration, o, {
        identifierName: s
      });
    }
    isRedeclaredInScope(r, s, n) {
      if (!(n & 1)) return !1;
      if (n & 8)
        return r.names.has(s);
      const o = r.names.get(s) || 0;
      return n & 16 ? (o & 2) > 0 || !this.treatFunctionsAsVarInScope(r) && (o & 1) > 0 : (o & 2) > 0 && !(r.flags & 8 && r.firstLexicalName === s) || !this.treatFunctionsAsVarInScope(r) && (o & 4) > 0;
    }
    checkLocalExport(r) {
      const {
        name: s
      } = r;
      this.scopeStack[0].names.has(s) || this.undefinedExports.set(s, r.loc.start);
    }
    currentScope() {
      return this.scopeStack[this.scopeStack.length - 1];
    }
    currentVarScopeFlags() {
      for (let r = this.scopeStack.length - 1; ; r--) {
        const {
          flags: s
        } = this.scopeStack[r];
        if (s & 1667)
          return s;
      }
    }
    currentThisScopeFlags() {
      for (let r = this.scopeStack.length - 1; ; r--) {
        const {
          flags: s
        } = this.scopeStack[r];
        if (s & 1731 && !(s & 4))
          return s;
      }
    }
  }
  class Ff extends tn {
    constructor(...r) {
      super(...r), this.declareFunctions = /* @__PURE__ */ new Set();
    }
  }
  class Uf extends sn {
    createScope(r) {
      return new Ff(r);
    }
    declareName(r, s, n) {
      const o = this.currentScope();
      if (s & 2048) {
        this.checkRedeclarationInScope(o, r, s, n), this.maybeExportDefined(o, r), o.declareFunctions.add(r);
        return;
      }
      super.declareName(r, s, n);
    }
    isRedeclaredInScope(r, s, n) {
      if (super.isRedeclaredInScope(r, s, n)) return !0;
      if (n & 2048 && !r.declareFunctions.has(s)) {
        const o = r.names.get(s);
        return (o & 4) > 0 || (o & 2) > 0;
      }
      return !1;
    }
    checkLocalExport(r) {
      this.scopeStack[0].declareFunctions.has(r.name) || super.checkLocalExport(r);
    }
  }
  const Vf = /* @__PURE__ */ new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]), X = v`flow`({
    AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
    AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.",
    AssignReservedType: ({
      reservedType: x
    }) => `Cannot overwrite reserved type ${x}.`,
    DeclareClassElement: "The `declare` modifier can only appear on class fields.",
    DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
    DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement.",
    EnumBooleanMemberNotInitialized: ({
      memberName: x,
      enumName: r
    }) => `Boolean enum members need to be initialized. Use either \`${x} = true,\` or \`${x} = false,\` in enum \`${r}\`.`,
    EnumDuplicateMemberName: ({
      memberName: x,
      enumName: r
    }) => `Enum member names need to be unique, but the name \`${x}\` has already been used before in enum \`${r}\`.`,
    EnumInconsistentMemberValues: ({
      enumName: x
    }) => `Enum \`${x}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
    EnumInvalidExplicitType: ({
      invalidEnumType: x,
      enumName: r
    }) => `Enum type \`${x}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${r}\`.`,
    EnumInvalidExplicitTypeUnknownSupplied: ({
      enumName: x
    }) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${x}\`.`,
    EnumInvalidMemberInitializerPrimaryType: ({
      enumName: x,
      memberName: r,
      explicitType: s
    }) => `Enum \`${x}\` has type \`${s}\`, so the initializer of \`${r}\` needs to be a ${s} literal.`,
    EnumInvalidMemberInitializerSymbolType: ({
      enumName: x,
      memberName: r
    }) => `Symbol enum members cannot be initialized. Use \`${r},\` in enum \`${x}\`.`,
    EnumInvalidMemberInitializerUnknownType: ({
      enumName: x,
      memberName: r
    }) => `The enum member initializer for \`${r}\` needs to be a literal (either a boolean, number, or string) in enum \`${x}\`.`,
    EnumInvalidMemberName: ({
      enumName: x,
      memberName: r,
      suggestion: s
    }) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${r}\`, consider using \`${s}\`, in enum \`${x}\`.`,
    EnumNumberMemberNotInitialized: ({
      enumName: x,
      memberName: r
    }) => `Number enum members need to be initialized, e.g. \`${r} = 1\` in enum \`${x}\`.`,
    EnumStringMemberInconsistentlyInitialized: ({
      enumName: x
    }) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${x}\`.`,
    GetterMayNotHaveThisParam: "A getter cannot have a `this` parameter.",
    ImportReflectionHasImportType: "An `import module` declaration can not use `type` or `typeof` keyword.",
    ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.",
    InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type.",
    InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions.",
    InexactVariance: "Explicit inexact syntax cannot have variance.",
    InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`.",
    MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
    NestedDeclareModule: "`declare module` cannot be used inside another `declare module`.",
    NestedFlowComment: "Cannot have a flow comment inside another flow comment.",
    PatternIsOptional: Object.assign({
      message: "A binding pattern parameter cannot be optional in an implementation signature."
    }, {
      reasonCode: "OptionalBindingPattern"
    }),
    SetterMayNotHaveThisParam: "A setter cannot have a `this` parameter.",
    SpreadVariance: "Spread properties cannot have variance.",
    ThisParamAnnotationRequired: "A type annotation is required for the `this` parameter.",
    ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
    ThisParamMayNotBeOptional: "The `this` parameter cannot be optional.",
    ThisParamMustBeFirst: "The `this` parameter must be the first function parameter.",
    ThisParamNoDefault: "The `this` parameter may not have a default value.",
    TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
    TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis.",
    UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object.",
    UnexpectedReservedType: ({
      reservedType: x
    }) => `Unexpected reserved type ${x}.`,
    UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new.",
    UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
    UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions.",
    UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".',
    UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration.",
    UnexpectedTypeParameterBeforeAsyncArrowFunction: "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.",
    UnsupportedDeclareExportKind: ({
      unsupportedExportKind: x,
      suggestion: r
    }) => `\`declare export ${x}\` is not supported. Use \`${r}\` instead.`,
    UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module.",
    UnterminatedFlowComment: "Unterminated flow-comment."
  });
  function Gf(x) {
    return x.type === "DeclareExportAllDeclaration" || x.type === "DeclareExportDeclaration" && (!x.declaration || x.declaration.type !== "TypeAlias" && x.declaration.type !== "InterfaceDeclaration");
  }
  function Vo(x) {
    return x.importKind === "type" || x.importKind === "typeof";
  }
  const Kf = {
    const: "declare export var",
    let: "declare export var",
    type: "export type",
    interface: "export interface"
  };
  function jf(x, r) {
    const s = [], n = [];
    for (let o = 0; o < x.length; o++)
      (r(x[o], o, x) ? s : n).push(x[o]);
    return [s, n];
  }
  const Wf = /\*?\s*@((?:no)?flow)\b/;
  var Qf = (x) => class extends x {
    constructor(...s) {
      super(...s), this.flowPragma = void 0;
    }
    getScopeHandler() {
      return Uf;
    }
    shouldParseTypes() {
      return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
    }
    finishToken(s, n) {
      s !== 134 && s !== 13 && s !== 28 && this.flowPragma === void 0 && (this.flowPragma = null), super.finishToken(s, n);
    }
    addComment(s) {
      if (this.flowPragma === void 0) {
        const n = Wf.exec(s.value);
        if (n) if (n[1] === "flow")
          this.flowPragma = "flow";
        else if (n[1] === "noflow")
          this.flowPragma = "noflow";
        else
          throw new Error("Unexpected flow pragma");
      }
      super.addComment(s);
    }
    flowParseTypeInitialiser(s) {
      const n = this.state.inType;
      this.state.inType = !0, this.expect(s || 14);
      const o = this.flowParseType();
      return this.state.inType = n, o;
    }
    flowParsePredicate() {
      const s = this.startNode(), n = this.state.startLoc;
      return this.next(), this.expectContextual(110), this.state.lastTokStartLoc.index > n.index + 1 && this.raise(X.UnexpectedSpaceBetweenModuloChecks, n), this.eat(10) ? (s.value = super.parseExpression(), this.expect(11), this.finishNode(s, "DeclaredPredicate")) : this.finishNode(s, "InferredPredicate");
    }
    flowParseTypeAndPredicateInitialiser() {
      const s = this.state.inType;
      this.state.inType = !0, this.expect(14);
      let n = null, o = null;
      return this.match(54) ? (this.state.inType = s, o = this.flowParsePredicate()) : (n = this.flowParseType(), this.state.inType = s, this.match(54) && (o = this.flowParsePredicate())), [n, o];
    }
    flowParseDeclareClass(s) {
      return this.next(), this.flowParseInterfaceish(s, !0), this.finishNode(s, "DeclareClass");
    }
    flowParseDeclareFunction(s) {
      this.next();
      const n = s.id = this.parseIdentifier(), o = this.startNode(), f = this.startNode();
      this.match(47) ? o.typeParameters = this.flowParseTypeParameterDeclaration() : o.typeParameters = null, this.expect(10);
      const E = this.flowParseFunctionTypeParams();
      return o.params = E.params, o.rest = E.rest, o.this = E._this, this.expect(11), [o.returnType, s.predicate] = this.flowParseTypeAndPredicateInitialiser(), f.typeAnnotation = this.finishNode(o, "FunctionTypeAnnotation"), n.typeAnnotation = this.finishNode(f, "TypeAnnotation"), this.resetEndLocation(n), this.semicolon(), this.scope.declareName(s.id.name, 2048, s.id.loc.start), this.finishNode(s, "DeclareFunction");
    }
    flowParseDeclare(s, n) {
      if (this.match(80))
        return this.flowParseDeclareClass(s);
      if (this.match(68))
        return this.flowParseDeclareFunction(s);
      if (this.match(74))
        return this.flowParseDeclareVariable(s);
      if (this.eatContextual(127))
        return this.match(16) ? this.flowParseDeclareModuleExports(s) : (n && this.raise(X.NestedDeclareModule, this.state.lastTokStartLoc), this.flowParseDeclareModule(s));
      if (this.isContextual(130))
        return this.flowParseDeclareTypeAlias(s);
      if (this.isContextual(131))
        return this.flowParseDeclareOpaqueType(s);
      if (this.isContextual(129))
        return this.flowParseDeclareInterface(s);
      if (this.match(82))
        return this.flowParseDeclareExportDeclaration(s, n);
      throw this.unexpected();
    }
    flowParseDeclareVariable(s) {
      return this.next(), s.id = this.flowParseTypeAnnotatableIdentifier(), this.scope.declareName(s.id.name, 5, s.id.loc.start), this.semicolon(), this.finishNode(s, "DeclareVariable");
    }
    flowParseDeclareModule(s) {
      this.scope.enter(0), this.match(134) ? s.id = super.parseExprAtom() : s.id = this.parseIdentifier();
      const n = s.body = this.startNode(), o = n.body = [];
      for (this.expect(5); !this.match(8); ) {
        const C = this.startNode();
        this.match(83) ? (this.next(), !this.isContextual(130) && !this.match(87) && this.raise(X.InvalidNonTypeImportInDeclareModule, this.state.lastTokStartLoc), o.push(super.parseImport(C))) : (this.expectContextual(125, X.UnsupportedStatementInDeclareModule), o.push(this.flowParseDeclare(C, !0)));
      }
      this.scope.exit(), this.expect(8), this.finishNode(n, "BlockStatement");
      let f = null, E = !1;
      return o.forEach((C) => {
        Gf(C) ? (f === "CommonJS" && this.raise(X.AmbiguousDeclareModuleKind, C), f = "ES") : C.type === "DeclareModuleExports" && (E && this.raise(X.DuplicateDeclareModuleExports, C), f === "ES" && this.raise(X.AmbiguousDeclareModuleKind, C), f = "CommonJS", E = !0);
      }), s.kind = f || "CommonJS", this.finishNode(s, "DeclareModule");
    }
    flowParseDeclareExportDeclaration(s, n) {
      if (this.expect(82), this.eat(65))
        return this.match(68) || this.match(80) ? s.declaration = this.flowParseDeclare(this.startNode()) : (s.declaration = this.flowParseType(), this.semicolon()), s.default = !0, this.finishNode(s, "DeclareExportDeclaration");
      if (this.match(75) || this.isLet() || (this.isContextual(130) || this.isContextual(129)) && !n) {
        const o = this.state.value;
        throw this.raise(X.UnsupportedDeclareExportKind, this.state.startLoc, {
          unsupportedExportKind: o,
          suggestion: Kf[o]
        });
      }
      if (this.match(74) || this.match(68) || this.match(80) || this.isContextual(131))
        return s.declaration = this.flowParseDeclare(this.startNode()), s.default = !1, this.finishNode(s, "DeclareExportDeclaration");
      if (this.match(55) || this.match(5) || this.isContextual(129) || this.isContextual(130) || this.isContextual(131))
        return s = this.parseExport(s, null), s.type === "ExportNamedDeclaration" ? (s.default = !1, delete s.exportKind, this.castNodeTo(s, "DeclareExportDeclaration")) : this.castNodeTo(s, "DeclareExportAllDeclaration");
      throw this.unexpected();
    }
    flowParseDeclareModuleExports(s) {
      return this.next(), this.expectContextual(111), s.typeAnnotation = this.flowParseTypeAnnotation(), this.semicolon(), this.finishNode(s, "DeclareModuleExports");
    }
    flowParseDeclareTypeAlias(s) {
      this.next();
      const n = this.flowParseTypeAlias(s);
      return this.castNodeTo(n, "DeclareTypeAlias"), n;
    }
    flowParseDeclareOpaqueType(s) {
      this.next();
      const n = this.flowParseOpaqueType(s, !0);
      return this.castNodeTo(n, "DeclareOpaqueType"), n;
    }
    flowParseDeclareInterface(s) {
      return this.next(), this.flowParseInterfaceish(s, !1), this.finishNode(s, "DeclareInterface");
    }
    flowParseInterfaceish(s, n) {
      if (s.id = this.flowParseRestrictedIdentifier(!n, !0), this.scope.declareName(s.id.name, n ? 17 : 8201, s.id.loc.start), this.match(47) ? s.typeParameters = this.flowParseTypeParameterDeclaration() : s.typeParameters = null, s.extends = [], this.eat(81))
        do
          s.extends.push(this.flowParseInterfaceExtends());
        while (!n && this.eat(12));
      if (n) {
        if (s.implements = [], s.mixins = [], this.eatContextual(117))
          do
            s.mixins.push(this.flowParseInterfaceExtends());
          while (this.eat(12));
        if (this.eatContextual(113))
          do
            s.implements.push(this.flowParseInterfaceExtends());
          while (this.eat(12));
      }
      s.body = this.flowParseObjectType({
        allowStatic: n,
        allowExact: !1,
        allowSpread: !1,
        allowProto: n,
        allowInexact: !1
      });
    }
    flowParseInterfaceExtends() {
      const s = this.startNode();
      return s.id = this.flowParseQualifiedTypeIdentifier(), this.match(47) ? s.typeParameters = this.flowParseTypeParameterInstantiation() : s.typeParameters = null, this.finishNode(s, "InterfaceExtends");
    }
    flowParseInterface(s) {
      return this.flowParseInterfaceish(s, !1), this.finishNode(s, "InterfaceDeclaration");
    }
    checkNotUnderscore(s) {
      s === "_" && this.raise(X.UnexpectedReservedUnderscore, this.state.startLoc);
    }
    checkReservedType(s, n, o) {
      Vf.has(s) && this.raise(o ? X.AssignReservedType : X.UnexpectedReservedType, n, {
        reservedType: s
      });
    }
    flowParseRestrictedIdentifierName(s, n) {
      return this.checkReservedType(this.state.value, this.state.startLoc, n), this.parseIdentifierName(s);
    }
    flowParseRestrictedIdentifier(s, n) {
      const o = this.startNode(), f = this.flowParseRestrictedIdentifierName(s, n);
      return this.createIdentifier(o, f);
    }
    flowParseTypeAlias(s) {
      return s.id = this.flowParseRestrictedIdentifier(!1, !0), this.scope.declareName(s.id.name, 8201, s.id.loc.start), this.match(47) ? s.typeParameters = this.flowParseTypeParameterDeclaration() : s.typeParameters = null, s.right = this.flowParseTypeInitialiser(29), this.semicolon(), this.finishNode(s, "TypeAlias");
    }
    flowParseOpaqueType(s, n) {
      return this.expectContextual(130), s.id = this.flowParseRestrictedIdentifier(!0, !0), this.scope.declareName(s.id.name, 8201, s.id.loc.start), this.match(47) ? s.typeParameters = this.flowParseTypeParameterDeclaration() : s.typeParameters = null, s.supertype = null, this.match(14) && (s.supertype = this.flowParseTypeInitialiser(14)), s.impltype = null, n || (s.impltype = this.flowParseTypeInitialiser(29)), this.semicolon(), this.finishNode(s, "OpaqueType");
    }
    flowParseTypeParameterBound() {
      if (this.match(14) || this.isContextual(81)) {
        const s = this.startNode();
        return this.next(), s.typeAnnotation = this.flowParseType(), this.finishNode(s, "TypeAnnotation");
      }
    }
    flowParseTypeParameter(s = !1) {
      const n = this.state.startLoc, o = this.startNode(), f = this.flowParseVariance();
      return o.name = this.flowParseRestrictedIdentifierName(), o.variance = f, o.bound = this.flowParseTypeParameterBound(), this.match(29) ? (this.eat(29), o.default = this.flowParseType()) : s && this.raise(X.MissingTypeParamDefault, n), this.finishNode(o, "TypeParameter");
    }
    flowParseTypeParameterDeclaration() {
      const s = this.state.inType, n = this.startNode();
      n.params = [], this.state.inType = !0, this.match(47) || this.match(143) ? this.next() : this.unexpected();
      let o = !1;
      do {
        const f = this.flowParseTypeParameter(o);
        n.params.push(f), f.default && (o = !0), this.match(48) || this.expect(12);
      } while (!this.match(48));
      return this.expect(48), this.state.inType = s, this.finishNode(n, "TypeParameterDeclaration");
    }
    flowInTopLevelContext(s) {
      if (this.curContext() !== B.brace) {
        const n = this.state.context;
        this.state.context = [n[0]];
        try {
          return s();
        } finally {
          this.state.context = n;
        }
      } else
        return s();
    }
    flowParseTypeParameterInstantiationInExpression() {
      if (this.reScan_lt() === 47)
        return this.flowParseTypeParameterInstantiation();
    }
    flowParseTypeParameterInstantiation() {
      const s = this.startNode(), n = this.state.inType;
      return this.state.inType = !0, s.params = [], this.flowInTopLevelContext(() => {
        this.expect(47);
        const o = this.state.noAnonFunctionType;
        for (this.state.noAnonFunctionType = !1; !this.match(48); )
          s.params.push(this.flowParseType()), this.match(48) || this.expect(12);
        this.state.noAnonFunctionType = o;
      }), this.state.inType = n, !this.state.inType && this.curContext() === B.brace && this.reScan_lt_gt(), this.expect(48), this.finishNode(s, "TypeParameterInstantiation");
    }
    flowParseTypeParameterInstantiationCallOrNew() {
      if (this.reScan_lt() !== 47) return null;
      const s = this.startNode(), n = this.state.inType;
      for (s.params = [], this.state.inType = !0, this.expect(47); !this.match(48); )
        s.params.push(this.flowParseTypeOrImplicitInstantiation()), this.match(48) || this.expect(12);
      return this.expect(48), this.state.inType = n, this.finishNode(s, "TypeParameterInstantiation");
    }
    flowParseInterfaceType() {
      const s = this.startNode();
      if (this.expectContextual(129), s.extends = [], this.eat(81))
        do
          s.extends.push(this.flowParseInterfaceExtends());
        while (this.eat(12));
      return s.body = this.flowParseObjectType({
        allowStatic: !1,
        allowExact: !1,
        allowSpread: !1,
        allowProto: !1,
        allowInexact: !1
      }), this.finishNode(s, "InterfaceTypeAnnotation");
    }
    flowParseObjectPropertyKey() {
      return this.match(135) || this.match(134) ? super.parseExprAtom() : this.parseIdentifier(!0);
    }
    flowParseObjectTypeIndexer(s, n, o) {
      return s.static = n, this.lookahead().type === 14 ? (s.id = this.flowParseObjectPropertyKey(), s.key = this.flowParseTypeInitialiser()) : (s.id = null, s.key = this.flowParseType()), this.expect(3), s.value = this.flowParseTypeInitialiser(), s.variance = o, this.finishNode(s, "ObjectTypeIndexer");
    }
    flowParseObjectTypeInternalSlot(s, n) {
      return s.static = n, s.id = this.flowParseObjectPropertyKey(), this.expect(3), this.expect(3), this.match(47) || this.match(10) ? (s.method = !0, s.optional = !1, s.value = this.flowParseObjectTypeMethodish(this.startNodeAt(s.loc.start))) : (s.method = !1, this.eat(17) && (s.optional = !0), s.value = this.flowParseTypeInitialiser()), this.finishNode(s, "ObjectTypeInternalSlot");
    }
    flowParseObjectTypeMethodish(s) {
      for (s.params = [], s.rest = null, s.typeParameters = null, s.this = null, this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), this.expect(10), this.match(78) && (s.this = this.flowParseFunctionTypeParam(!0), s.this.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); )
        s.params.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
      return this.eat(21) && (s.rest = this.flowParseFunctionTypeParam(!1)), this.expect(11), s.returnType = this.flowParseTypeInitialiser(), this.finishNode(s, "FunctionTypeAnnotation");
    }
    flowParseObjectTypeCallProperty(s, n) {
      const o = this.startNode();
      return s.static = n, s.value = this.flowParseObjectTypeMethodish(o), this.finishNode(s, "ObjectTypeCallProperty");
    }
    flowParseObjectType({
      allowStatic: s,
      allowExact: n,
      allowSpread: o,
      allowProto: f,
      allowInexact: E
    }) {
      const C = this.state.inType;
      this.state.inType = !0;
      const T = this.startNode();
      T.callProperties = [], T.properties = [], T.indexers = [], T.internalSlots = [];
      let N, D, V = !1;
      for (n && this.match(6) ? (this.expect(6), N = 9, D = !0) : (this.expect(5), N = 8, D = !1), T.exact = D; !this.match(N); ) {
        let W = !1, H = null, re = null;
        const me = this.startNode();
        if (f && this.isContextual(118)) {
          const fe = this.lookahead();
          fe.type !== 14 && fe.type !== 17 && (this.next(), H = this.state.startLoc, s = !1);
        }
        if (s && this.isContextual(106)) {
          const fe = this.lookahead();
          fe.type !== 14 && fe.type !== 17 && (this.next(), W = !0);
        }
        const te = this.flowParseVariance();
        if (this.eat(0))
          H != null && this.unexpected(H), this.eat(0) ? (te && this.unexpected(te.loc.start), T.internalSlots.push(this.flowParseObjectTypeInternalSlot(me, W))) : T.indexers.push(this.flowParseObjectTypeIndexer(me, W, te));
        else if (this.match(10) || this.match(47))
          H != null && this.unexpected(H), te && this.unexpected(te.loc.start), T.callProperties.push(this.flowParseObjectTypeCallProperty(me, W));
        else {
          let fe = "init";
          if (this.isContextual(99) || this.isContextual(104)) {
            const kt = this.lookahead();
            Us(kt.type) && (fe = this.state.value, this.next());
          }
          const $t = this.flowParseObjectTypeProperty(me, W, H, te, fe, o, E ?? !D);
          $t === null ? (V = !0, re = this.state.lastTokStartLoc) : T.properties.push($t);
        }
        this.flowObjectTypeSemicolon(), re && !this.match(8) && !this.match(9) && this.raise(X.UnexpectedExplicitInexactInObject, re);
      }
      this.expect(N), o && (T.inexact = V);
      const j = this.finishNode(T, "ObjectTypeAnnotation");
      return this.state.inType = C, j;
    }
    flowParseObjectTypeProperty(s, n, o, f, E, C, T) {
      if (this.eat(21))
        return this.match(12) || this.match(13) || this.match(8) || this.match(9) ? (C ? T || this.raise(X.InexactInsideExact, this.state.lastTokStartLoc) : this.raise(X.InexactInsideNonObject, this.state.lastTokStartLoc), f && this.raise(X.InexactVariance, f), null) : (C || this.raise(X.UnexpectedSpreadType, this.state.lastTokStartLoc), o != null && this.unexpected(o), f && this.raise(X.SpreadVariance, f), s.argument = this.flowParseType(), this.finishNode(s, "ObjectTypeSpreadProperty"));
      {
        s.key = this.flowParseObjectPropertyKey(), s.static = n, s.proto = o != null, s.kind = E;
        let N = !1;
        return this.match(47) || this.match(10) ? (s.method = !0, o != null && this.unexpected(o), f && this.unexpected(f.loc.start), s.value = this.flowParseObjectTypeMethodish(this.startNodeAt(s.loc.start)), (E === "get" || E === "set") && this.flowCheckGetterSetterParams(s), !C && s.key.name === "constructor" && s.value.this && this.raise(X.ThisParamBannedInConstructor, s.value.this)) : (E !== "init" && this.unexpected(), s.method = !1, this.eat(17) && (N = !0), s.value = this.flowParseTypeInitialiser(), s.variance = f), s.optional = N, this.finishNode(s, "ObjectTypeProperty");
      }
    }
    flowCheckGetterSetterParams(s) {
      const n = s.kind === "get" ? 0 : 1, o = s.value.params.length + (s.value.rest ? 1 : 0);
      s.value.this && this.raise(s.kind === "get" ? X.GetterMayNotHaveThisParam : X.SetterMayNotHaveThisParam, s.value.this), o !== n && this.raise(s.kind === "get" ? S.BadGetterArity : S.BadSetterArity, s), s.kind === "set" && s.value.rest && this.raise(S.BadSetterRestParameter, s);
    }
    flowObjectTypeSemicolon() {
      !this.eat(13) && !this.eat(12) && !this.match(8) && !this.match(9) && this.unexpected();
    }
    flowParseQualifiedTypeIdentifier(s, n) {
      s ?? (s = this.state.startLoc);
      let o = n || this.flowParseRestrictedIdentifier(!0);
      for (; this.eat(16); ) {
        const f = this.startNodeAt(s);
        f.qualification = o, f.id = this.flowParseRestrictedIdentifier(!0), o = this.finishNode(f, "QualifiedTypeIdentifier");
      }
      return o;
    }
    flowParseGenericType(s, n) {
      const o = this.startNodeAt(s);
      return o.typeParameters = null, o.id = this.flowParseQualifiedTypeIdentifier(s, n), this.match(47) && (o.typeParameters = this.flowParseTypeParameterInstantiation()), this.finishNode(o, "GenericTypeAnnotation");
    }
    flowParseTypeofType() {
      const s = this.startNode();
      return this.expect(87), s.argument = this.flowParsePrimaryType(), this.finishNode(s, "TypeofTypeAnnotation");
    }
    flowParseTupleType() {
      const s = this.startNode();
      for (s.types = [], this.expect(0); this.state.pos < this.length && !this.match(3) && (s.types.push(this.flowParseType()), !this.match(3)); )
        this.expect(12);
      return this.expect(3), this.finishNode(s, "TupleTypeAnnotation");
    }
    flowParseFunctionTypeParam(s) {
      let n = null, o = !1, f = null;
      const E = this.startNode(), C = this.lookahead(), T = this.state.type === 78;
      return C.type === 14 || C.type === 17 ? (T && !s && this.raise(X.ThisParamMustBeFirst, E), n = this.parseIdentifier(T), this.eat(17) && (o = !0, T && this.raise(X.ThisParamMayNotBeOptional, E)), f = this.flowParseTypeInitialiser()) : f = this.flowParseType(), E.name = n, E.optional = o, E.typeAnnotation = f, this.finishNode(E, "FunctionTypeParam");
    }
    reinterpretTypeAsFunctionTypeParam(s) {
      const n = this.startNodeAt(s.loc.start);
      return n.name = null, n.optional = !1, n.typeAnnotation = s, this.finishNode(n, "FunctionTypeParam");
    }
    flowParseFunctionTypeParams(s = []) {
      let n = null, o = null;
      for (this.match(78) && (o = this.flowParseFunctionTypeParam(!0), o.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); )
        s.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
      return this.eat(21) && (n = this.flowParseFunctionTypeParam(!1)), {
        params: s,
        rest: n,
        _this: o
      };
    }
    flowIdentToTypeAnnotation(s, n, o) {
      switch (o.name) {
        case "any":
          return this.finishNode(n, "AnyTypeAnnotation");
        case "bool":
        case "boolean":
          return this.finishNode(n, "BooleanTypeAnnotation");
        case "mixed":
          return this.finishNode(n, "MixedTypeAnnotation");
        case "empty":
          return this.finishNode(n, "EmptyTypeAnnotation");
        case "number":
          return this.finishNode(n, "NumberTypeAnnotation");
        case "string":
          return this.finishNode(n, "StringTypeAnnotation");
        case "symbol":
          return this.finishNode(n, "SymbolTypeAnnotation");
        default:
          return this.checkNotUnderscore(o.name), this.flowParseGenericType(s, o);
      }
    }
    flowParsePrimaryType() {
      const s = this.state.startLoc, n = this.startNode();
      let o, f, E = !1;
      const C = this.state.noAnonFunctionType;
      switch (this.state.type) {
        case 5:
          return this.flowParseObjectType({
            allowStatic: !1,
            allowExact: !1,
            allowSpread: !0,
            allowProto: !1,
            allowInexact: !0
          });
        case 6:
          return this.flowParseObjectType({
            allowStatic: !1,
            allowExact: !0,
            allowSpread: !0,
            allowProto: !1,
            allowInexact: !1
          });
        case 0:
          return this.state.noAnonFunctionType = !1, f = this.flowParseTupleType(), this.state.noAnonFunctionType = C, f;
        case 47: {
          const T = this.startNode();
          return T.typeParameters = this.flowParseTypeParameterDeclaration(), this.expect(10), o = this.flowParseFunctionTypeParams(), T.params = o.params, T.rest = o.rest, T.this = o._this, this.expect(11), this.expect(19), T.returnType = this.flowParseType(), this.finishNode(T, "FunctionTypeAnnotation");
        }
        case 10: {
          const T = this.startNode();
          if (this.next(), !this.match(11) && !this.match(21))
            if (ae(this.state.type) || this.match(78)) {
              const N = this.lookahead().type;
              E = N !== 17 && N !== 14;
            } else
              E = !0;
          if (E) {
            if (this.state.noAnonFunctionType = !1, f = this.flowParseType(), this.state.noAnonFunctionType = C, this.state.noAnonFunctionType || !(this.match(12) || this.match(11) && this.lookahead().type === 19))
              return this.expect(11), f;
            this.eat(12);
          }
          return f ? o = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(f)]) : o = this.flowParseFunctionTypeParams(), T.params = o.params, T.rest = o.rest, T.this = o._this, this.expect(11), this.expect(19), T.returnType = this.flowParseType(), T.typeParameters = null, this.finishNode(T, "FunctionTypeAnnotation");
        }
        case 134:
          return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
        case 85:
        case 86:
          return n.value = this.match(85), this.next(), this.finishNode(n, "BooleanLiteralTypeAnnotation");
        case 53:
          if (this.state.value === "-") {
            if (this.next(), this.match(135))
              return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", n);
            if (this.match(136))
              return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", n);
            throw this.raise(X.UnexpectedSubtractionOperand, this.state.startLoc);
          }
          throw this.unexpected();
        case 135:
          return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");
        case 136:
          return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");
        case 88:
          return this.next(), this.finishNode(n, "VoidTypeAnnotation");
        case 84:
          return this.next(), this.finishNode(n, "NullLiteralTypeAnnotation");
        case 78:
          return this.next(), this.finishNode(n, "ThisTypeAnnotation");
        case 55:
          return this.next(), this.finishNode(n, "ExistsTypeAnnotation");
        case 87:
          return this.flowParseTypeofType();
        default:
          if (Zr(this.state.type)) {
            const T = Tt(this.state.type);
            return this.next(), super.createIdentifier(n, T);
          } else if (ae(this.state.type))
            return this.isContextual(129) ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(s, n, this.parseIdentifier());
      }
      throw this.unexpected();
    }
    flowParsePostfixType() {
      const s = this.state.startLoc;
      let n = this.flowParsePrimaryType(), o = !1;
      for (; (this.match(0) || this.match(18)) && !this.canInsertSemicolon(); ) {
        const f = this.startNodeAt(s), E = this.eat(18);
        o = o || E, this.expect(0), !E && this.match(3) ? (f.elementType = n, this.next(), n = this.finishNode(f, "ArrayTypeAnnotation")) : (f.objectType = n, f.indexType = this.flowParseType(), this.expect(3), o ? (f.optional = E, n = this.finishNode(f, "OptionalIndexedAccessType")) : n = this.finishNode(f, "IndexedAccessType"));
      }
      return n;
    }
    flowParsePrefixType() {
      const s = this.startNode();
      return this.eat(17) ? (s.typeAnnotation = this.flowParsePrefixType(), this.finishNode(s, "NullableTypeAnnotation")) : this.flowParsePostfixType();
    }
    flowParseAnonFunctionWithoutParens() {
      const s = this.flowParsePrefixType();
      if (!this.state.noAnonFunctionType && this.eat(19)) {
        const n = this.startNodeAt(s.loc.start);
        return n.params = [this.reinterpretTypeAsFunctionTypeParam(s)], n.rest = null, n.this = null, n.returnType = this.flowParseType(), n.typeParameters = null, this.finishNode(n, "FunctionTypeAnnotation");
      }
      return s;
    }
    flowParseIntersectionType() {
      const s = this.startNode();
      this.eat(45);
      const n = this.flowParseAnonFunctionWithoutParens();
      for (s.types = [n]; this.eat(45); )
        s.types.push(this.flowParseAnonFunctionWithoutParens());
      return s.types.length === 1 ? n : this.finishNode(s, "IntersectionTypeAnnotation");
    }
    flowParseUnionType() {
      const s = this.startNode();
      this.eat(43);
      const n = this.flowParseIntersectionType();
      for (s.types = [n]; this.eat(43); )
        s.types.push(this.flowParseIntersectionType());
      return s.types.length === 1 ? n : this.finishNode(s, "UnionTypeAnnotation");
    }
    flowParseType() {
      const s = this.state.inType;
      this.state.inType = !0;
      const n = this.flowParseUnionType();
      return this.state.inType = s, n;
    }
    flowParseTypeOrImplicitInstantiation() {
      if (this.state.type === 132 && this.state.value === "_") {
        const s = this.state.startLoc, n = this.parseIdentifier();
        return this.flowParseGenericType(s, n);
      } else
        return this.flowParseType();
    }
    flowParseTypeAnnotation() {
      const s = this.startNode();
      return s.typeAnnotation = this.flowParseTypeInitialiser(), this.finishNode(s, "TypeAnnotation");
    }
    flowParseTypeAnnotatableIdentifier() {
      const s = this.startNode(), n = this.parseIdentifierName();
      return this.match(14) && (s.typeAnnotation = this.flowParseTypeAnnotation()), this.createIdentifier(s, n);
    }
    typeCastToParameter(s) {
      return s.expression.typeAnnotation = s.typeAnnotation, this.resetEndLocation(s.expression, s.typeAnnotation.loc.end), s.expression;
    }
    flowParseVariance() {
      let s = null;
      return this.match(53) ? (s = this.startNode(), this.state.value === "+" ? s.kind = "plus" : s.kind = "minus", this.next(), this.finishNode(s, "Variance")) : s;
    }
    parseFunctionBody(s, n, o = !1) {
      if (n) {
        this.forwardNoArrowParamsConversionAt(s, () => super.parseFunctionBody(s, !0, o));
        return;
      }
      super.parseFunctionBody(s, !1, o);
    }
    parseFunctionBodyAndFinish(s, n, o = !1) {
      if (this.match(14)) {
        const f = this.startNode();
        [f.typeAnnotation, s.predicate] = this.flowParseTypeAndPredicateInitialiser(), s.returnType = f.typeAnnotation ? this.finishNode(f, "TypeAnnotation") : null;
      }
      return super.parseFunctionBodyAndFinish(s, n, o);
    }
    parseStatementLike(s) {
      if (this.state.strict && this.isContextual(129)) {
        const o = this.lookahead();
        if (Ke(o.type)) {
          const f = this.startNode();
          return this.next(), this.flowParseInterface(f);
        }
      } else if (this.isContextual(126)) {
        const o = this.startNode();
        return this.next(), this.flowParseEnumDeclaration(o);
      }
      const n = super.parseStatementLike(s);
      return this.flowPragma === void 0 && !this.isValidDirective(n) && (this.flowPragma = null), n;
    }
    parseExpressionStatement(s, n, o) {
      if (n.type === "Identifier") {
        if (n.name === "declare") {
          if (this.match(80) || ae(this.state.type) || this.match(68) || this.match(74) || this.match(82))
            return this.flowParseDeclare(s);
        } else if (ae(this.state.type)) {
          if (n.name === "interface")
            return this.flowParseInterface(s);
          if (n.name === "type")
            return this.flowParseTypeAlias(s);
          if (n.name === "opaque")
            return this.flowParseOpaqueType(s, !1);
        }
      }
      return super.parseExpressionStatement(s, n, o);
    }
    shouldParseExportDeclaration() {
      const {
        type: s
      } = this.state;
      return s === 126 || Do(s) ? !this.state.containsEsc : super.shouldParseExportDeclaration();
    }
    isExportDefaultSpecifier() {
      const {
        type: s
      } = this.state;
      return s === 126 || Do(s) ? this.state.containsEsc : super.isExportDefaultSpecifier();
    }
    parseExportDefaultExpression() {
      if (this.isContextual(126)) {
        const s = this.startNode();
        return this.next(), this.flowParseEnumDeclaration(s);
      }
      return super.parseExportDefaultExpression();
    }
    parseConditional(s, n, o) {
      if (!this.match(17)) return s;
      if (this.state.maybeInArrowParameters) {
        const j = this.lookaheadCharCode();
        if (j === 44 || j === 61 || j === 58 || j === 41)
          return this.setOptionalParametersError(o), s;
      }
      this.expect(17);
      const f = this.state.clone(), E = this.state.noArrowAt, C = this.startNodeAt(n);
      let {
        consequent: T,
        failed: N
      } = this.tryParseConditionalConsequent(), [D, V] = this.getArrowLikeExpressions(T);
      if (N || V.length > 0) {
        const j = [...E];
        if (V.length > 0) {
          this.state = f, this.state.noArrowAt = j;
          for (let W = 0; W < V.length; W++)
            j.push(V[W].start);
          ({
            consequent: T,
            failed: N
          } = this.tryParseConditionalConsequent()), [D, V] = this.getArrowLikeExpressions(T);
        }
        N && D.length > 1 && this.raise(X.AmbiguousConditionalArrow, f.startLoc), N && D.length === 1 && (this.state = f, j.push(D[0].start), this.state.noArrowAt = j, {
          consequent: T,
          failed: N
        } = this.tryParseConditionalConsequent());
      }
      return this.getArrowLikeExpressions(T, !0), this.state.noArrowAt = E, this.expect(14), C.test = s, C.consequent = T, C.alternate = this.forwardNoArrowParamsConversionAt(C, () => this.parseMaybeAssign(void 0, void 0)), this.finishNode(C, "ConditionalExpression");
    }
    tryParseConditionalConsequent() {
      this.state.noArrowParamsConversionAt.push(this.state.start);
      const s = this.parseMaybeAssignAllowIn(), n = !this.match(14);
      return this.state.noArrowParamsConversionAt.pop(), {
        consequent: s,
        failed: n
      };
    }
    getArrowLikeExpressions(s, n) {
      const o = [s], f = [];
      for (; o.length !== 0; ) {
        const E = o.pop();
        E.type === "ArrowFunctionExpression" && E.body.type !== "BlockStatement" ? (E.typeParameters || !E.returnType ? this.finishArrowValidation(E) : f.push(E), o.push(E.body)) : E.type === "ConditionalExpression" && (o.push(E.consequent), o.push(E.alternate));
      }
      return n ? (f.forEach((E) => this.finishArrowValidation(E)), [f, []]) : jf(f, (E) => E.params.every((C) => this.isAssignable(C, !0)));
    }
    finishArrowValidation(s) {
      var n;
      this.toAssignableList(s.params, (n = s.extra) == null ? void 0 : n.trailingCommaLoc, !1), this.scope.enter(518), super.checkParams(s, !1, !0), this.scope.exit();
    }
    forwardNoArrowParamsConversionAt(s, n) {
      let o;
      return this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(s.start)) ? (this.state.noArrowParamsConversionAt.push(this.state.start), o = n(), this.state.noArrowParamsConversionAt.pop()) : o = n(), o;
    }
    parseParenItem(s, n) {
      const o = super.parseParenItem(s, n);
      if (this.eat(17) && (o.optional = !0, this.resetEndLocation(s)), this.match(14)) {
        const f = this.startNodeAt(n);
        return f.expression = o, f.typeAnnotation = this.flowParseTypeAnnotation(), this.finishNode(f, "TypeCastExpression");
      }
      return o;
    }
    assertModuleNodeAllowed(s) {
      s.type === "ImportDeclaration" && (s.importKind === "type" || s.importKind === "typeof") || s.type === "ExportNamedDeclaration" && s.exportKind === "type" || s.type === "ExportAllDeclaration" && s.exportKind === "type" || super.assertModuleNodeAllowed(s);
    }
    parseExportDeclaration(s) {
      if (this.isContextual(130)) {
        s.exportKind = "type";
        const n = this.startNode();
        return this.next(), this.match(5) ? (s.specifiers = this.parseExportSpecifiers(!0), super.parseExportFrom(s), null) : this.flowParseTypeAlias(n);
      } else if (this.isContextual(131)) {
        s.exportKind = "type";
        const n = this.startNode();
        return this.next(), this.flowParseOpaqueType(n, !1);
      } else if (this.isContextual(129)) {
        s.exportKind = "type";
        const n = this.startNode();
        return this.next(), this.flowParseInterface(n);
      } else if (this.isContextual(126)) {
        s.exportKind = "value";
        const n = this.startNode();
        return this.next(), this.flowParseEnumDeclaration(n);
      } else
        return super.parseExportDeclaration(s);
    }
    eatExportStar(s) {
      return super.eatExportStar(s) ? !0 : this.isContextual(130) && this.lookahead().type === 55 ? (s.exportKind = "type", this.next(), this.next(), !0) : !1;
    }
    maybeParseExportNamespaceSpecifier(s) {
      const {
        startLoc: n
      } = this.state, o = super.maybeParseExportNamespaceSpecifier(s);
      return o && s.exportKind === "type" && this.unexpected(n), o;
    }
    parseClassId(s, n, o) {
      super.parseClassId(s, n, o), this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration());
    }
    parseClassMember(s, n, o) {
      const {
        startLoc: f
      } = this.state;
      if (this.isContextual(125)) {
        if (super.parseClassMemberFromModifier(s, n))
          return;
        n.declare = !0;
      }
      super.parseClassMember(s, n, o), n.declare && (n.type !== "ClassProperty" && n.type !== "ClassPrivateProperty" && n.type !== "PropertyDefinition" ? this.raise(X.DeclareClassElement, f) : n.value && this.raise(X.DeclareClassFieldInitializer, n.value));
    }
    isIterator(s) {
      return s === "iterator" || s === "asyncIterator";
    }
    readIterator() {
      const s = super.readWord1(), n = "@@" + s;
      (!this.isIterator(s) || !this.state.inType) && this.raise(S.InvalidIdentifier, this.state.curPosition(), {
        identifierName: n
      }), this.finishToken(132, n);
    }
    getTokenFromCode(s) {
      const n = this.input.charCodeAt(this.state.pos + 1);
      s === 123 && n === 124 ? this.finishOp(6, 2) : this.state.inType && (s === 62 || s === 60) ? this.finishOp(s === 62 ? 48 : 47, 1) : this.state.inType && s === 63 ? n === 46 ? this.finishOp(18, 2) : this.finishOp(17, 1) : Lf(s, n, this.input.charCodeAt(this.state.pos + 2)) ? (this.state.pos += 2, this.readIterator()) : super.getTokenFromCode(s);
    }
    isAssignable(s, n) {
      return s.type === "TypeCastExpression" ? this.isAssignable(s.expression, n) : super.isAssignable(s, n);
    }
    toAssignable(s, n = !1) {
      !n && s.type === "AssignmentExpression" && s.left.type === "TypeCastExpression" && (s.left = this.typeCastToParameter(s.left)), super.toAssignable(s, n);
    }
    toAssignableList(s, n, o) {
      for (let f = 0; f < s.length; f++) {
        const E = s[f];
        E?.type === "TypeCastExpression" && (s[f] = this.typeCastToParameter(E));
      }
      super.toAssignableList(s, n, o);
    }
    toReferencedList(s, n) {
      for (let f = 0; f < s.length; f++) {
        var o;
        const E = s[f];
        E && E.type === "TypeCastExpression" && !((o = E.extra) != null && o.parenthesized) && (s.length > 1 || !n) && this.raise(X.TypeCastInPattern, E.typeAnnotation);
      }
      return s;
    }
    parseArrayLike(s, n, o) {
      const f = super.parseArrayLike(s, n, o);
      return o != null && !this.state.maybeInArrowParameters && this.toReferencedList(f.elements), f;
    }
    isValidLVal(s, n, o, f) {
      return s === "TypeCastExpression" || super.isValidLVal(s, n, o, f);
    }
    parseClassProperty(s) {
      return this.match(14) && (s.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassProperty(s);
    }
    parseClassPrivateProperty(s) {
      return this.match(14) && (s.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassPrivateProperty(s);
    }
    isClassMethod() {
      return this.match(47) || super.isClassMethod();
    }
    isClassProperty() {
      return this.match(14) || super.isClassProperty();
    }
    isNonstaticConstructor(s) {
      return !this.match(14) && super.isNonstaticConstructor(s);
    }
    pushClassMethod(s, n, o, f, E, C) {
      if (n.variance && this.unexpected(n.variance.loc.start), delete n.variance, this.match(47) && (n.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassMethod(s, n, o, f, E, C), n.params && E) {
        const T = n.params;
        T.length > 0 && this.isThisParam(T[0]) && this.raise(X.ThisParamBannedInConstructor, n);
      } else if (n.type === "MethodDefinition" && E && n.value.params) {
        const T = n.value.params;
        T.length > 0 && this.isThisParam(T[0]) && this.raise(X.ThisParamBannedInConstructor, n);
      }
    }
    pushClassPrivateMethod(s, n, o, f) {
      n.variance && this.unexpected(n.variance.loc.start), delete n.variance, this.match(47) && (n.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassPrivateMethod(s, n, o, f);
    }
    parseClassSuper(s) {
      if (super.parseClassSuper(s), s.superClass && (this.match(47) || this.match(51)) && (s.superTypeParameters = this.flowParseTypeParameterInstantiationInExpression()), this.isContextual(113)) {
        this.next();
        const n = s.implements = [];
        do {
          const o = this.startNode();
          o.id = this.flowParseRestrictedIdentifier(!0), this.match(47) ? o.typeParameters = this.flowParseTypeParameterInstantiation() : o.typeParameters = null, n.push(this.finishNode(o, "ClassImplements"));
        } while (this.eat(12));
      }
    }
    checkGetterSetterParams(s) {
      super.checkGetterSetterParams(s);
      const n = this.getObjectOrClassMethodParams(s);
      if (n.length > 0) {
        const o = n[0];
        this.isThisParam(o) && s.kind === "get" ? this.raise(X.GetterMayNotHaveThisParam, o) : this.isThisParam(o) && this.raise(X.SetterMayNotHaveThisParam, o);
      }
    }
    parsePropertyNamePrefixOperator(s) {
      s.variance = this.flowParseVariance();
    }
    parseObjPropValue(s, n, o, f, E, C, T) {
      s.variance && this.unexpected(s.variance.loc.start), delete s.variance;
      let N;
      this.match(47) && !C && (N = this.flowParseTypeParameterDeclaration(), this.match(10) || this.unexpected());
      const D = super.parseObjPropValue(s, n, o, f, E, C, T);
      return N && ((D.value || D).typeParameters = N), D;
    }
    parseFunctionParamType(s) {
      return this.eat(17) && (s.type !== "Identifier" && this.raise(X.PatternIsOptional, s), this.isThisParam(s) && this.raise(X.ThisParamMayNotBeOptional, s), s.optional = !0), this.match(14) ? s.typeAnnotation = this.flowParseTypeAnnotation() : this.isThisParam(s) && this.raise(X.ThisParamAnnotationRequired, s), this.match(29) && this.isThisParam(s) && this.raise(X.ThisParamNoDefault, s), this.resetEndLocation(s), s;
    }
    parseMaybeDefault(s, n) {
      const o = super.parseMaybeDefault(s, n);
      return o.type === "AssignmentPattern" && o.typeAnnotation && o.right.start < o.typeAnnotation.start && this.raise(X.TypeBeforeInitializer, o.typeAnnotation), o;
    }
    checkImportReflection(s) {
      super.checkImportReflection(s), s.module && s.importKind !== "value" && this.raise(X.ImportReflectionHasImportType, s.specifiers[0].loc.start);
    }
    parseImportSpecifierLocal(s, n, o) {
      n.local = Vo(s) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier(), s.specifiers.push(this.finishImportSpecifier(n, o));
    }
    isPotentialImportPhase(s) {
      if (super.isPotentialImportPhase(s)) return !0;
      if (this.isContextual(130)) {
        if (!s) return !0;
        const n = this.lookaheadCharCode();
        return n === 123 || n === 42;
      }
      return !s && this.isContextual(87);
    }
    applyImportPhase(s, n, o, f) {
      if (super.applyImportPhase(s, n, o, f), n) {
        if (!o && this.match(65))
          return;
        s.exportKind = o === "type" ? o : "value";
      } else
        o === "type" && this.match(55) && this.unexpected(), s.importKind = o === "type" || o === "typeof" ? o : "value";
    }
    parseImportSpecifier(s, n, o, f, E) {
      const C = s.imported;
      let T = null;
      C.type === "Identifier" && (C.name === "type" ? T = "type" : C.name === "typeof" && (T = "typeof"));
      let N = !1;
      if (this.isContextual(93) && !this.isLookaheadContextual("as")) {
        const V = this.parseIdentifier(!0);
        T !== null && !Ke(this.state.type) ? (s.imported = V, s.importKind = T, s.local = this.cloneIdentifier(V)) : (s.imported = C, s.importKind = null, s.local = this.parseIdentifier());
      } else {
        if (T !== null && Ke(this.state.type))
          s.imported = this.parseIdentifier(!0), s.importKind = T;
        else {
          if (n)
            throw this.raise(S.ImportBindingIsString, s, {
              importName: C.value
            });
          s.imported = C, s.importKind = null;
        }
        this.eatContextual(93) ? s.local = this.parseIdentifier() : (N = !0, s.local = this.cloneIdentifier(s.imported));
      }
      const D = Vo(s);
      return o && D && this.raise(X.ImportTypeShorthandOnlyInPureImport, s), (o || D) && this.checkReservedType(s.local.name, s.local.loc.start, !0), N && !o && !D && this.checkReservedWord(s.local.name, s.loc.start, !0, !0), this.finishImportSpecifier(s, "ImportSpecifier");
    }
    parseBindingAtom() {
      switch (this.state.type) {
        case 78:
          return this.parseIdentifier(!0);
        default:
          return super.parseBindingAtom();
      }
    }
    parseFunctionParams(s, n) {
      const o = s.kind;
      o !== "get" && o !== "set" && this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), super.parseFunctionParams(s, n);
    }
    parseVarId(s, n) {
      super.parseVarId(s, n), this.match(14) && (s.id.typeAnnotation = this.flowParseTypeAnnotation(), this.resetEndLocation(s.id));
    }
    parseAsyncArrowFromCallExpression(s, n) {
      if (this.match(14)) {
        const o = this.state.noAnonFunctionType;
        this.state.noAnonFunctionType = !0, s.returnType = this.flowParseTypeAnnotation(), this.state.noAnonFunctionType = o;
      }
      return super.parseAsyncArrowFromCallExpression(s, n);
    }
    shouldParseAsyncArrow() {
      return this.match(14) || super.shouldParseAsyncArrow();
    }
    parseMaybeAssign(s, n) {
      var o;
      let f = null, E;
      if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
        if (f = this.state.clone(), E = this.tryParse(() => super.parseMaybeAssign(s, n), f), !E.error) return E.node;
        const {
          context: N
        } = this.state, D = N[N.length - 1];
        (D === B.j_oTag || D === B.j_expr) && N.pop();
      }
      if ((o = E) != null && o.error || this.match(47)) {
        var C, T;
        f = f || this.state.clone();
        let N;
        const D = this.tryParse((j) => {
          var W;
          N = this.flowParseTypeParameterDeclaration();
          const H = this.forwardNoArrowParamsConversionAt(N, () => {
            const me = super.parseMaybeAssign(s, n);
            return this.resetStartLocationFromNode(me, N), me;
          });
          (W = H.extra) != null && W.parenthesized && j();
          const re = this.maybeUnwrapTypeCastExpression(H);
          return re.type !== "ArrowFunctionExpression" && j(), re.typeParameters = N, this.resetStartLocationFromNode(re, N), H;
        }, f);
        let V = null;
        if (D.node && this.maybeUnwrapTypeCastExpression(D.node).type === "ArrowFunctionExpression") {
          if (!D.error && !D.aborted)
            return D.node.async && this.raise(X.UnexpectedTypeParameterBeforeAsyncArrowFunction, N), D.node;
          V = D.node;
        }
        if ((C = E) != null && C.node)
          return this.state = E.failState, E.node;
        if (V)
          return this.state = D.failState, V;
        throw (T = E) != null && T.thrown ? E.error : D.thrown ? D.error : this.raise(X.UnexpectedTokenAfterTypeParameter, N);
      }
      return super.parseMaybeAssign(s, n);
    }
    parseArrow(s) {
      if (this.match(14)) {
        const n = this.tryParse(() => {
          const o = this.state.noAnonFunctionType;
          this.state.noAnonFunctionType = !0;
          const f = this.startNode();
          return [f.typeAnnotation, s.predicate] = this.flowParseTypeAndPredicateInitialiser(), this.state.noAnonFunctionType = o, this.canInsertSemicolon() && this.unexpected(), this.match(19) || this.unexpected(), f;
        });
        if (n.thrown) return null;
        n.error && (this.state = n.failState), s.returnType = n.node.typeAnnotation ? this.finishNode(n.node, "TypeAnnotation") : null;
      }
      return super.parseArrow(s);
    }
    shouldParseArrow(s) {
      return this.match(14) || super.shouldParseArrow(s);
    }
    setArrowFunctionParameters(s, n) {
      this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(s.start)) ? s.params = n : super.setArrowFunctionParameters(s, n);
    }
    checkParams(s, n, o, f = !0) {
      if (!(o && this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(s.start)))) {
        for (let E = 0; E < s.params.length; E++)
          this.isThisParam(s.params[E]) && E > 0 && this.raise(X.ThisParamMustBeFirst, s.params[E]);
        super.checkParams(s, n, o, f);
      }
    }
    parseParenAndDistinguishExpression(s) {
      return super.parseParenAndDistinguishExpression(s && !this.state.noArrowAt.includes(this.sourceToOffsetPos(this.state.start)));
    }
    parseSubscripts(s, n, o) {
      if (s.type === "Identifier" && s.name === "async" && this.state.noArrowAt.includes(n.index)) {
        this.next();
        const f = this.startNodeAt(n);
        f.callee = s, f.arguments = super.parseCallExpressionArguments(), s = this.finishNode(f, "CallExpression");
      } else if (s.type === "Identifier" && s.name === "async" && this.match(47)) {
        const f = this.state.clone(), E = this.tryParse((T) => this.parseAsyncArrowWithTypeParameters(n) || T(), f);
        if (!E.error && !E.aborted) return E.node;
        const C = this.tryParse(() => super.parseSubscripts(s, n, o), f);
        if (C.node && !C.error) return C.node;
        if (E.node)
          return this.state = E.failState, E.node;
        if (C.node)
          return this.state = C.failState, C.node;
        throw E.error || C.error;
      }
      return super.parseSubscripts(s, n, o);
    }
    parseSubscript(s, n, o, f) {
      if (this.match(18) && this.isLookaheadToken_lt()) {
        if (f.optionalChainMember = !0, o)
          return f.stop = !0, s;
        this.next();
        const E = this.startNodeAt(n);
        return E.callee = s, E.typeArguments = this.flowParseTypeParameterInstantiationInExpression(), this.expect(10), E.arguments = this.parseCallExpressionArguments(), E.optional = !0, this.finishCallExpression(E, !0);
      } else if (!o && this.shouldParseTypes() && (this.match(47) || this.match(51))) {
        const E = this.startNodeAt(n);
        E.callee = s;
        const C = this.tryParse(() => (E.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(), this.expect(10), E.arguments = super.parseCallExpressionArguments(), f.optionalChainMember && (E.optional = !1), this.finishCallExpression(E, f.optionalChainMember)));
        if (C.node)
          return C.error && (this.state = C.failState), C.node;
      }
      return super.parseSubscript(s, n, o, f);
    }
    parseNewCallee(s) {
      super.parseNewCallee(s);
      let n = null;
      this.shouldParseTypes() && this.match(47) && (n = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node), s.typeArguments = n;
    }
    parseAsyncArrowWithTypeParameters(s) {
      const n = this.startNodeAt(s);
      if (this.parseFunctionParams(n, !1), !!this.parseArrow(n))
        return super.parseArrowExpression(n, void 0, !0);
    }
    readToken_mult_modulo(s) {
      const n = this.input.charCodeAt(this.state.pos + 1);
      if (s === 42 && n === 47 && this.state.hasFlowComment) {
        this.state.hasFlowComment = !1, this.state.pos += 2, this.nextToken();
        return;
      }
      super.readToken_mult_modulo(s);
    }
    readToken_pipe_amp(s) {
      const n = this.input.charCodeAt(this.state.pos + 1);
      if (s === 124 && n === 125) {
        this.finishOp(9, 2);
        return;
      }
      super.readToken_pipe_amp(s);
    }
    parseTopLevel(s, n) {
      const o = super.parseTopLevel(s, n);
      return this.state.hasFlowComment && this.raise(X.UnterminatedFlowComment, this.state.curPosition()), o;
    }
    skipBlockComment() {
      if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
        if (this.state.hasFlowComment)
          throw this.raise(X.NestedFlowComment, this.state.startLoc);
        this.hasFlowCommentCompletion();
        const s = this.skipFlowComment();
        s && (this.state.pos += s, this.state.hasFlowComment = !0);
        return;
      }
      return super.skipBlockComment(this.state.hasFlowComment ? "*-/" : "*/");
    }
    skipFlowComment() {
      const {
        pos: s
      } = this.state;
      let n = 2;
      for (; [32, 9].includes(this.input.charCodeAt(s + n)); )
        n++;
      const o = this.input.charCodeAt(n + s), f = this.input.charCodeAt(n + s + 1);
      return o === 58 && f === 58 ? n + 2 : this.input.slice(n + s, n + s + 12) === "flow-include" ? n + 12 : o === 58 && f !== 58 ? n : !1;
    }
    hasFlowCommentCompletion() {
      if (this.input.indexOf("*/", this.state.pos) === -1)
        throw this.raise(S.UnterminatedComment, this.state.curPosition());
    }
    flowEnumErrorBooleanMemberNotInitialized(s, {
      enumName: n,
      memberName: o
    }) {
      this.raise(X.EnumBooleanMemberNotInitialized, s, {
        memberName: o,
        enumName: n
      });
    }
    flowEnumErrorInvalidMemberInitializer(s, n) {
      return this.raise(n.explicitType ? n.explicitType === "symbol" ? X.EnumInvalidMemberInitializerSymbolType : X.EnumInvalidMemberInitializerPrimaryType : X.EnumInvalidMemberInitializerUnknownType, s, n);
    }
    flowEnumErrorNumberMemberNotInitialized(s, n) {
      this.raise(X.EnumNumberMemberNotInitialized, s, n);
    }
    flowEnumErrorStringMemberInconsistentlyInitialized(s, n) {
      this.raise(X.EnumStringMemberInconsistentlyInitialized, s, n);
    }
    flowEnumMemberInit() {
      const s = this.state.startLoc, n = () => this.match(12) || this.match(8);
      switch (this.state.type) {
        case 135: {
          const o = this.parseNumericLiteral(this.state.value);
          return n() ? {
            type: "number",
            loc: o.loc.start,
            value: o
          } : {
            type: "invalid",
            loc: s
          };
        }
        case 134: {
          const o = this.parseStringLiteral(this.state.value);
          return n() ? {
            type: "string",
            loc: o.loc.start,
            value: o
          } : {
            type: "invalid",
            loc: s
          };
        }
        case 85:
        case 86: {
          const o = this.parseBooleanLiteral(this.match(85));
          return n() ? {
            type: "boolean",
            loc: o.loc.start,
            value: o
          } : {
            type: "invalid",
            loc: s
          };
        }
        default:
          return {
            type: "invalid",
            loc: s
          };
      }
    }
    flowEnumMemberRaw() {
      const s = this.state.startLoc, n = this.parseIdentifier(!0), o = this.eat(29) ? this.flowEnumMemberInit() : {
        type: "none",
        loc: s
      };
      return {
        id: n,
        init: o
      };
    }
    flowEnumCheckExplicitTypeMismatch(s, n, o) {
      const {
        explicitType: f
      } = n;
      f !== null && f !== o && this.flowEnumErrorInvalidMemberInitializer(s, n);
    }
    flowEnumMembers({
      enumName: s,
      explicitType: n
    }) {
      const o = /* @__PURE__ */ new Set(), f = {
        booleanMembers: [],
        numberMembers: [],
        stringMembers: [],
        defaultedMembers: []
      };
      let E = !1;
      for (; !this.match(8); ) {
        if (this.eat(21)) {
          E = !0;
          break;
        }
        const C = this.startNode(), {
          id: T,
          init: N
        } = this.flowEnumMemberRaw(), D = T.name;
        if (D === "")
          continue;
        /^[a-z]/.test(D) && this.raise(X.EnumInvalidMemberName, T, {
          memberName: D,
          suggestion: D[0].toUpperCase() + D.slice(1),
          enumName: s
        }), o.has(D) && this.raise(X.EnumDuplicateMemberName, T, {
          memberName: D,
          enumName: s
        }), o.add(D);
        const V = {
          enumName: s,
          explicitType: n,
          memberName: D
        };
        switch (C.id = T, N.type) {
          case "boolean": {
            this.flowEnumCheckExplicitTypeMismatch(N.loc, V, "boolean"), C.init = N.value, f.booleanMembers.push(this.finishNode(C, "EnumBooleanMember"));
            break;
          }
          case "number": {
            this.flowEnumCheckExplicitTypeMismatch(N.loc, V, "number"), C.init = N.value, f.numberMembers.push(this.finishNode(C, "EnumNumberMember"));
            break;
          }
          case "string": {
            this.flowEnumCheckExplicitTypeMismatch(N.loc, V, "string"), C.init = N.value, f.stringMembers.push(this.finishNode(C, "EnumStringMember"));
            break;
          }
          case "invalid":
            throw this.flowEnumErrorInvalidMemberInitializer(N.loc, V);
          case "none":
            switch (n) {
              case "boolean":
                this.flowEnumErrorBooleanMemberNotInitialized(N.loc, V);
                break;
              case "number":
                this.flowEnumErrorNumberMemberNotInitialized(N.loc, V);
                break;
              default:
                f.defaultedMembers.push(this.finishNode(C, "EnumDefaultedMember"));
            }
        }
        this.match(8) || this.expect(12);
      }
      return {
        members: f,
        hasUnknownMembers: E
      };
    }
    flowEnumStringMembers(s, n, {
      enumName: o
    }) {
      if (s.length === 0)
        return n;
      if (n.length === 0)
        return s;
      if (n.length > s.length) {
        for (const f of s)
          this.flowEnumErrorStringMemberInconsistentlyInitialized(f, {
            enumName: o
          });
        return n;
      } else {
        for (const f of n)
          this.flowEnumErrorStringMemberInconsistentlyInitialized(f, {
            enumName: o
          });
        return s;
      }
    }
    flowEnumParseExplicitType({
      enumName: s
    }) {
      if (!this.eatContextual(102)) return null;
      if (!ae(this.state.type))
        throw this.raise(X.EnumInvalidExplicitTypeUnknownSupplied, this.state.startLoc, {
          enumName: s
        });
      const {
        value: n
      } = this.state;
      return this.next(), n !== "boolean" && n !== "number" && n !== "string" && n !== "symbol" && this.raise(X.EnumInvalidExplicitType, this.state.startLoc, {
        enumName: s,
        invalidEnumType: n
      }), n;
    }
    flowEnumBody(s, n) {
      const o = n.name, f = n.loc.start, E = this.flowEnumParseExplicitType({
        enumName: o
      });
      this.expect(5);
      const {
        members: C,
        hasUnknownMembers: T
      } = this.flowEnumMembers({
        enumName: o,
        explicitType: E
      });
      switch (s.hasUnknownMembers = T, E) {
        case "boolean":
          return s.explicitType = !0, s.members = C.booleanMembers, this.expect(8), this.finishNode(s, "EnumBooleanBody");
        case "number":
          return s.explicitType = !0, s.members = C.numberMembers, this.expect(8), this.finishNode(s, "EnumNumberBody");
        case "string":
          return s.explicitType = !0, s.members = this.flowEnumStringMembers(C.stringMembers, C.defaultedMembers, {
            enumName: o
          }), this.expect(8), this.finishNode(s, "EnumStringBody");
        case "symbol":
          return s.members = C.defaultedMembers, this.expect(8), this.finishNode(s, "EnumSymbolBody");
        default: {
          const N = () => (s.members = [], this.expect(8), this.finishNode(s, "EnumStringBody"));
          s.explicitType = !1;
          const D = C.booleanMembers.length, V = C.numberMembers.length, j = C.stringMembers.length, W = C.defaultedMembers.length;
          if (!D && !V && !j && !W)
            return N();
          if (!D && !V)
            return s.members = this.flowEnumStringMembers(C.stringMembers, C.defaultedMembers, {
              enumName: o
            }), this.expect(8), this.finishNode(s, "EnumStringBody");
          if (!V && !j && D >= W) {
            for (const H of C.defaultedMembers)
              this.flowEnumErrorBooleanMemberNotInitialized(H.loc.start, {
                enumName: o,
                memberName: H.id.name
              });
            return s.members = C.booleanMembers, this.expect(8), this.finishNode(s, "EnumBooleanBody");
          } else if (!D && !j && V >= W) {
            for (const H of C.defaultedMembers)
              this.flowEnumErrorNumberMemberNotInitialized(H.loc.start, {
                enumName: o,
                memberName: H.id.name
              });
            return s.members = C.numberMembers, this.expect(8), this.finishNode(s, "EnumNumberBody");
          } else
            return this.raise(X.EnumInconsistentMemberValues, f, {
              enumName: o
            }), N();
        }
      }
    }
    flowParseEnumDeclaration(s) {
      const n = this.parseIdentifier();
      return s.id = n, s.body = this.flowEnumBody(this.startNode(), n), this.finishNode(s, "EnumDeclaration");
    }
    jsxParseOpeningElementAfterName(s) {
      return this.shouldParseTypes() && (this.match(47) || this.match(51)) && (s.typeArguments = this.flowParseTypeParameterInstantiationInExpression()), super.jsxParseOpeningElementAfterName(s);
    }
    isLookaheadToken_lt() {
      const s = this.nextTokenStart();
      if (this.input.charCodeAt(s) === 60) {
        const n = this.input.charCodeAt(s + 1);
        return n !== 60 && n !== 61;
      }
      return !1;
    }
    reScan_lt_gt() {
      const {
        type: s
      } = this.state;
      s === 47 ? (this.state.pos -= 1, this.readToken_lt()) : s === 48 && (this.state.pos -= 1, this.readToken_gt());
    }
    reScan_lt() {
      const {
        type: s
      } = this.state;
      return s === 51 ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : s;
    }
    maybeUnwrapTypeCastExpression(s) {
      return s.type === "TypeCastExpression" ? s.expression : s;
    }
  };
  const $f = {
    __proto__: null,
    quot: '"',
    amp: "&",
    apos: "'",
    lt: "<",
    gt: ">",
    nbsp: " ",
    iexcl: "¡",
    cent: "¢",
    pound: "£",
    curren: "¤",
    yen: "¥",
    brvbar: "¦",
    sect: "§",
    uml: "¨",
    copy: "©",
    ordf: "ª",
    laquo: "«",
    not: "¬",
    shy: "­",
    reg: "®",
    macr: "¯",
    deg: "°",
    plusmn: "±",
    sup2: "²",
    sup3: "³",
    acute: "´",
    micro: "µ",
    para: "¶",
    middot: "·",
    cedil: "¸",
    sup1: "¹",
    ordm: "º",
    raquo: "»",
    frac14: "¼",
    frac12: "½",
    frac34: "¾",
    iquest: "¿",
    Agrave: "À",
    Aacute: "Á",
    Acirc: "Â",
    Atilde: "Ã",
    Auml: "Ä",
    Aring: "Å",
    AElig: "Æ",
    Ccedil: "Ç",
    Egrave: "È",
    Eacute: "É",
    Ecirc: "Ê",
    Euml: "Ë",
    Igrave: "Ì",
    Iacute: "Í",
    Icirc: "Î",
    Iuml: "Ï",
    ETH: "Ð",
    Ntilde: "Ñ",
    Ograve: "Ò",
    Oacute: "Ó",
    Ocirc: "Ô",
    Otilde: "Õ",
    Ouml: "Ö",
    times: "×",
    Oslash: "Ø",
    Ugrave: "Ù",
    Uacute: "Ú",
    Ucirc: "Û",
    Uuml: "Ü",
    Yacute: "Ý",
    THORN: "Þ",
    szlig: "ß",
    agrave: "à",
    aacute: "á",
    acirc: "â",
    atilde: "ã",
    auml: "ä",
    aring: "å",
    aelig: "æ",
    ccedil: "ç",
    egrave: "è",
    eacute: "é",
    ecirc: "ê",
    euml: "ë",
    igrave: "ì",
    iacute: "í",
    icirc: "î",
    iuml: "ï",
    eth: "ð",
    ntilde: "ñ",
    ograve: "ò",
    oacute: "ó",
    ocirc: "ô",
    otilde: "õ",
    ouml: "ö",
    divide: "÷",
    oslash: "ø",
    ugrave: "ù",
    uacute: "ú",
    ucirc: "û",
    uuml: "ü",
    yacute: "ý",
    thorn: "þ",
    yuml: "ÿ",
    OElig: "Œ",
    oelig: "œ",
    Scaron: "Š",
    scaron: "š",
    Yuml: "Ÿ",
    fnof: "ƒ",
    circ: "ˆ",
    tilde: "˜",
    Alpha: "Α",
    Beta: "Β",
    Gamma: "Γ",
    Delta: "Δ",
    Epsilon: "Ε",
    Zeta: "Ζ",
    Eta: "Η",
    Theta: "Θ",
    Iota: "Ι",
    Kappa: "Κ",
    Lambda: "Λ",
    Mu: "Μ",
    Nu: "Ν",
    Xi: "Ξ",
    Omicron: "Ο",
    Pi: "Π",
    Rho: "Ρ",
    Sigma: "Σ",
    Tau: "Τ",
    Upsilon: "Υ",
    Phi: "Φ",
    Chi: "Χ",
    Psi: "Ψ",
    Omega: "Ω",
    alpha: "α",
    beta: "β",
    gamma: "γ",
    delta: "δ",
    epsilon: "ε",
    zeta: "ζ",
    eta: "η",
    theta: "θ",
    iota: "ι",
    kappa: "κ",
    lambda: "λ",
    mu: "μ",
    nu: "ν",
    xi: "ξ",
    omicron: "ο",
    pi: "π",
    rho: "ρ",
    sigmaf: "ς",
    sigma: "σ",
    tau: "τ",
    upsilon: "υ",
    phi: "φ",
    chi: "χ",
    psi: "ψ",
    omega: "ω",
    thetasym: "ϑ",
    upsih: "ϒ",
    piv: "ϖ",
    ensp: " ",
    emsp: " ",
    thinsp: " ",
    zwnj: "‌",
    zwj: "‍",
    lrm: "‎",
    rlm: "‏",
    ndash: "–",
    mdash: "—",
    lsquo: "‘",
    rsquo: "’",
    sbquo: "‚",
    ldquo: "“",
    rdquo: "”",
    bdquo: "„",
    dagger: "†",
    Dagger: "‡",
    bull: "•",
    hellip: "…",
    permil: "‰",
    prime: "′",
    Prime: "″",
    lsaquo: "‹",
    rsaquo: "›",
    oline: "‾",
    frasl: "⁄",
    euro: "€",
    image: "ℑ",
    weierp: "℘",
    real: "ℜ",
    trade: "™",
    alefsym: "ℵ",
    larr: "←",
    uarr: "↑",
    rarr: "→",
    darr: "↓",
    harr: "↔",
    crarr: "↵",
    lArr: "⇐",
    uArr: "⇑",
    rArr: "⇒",
    dArr: "⇓",
    hArr: "⇔",
    forall: "∀",
    part: "∂",
    exist: "∃",
    empty: "∅",
    nabla: "∇",
    isin: "∈",
    notin: "∉",
    ni: "∋",
    prod: "∏",
    sum: "∑",
    minus: "−",
    lowast: "∗",
    radic: "√",
    prop: "∝",
    infin: "∞",
    ang: "∠",
    and: "∧",
    or: "∨",
    cap: "∩",
    cup: "∪",
    int: "∫",
    there4: "∴",
    sim: "∼",
    cong: "≅",
    asymp: "≈",
    ne: "≠",
    equiv: "≡",
    le: "≤",
    ge: "≥",
    sub: "⊂",
    sup: "⊃",
    nsub: "⊄",
    sube: "⊆",
    supe: "⊇",
    oplus: "⊕",
    otimes: "⊗",
    perp: "⊥",
    sdot: "⋅",
    lceil: "⌈",
    rceil: "⌉",
    lfloor: "⌊",
    rfloor: "⌋",
    lang: "〈",
    rang: "〉",
    loz: "◊",
    spades: "♠",
    clubs: "♣",
    hearts: "♥",
    diams: "♦"
  }, Hf = /\r\n|[\r\n\u2028\u2029]/, yi = new RegExp(Hf.source, "g");
  function ps(x) {
    switch (x) {
      case 10:
      case 13:
      case 8232:
      case 8233:
        return !0;
      default:
        return !1;
    }
  }
  function Go(x, r, s) {
    for (let n = r; n < s; n++)
      if (ps(x.charCodeAt(n)))
        return !0;
    return !1;
  }
  const rn = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, nn = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g;
  function Yf(x) {
    switch (x) {
      case 9:
      case 11:
      case 12:
      case 32:
      case 160:
      case 5760:
      case 8192:
      case 8193:
      case 8194:
      case 8195:
      case 8196:
      case 8197:
      case 8198:
      case 8199:
      case 8200:
      case 8201:
      case 8202:
      case 8239:
      case 8287:
      case 12288:
      case 65279:
        return !0;
      default:
        return !1;
    }
  }
  const Qt = v`jsx`({
    AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression.",
    MissingClosingTagElement: ({
      openingTagName: x
    }) => `Expected corresponding JSX closing tag for <${x}>.`,
    MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.",
    UnexpectedSequenceExpression: "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?",
    UnexpectedToken: ({
      unexpected: x,
      HTMLEntity: r
    }) => `Unexpected token \`${x}\`. Did you mean \`${r}\` or \`{'${x}'}\`?`,
    UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text.",
    UnterminatedJsxContent: "Unterminated JSX contents.",
    UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
  });
  function Pt(x) {
    return x ? x.type === "JSXOpeningFragment" || x.type === "JSXClosingFragment" : !1;
  }
  function fs(x) {
    if (x.type === "JSXIdentifier")
      return x.name;
    if (x.type === "JSXNamespacedName")
      return x.namespace.name + ":" + x.name.name;
    if (x.type === "JSXMemberExpression")
      return fs(x.object) + "." + fs(x.property);
    throw new Error("Node had unexpected type: " + x.type);
  }
  var Jf = (x) => class extends x {
    jsxReadToken() {
      let s = "", n = this.state.pos;
      for (; ; ) {
        if (this.state.pos >= this.length)
          throw this.raise(Qt.UnterminatedJsxContent, this.state.startLoc);
        const o = this.input.charCodeAt(this.state.pos);
        switch (o) {
          case 60:
          case 123:
            if (this.state.pos === this.state.start) {
              o === 60 && this.state.canStartJSXElement ? (++this.state.pos, this.finishToken(143)) : super.getTokenFromCode(o);
              return;
            }
            s += this.input.slice(n, this.state.pos), this.finishToken(142, s);
            return;
          case 38:
            s += this.input.slice(n, this.state.pos), s += this.jsxReadEntity(), n = this.state.pos;
            break;
          case 62:
          case 125:
          default:
            ps(o) ? (s += this.input.slice(n, this.state.pos), s += this.jsxReadNewLine(!0), n = this.state.pos) : ++this.state.pos;
        }
      }
    }
    jsxReadNewLine(s) {
      const n = this.input.charCodeAt(this.state.pos);
      let o;
      return ++this.state.pos, n === 13 && this.input.charCodeAt(this.state.pos) === 10 ? (++this.state.pos, o = s ? `
` : `\r
`) : o = String.fromCharCode(n), ++this.state.curLine, this.state.lineStart = this.state.pos, o;
    }
    jsxReadString(s) {
      let n = "", o = ++this.state.pos;
      for (; ; ) {
        if (this.state.pos >= this.length)
          throw this.raise(S.UnterminatedString, this.state.startLoc);
        const f = this.input.charCodeAt(this.state.pos);
        if (f === s) break;
        f === 38 ? (n += this.input.slice(o, this.state.pos), n += this.jsxReadEntity(), o = this.state.pos) : ps(f) ? (n += this.input.slice(o, this.state.pos), n += this.jsxReadNewLine(!1), o = this.state.pos) : ++this.state.pos;
      }
      n += this.input.slice(o, this.state.pos++), this.finishToken(134, n);
    }
    jsxReadEntity() {
      const s = ++this.state.pos;
      if (this.codePointAtPos(this.state.pos) === 35) {
        ++this.state.pos;
        let n = 10;
        this.codePointAtPos(this.state.pos) === 120 && (n = 16, ++this.state.pos);
        const o = this.readInt(n, void 0, !1, "bail");
        if (o !== null && this.codePointAtPos(this.state.pos) === 59)
          return ++this.state.pos, String.fromCodePoint(o);
      } else {
        let n = 0, o = !1;
        for (; n++ < 10 && this.state.pos < this.length && !(o = this.codePointAtPos(this.state.pos) === 59); )
          ++this.state.pos;
        if (o) {
          const f = this.input.slice(s, this.state.pos), E = $f[f];
          if (++this.state.pos, E)
            return E;
        }
      }
      return this.state.pos = s, "&";
    }
    jsxReadWord() {
      let s;
      const n = this.state.pos;
      do
        s = this.input.charCodeAt(++this.state.pos);
      while (Wt(s) || s === 45);
      this.finishToken(141, this.input.slice(n, this.state.pos));
    }
    jsxParseIdentifier() {
      const s = this.startNode();
      return this.match(141) ? s.name = this.state.value : Zr(this.state.type) ? s.name = Tt(this.state.type) : this.unexpected(), this.next(), this.finishNode(s, "JSXIdentifier");
    }
    jsxParseNamespacedName() {
      const s = this.state.startLoc, n = this.jsxParseIdentifier();
      if (!this.eat(14)) return n;
      const o = this.startNodeAt(s);
      return o.namespace = n, o.name = this.jsxParseIdentifier(), this.finishNode(o, "JSXNamespacedName");
    }
    jsxParseElementName() {
      const s = this.state.startLoc;
      let n = this.jsxParseNamespacedName();
      if (n.type === "JSXNamespacedName")
        return n;
      for (; this.eat(16); ) {
        const o = this.startNodeAt(s);
        o.object = n, o.property = this.jsxParseIdentifier(), n = this.finishNode(o, "JSXMemberExpression");
      }
      return n;
    }
    jsxParseAttributeValue() {
      let s;
      switch (this.state.type) {
        case 5:
          return s = this.startNode(), this.setContext(B.brace), this.next(), s = this.jsxParseExpressionContainer(s, B.j_oTag), s.expression.type === "JSXEmptyExpression" && this.raise(Qt.AttributeIsEmpty, s), s;
        case 143:
        case 134:
          return this.parseExprAtom();
        default:
          throw this.raise(Qt.UnsupportedJsxValue, this.state.startLoc);
      }
    }
    jsxParseEmptyExpression() {
      const s = this.startNodeAt(this.state.lastTokEndLoc);
      return this.finishNodeAt(s, "JSXEmptyExpression", this.state.startLoc);
    }
    jsxParseSpreadChild(s) {
      return this.next(), s.expression = this.parseExpression(), this.setContext(B.j_expr), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(s, "JSXSpreadChild");
    }
    jsxParseExpressionContainer(s, n) {
      if (this.match(8))
        s.expression = this.jsxParseEmptyExpression();
      else {
        const o = this.parseExpression();
        s.expression = o;
      }
      return this.setContext(n), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(s, "JSXExpressionContainer");
    }
    jsxParseAttribute() {
      const s = this.startNode();
      return this.match(5) ? (this.setContext(B.brace), this.next(), this.expect(21), s.argument = this.parseMaybeAssignAllowIn(), this.setContext(B.j_oTag), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(s, "JSXSpreadAttribute")) : (s.name = this.jsxParseNamespacedName(), s.value = this.eat(29) ? this.jsxParseAttributeValue() : null, this.finishNode(s, "JSXAttribute"));
    }
    jsxParseOpeningElementAt(s) {
      const n = this.startNodeAt(s);
      return this.eat(144) ? this.finishNode(n, "JSXOpeningFragment") : (n.name = this.jsxParseElementName(), this.jsxParseOpeningElementAfterName(n));
    }
    jsxParseOpeningElementAfterName(s) {
      const n = [];
      for (; !this.match(56) && !this.match(144); )
        n.push(this.jsxParseAttribute());
      return s.attributes = n, s.selfClosing = this.eat(56), this.expect(144), this.finishNode(s, "JSXOpeningElement");
    }
    jsxParseClosingElementAt(s) {
      const n = this.startNodeAt(s);
      return this.eat(144) ? this.finishNode(n, "JSXClosingFragment") : (n.name = this.jsxParseElementName(), this.expect(144), this.finishNode(n, "JSXClosingElement"));
    }
    jsxParseElementAt(s) {
      const n = this.startNodeAt(s), o = [], f = this.jsxParseOpeningElementAt(s);
      let E = null;
      if (!f.selfClosing) {
        e: for (; ; )
          switch (this.state.type) {
            case 143:
              if (s = this.state.startLoc, this.next(), this.eat(56)) {
                E = this.jsxParseClosingElementAt(s);
                break e;
              }
              o.push(this.jsxParseElementAt(s));
              break;
            case 142:
              o.push(this.parseLiteral(this.state.value, "JSXText"));
              break;
            case 5: {
              const C = this.startNode();
              this.setContext(B.brace), this.next(), this.match(21) ? o.push(this.jsxParseSpreadChild(C)) : o.push(this.jsxParseExpressionContainer(C, B.j_expr));
              break;
            }
            default:
              this.unexpected();
          }
        Pt(f) && !Pt(E) && E !== null ? this.raise(Qt.MissingClosingTagFragment, E) : !Pt(f) && Pt(E) ? this.raise(Qt.MissingClosingTagElement, E, {
          openingTagName: fs(f.name)
        }) : !Pt(f) && !Pt(E) && fs(E.name) !== fs(f.name) && this.raise(Qt.MissingClosingTagElement, E, {
          openingTagName: fs(f.name)
        });
      }
      if (Pt(f) ? (n.openingFragment = f, n.closingFragment = E) : (n.openingElement = f, n.closingElement = E), n.children = o, this.match(47))
        throw this.raise(Qt.UnwrappedAdjacentJSXElements, this.state.startLoc);
      return Pt(f) ? this.finishNode(n, "JSXFragment") : this.finishNode(n, "JSXElement");
    }
    jsxParseElement() {
      const s = this.state.startLoc;
      return this.next(), this.jsxParseElementAt(s);
    }
    setContext(s) {
      const {
        context: n
      } = this.state;
      n[n.length - 1] = s;
    }
    parseExprAtom(s) {
      return this.match(143) ? this.jsxParseElement() : this.match(47) && this.input.charCodeAt(this.state.pos) !== 33 ? (this.replaceToken(143), this.jsxParseElement()) : super.parseExprAtom(s);
    }
    skipSpace() {
      this.curContext().preserveSpace || super.skipSpace();
    }
    getTokenFromCode(s) {
      const n = this.curContext();
      if (n === B.j_expr) {
        this.jsxReadToken();
        return;
      }
      if (n === B.j_oTag || n === B.j_cTag) {
        if (ut(s)) {
          this.jsxReadWord();
          return;
        }
        if (s === 62) {
          ++this.state.pos, this.finishToken(144);
          return;
        }
        if ((s === 34 || s === 39) && n === B.j_oTag) {
          this.jsxReadString(s);
          return;
        }
      }
      if (s === 60 && this.state.canStartJSXElement && this.input.charCodeAt(this.state.pos + 1) !== 33) {
        ++this.state.pos, this.finishToken(143);
        return;
      }
      super.getTokenFromCode(s);
    }
    updateContext(s) {
      const {
        context: n,
        type: o
      } = this.state;
      if (o === 56 && s === 143)
        n.splice(-2, 2, B.j_cTag), this.state.canStartJSXElement = !1;
      else if (o === 143)
        n.push(B.j_oTag);
      else if (o === 144) {
        const f = n[n.length - 1];
        f === B.j_oTag && s === 56 || f === B.j_cTag ? (n.pop(), this.state.canStartJSXElement = n[n.length - 1] === B.j_expr) : (this.setContext(B.j_expr), this.state.canStartJSXElement = !0);
      } else
        this.state.canStartJSXElement = Sf(o);
    }
  };
  class Xf extends tn {
    constructor(...r) {
      super(...r), this.tsNames = /* @__PURE__ */ new Map();
    }
  }
  class Zf extends sn {
    constructor(...r) {
      super(...r), this.importsStack = [];
    }
    createScope(r) {
      return this.importsStack.push(/* @__PURE__ */ new Set()), new Xf(r);
    }
    enter(r) {
      r === 1024 && this.importsStack.push(/* @__PURE__ */ new Set()), super.enter(r);
    }
    exit() {
      const r = super.exit();
      return r === 1024 && this.importsStack.pop(), r;
    }
    hasImport(r, s) {
      const n = this.importsStack.length;
      if (this.importsStack[n - 1].has(r))
        return !0;
      if (!s && n > 1) {
        for (let o = 0; o < n - 1; o++)
          if (this.importsStack[o].has(r)) return !0;
      }
      return !1;
    }
    declareName(r, s, n) {
      if (s & 4096) {
        this.hasImport(r, !0) && this.parser.raise(S.VarRedeclaration, n, {
          identifierName: r
        }), this.importsStack[this.importsStack.length - 1].add(r);
        return;
      }
      const o = this.currentScope();
      let f = o.tsNames.get(r) || 0;
      if (s & 1024) {
        this.maybeExportDefined(o, r), o.tsNames.set(r, f | 16);
        return;
      }
      super.declareName(r, s, n), s & 2 && (s & 1 || (this.checkRedeclarationInScope(o, r, s, n), this.maybeExportDefined(o, r)), f = f | 1), s & 256 && (f = f | 2), s & 512 && (f = f | 4), s & 128 && (f = f | 8), f && o.tsNames.set(r, f);
    }
    isRedeclaredInScope(r, s, n) {
      const o = r.tsNames.get(s);
      if ((o & 2) > 0) {
        if (n & 256) {
          const f = !!(n & 512), E = (o & 4) > 0;
          return f !== E;
        }
        return !0;
      }
      return n & 128 && (o & 8) > 0 ? r.names.get(s) & 2 ? !!(n & 1) : !1 : n & 2 && (o & 1) > 0 ? !0 : super.isRedeclaredInScope(r, s, n);
    }
    checkLocalExport(r) {
      const {
        name: s
      } = r;
      if (this.hasImport(s)) return;
      const n = this.scopeStack.length;
      for (let o = n - 1; o >= 0; o--) {
        const E = this.scopeStack[o].tsNames.get(s);
        if ((E & 1) > 0 || (E & 16) > 0)
          return;
      }
      super.checkLocalExport(r);
    }
  }
  class qf {
    constructor() {
      this.stacks = [];
    }
    enter(r) {
      this.stacks.push(r);
    }
    exit() {
      this.stacks.pop();
    }
    currentFlags() {
      return this.stacks[this.stacks.length - 1];
    }
    get hasAwait() {
      return (this.currentFlags() & 2) > 0;
    }
    get hasYield() {
      return (this.currentFlags() & 1) > 0;
    }
    get hasReturn() {
      return (this.currentFlags() & 4) > 0;
    }
    get hasIn() {
      return (this.currentFlags() & 8) > 0;
    }
  }
  function Si(x, r) {
    return (x ? 2 : 0) | (r ? 1 : 0);
  }
  class zf {
    constructor() {
      this.sawUnambiguousESM = !1, this.ambiguousScriptDifferentAst = !1;
    }
    sourceToOffsetPos(r) {
      return r + this.startIndex;
    }
    offsetToSourcePos(r) {
      return r - this.startIndex;
    }
    hasPlugin(r) {
      if (typeof r == "string")
        return this.plugins.has(r);
      {
        const [s, n] = r;
        if (!this.hasPlugin(s))
          return !1;
        const o = this.plugins.get(s);
        for (const f of Object.keys(n))
          if (o?.[f] !== n[f])
            return !1;
        return !0;
      }
    }
    getPluginOption(r, s) {
      var n;
      return (n = this.plugins.get(r)) == null ? void 0 : n[s];
    }
  }
  function Ko(x, r) {
    x.trailingComments === void 0 ? x.trailingComments = r : x.trailingComments.unshift(...r);
  }
  function ed(x, r) {
    x.leadingComments === void 0 ? x.leadingComments = r : x.leadingComments.unshift(...r);
  }
  function Gs(x, r) {
    x.innerComments === void 0 ? x.innerComments = r : x.innerComments.unshift(...r);
  }
  function ct(x, r, s) {
    let n = null, o = r.length;
    for (; n === null && o > 0; )
      n = r[--o];
    n === null || n.start > s.start ? Gs(x, s.comments) : Ko(n, s.comments);
  }
  class td extends zf {
    addComment(r) {
      this.filename && (r.loc.filename = this.filename);
      const {
        commentsLen: s
      } = this.state;
      this.comments.length !== s && (this.comments.length = s), this.comments.push(r), this.state.commentsLen++;
    }
    processComment(r) {
      const {
        commentStack: s
      } = this.state, n = s.length;
      if (n === 0) return;
      let o = n - 1;
      const f = s[o];
      f.start === r.end && (f.leadingNode = r, o--);
      const {
        start: E
      } = r;
      for (; o >= 0; o--) {
        const C = s[o], T = C.end;
        if (T > E)
          C.containingNode = r, this.finalizeComment(C), s.splice(o, 1);
        else {
          T === E && (C.trailingNode = r);
          break;
        }
      }
    }
    finalizeComment(r) {
      var s;
      const {
        comments: n
      } = r;
      if (r.leadingNode !== null || r.trailingNode !== null)
        r.leadingNode !== null && Ko(r.leadingNode, n), r.trailingNode !== null && ed(r.trailingNode, n);
      else {
        const o = r.containingNode, f = r.start;
        if (this.input.charCodeAt(this.offsetToSourcePos(f) - 1) === 44)
          switch (o.type) {
            case "ObjectExpression":
            case "ObjectPattern":
              ct(o, o.properties, r);
              break;
            case "CallExpression":
            case "NewExpression":
            case "OptionalCallExpression":
              ct(o, o.arguments, r);
              break;
            case "ImportExpression":
              ct(o, [o.source, (s = o.options) != null ? s : null], r);
              break;
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
            case "ObjectMethod":
            case "ClassMethod":
            case "ClassPrivateMethod":
            case "TSTypeParameterDeclaration":
              ct(o, o.params, r);
              break;
            case "ArrayExpression":
            case "ArrayPattern":
              ct(o, o.elements, r);
              break;
            case "ExportNamedDeclaration":
            case "ImportDeclaration":
              ct(o, o.specifiers, r);
              break;
            case "TSEnumDeclaration":
              ct(o, o.members, r);
              break;
            case "TSEnumBody":
              ct(o, o.members, r);
              break;
            case "TSInterfaceBody":
              ct(o, o.body, r);
              break;
            default: {
              if (o.type === "RecordExpression") {
                ct(o, o.properties, r);
                break;
              }
              if (o.type === "TupleExpression") {
                ct(o, o.elements, r);
                break;
              }
              Gs(o, n);
            }
          }
        else
          Gs(o, n);
      }
    }
    finalizeRemainingComments() {
      const {
        commentStack: r
      } = this.state;
      for (let s = r.length - 1; s >= 0; s--)
        this.finalizeComment(r[s]);
      this.state.commentStack = [];
    }
    resetPreviousNodeTrailingComments(r) {
      const {
        commentStack: s
      } = this.state, {
        length: n
      } = s;
      if (n === 0) return;
      const o = s[n - 1];
      o.leadingNode === r && (o.leadingNode = null);
    }
    takeSurroundingComments(r, s, n) {
      const {
        commentStack: o
      } = this.state, f = o.length;
      if (f === 0) return;
      let E = f - 1;
      for (; E >= 0; E--) {
        const C = o[E], T = C.end;
        if (C.start === n)
          C.leadingNode = r;
        else if (T === s)
          C.trailingNode = r;
        else if (T < s)
          break;
      }
    }
  }
  class an {
    constructor() {
      this.flags = 1024, this.startIndex = void 0, this.curLine = void 0, this.lineStart = void 0, this.startLoc = void 0, this.endLoc = void 0, this.errors = [], this.potentialArrowAt = -1, this.noArrowAt = [], this.noArrowParamsConversionAt = [], this.topicContext = {
        maxNumOfResolvableTopics: 0,
        maxTopicIndex: null
      }, this.labels = [], this.commentsLen = 0, this.commentStack = [], this.pos = 0, this.type = 140, this.value = null, this.start = 0, this.end = 0, this.lastTokEndLoc = null, this.lastTokStartLoc = null, this.context = [B.brace], this.firstInvalidTemplateEscapePos = null, this.strictErrors = /* @__PURE__ */ new Map(), this.tokensLength = 0;
    }
    get strict() {
      return (this.flags & 1) > 0;
    }
    set strict(r) {
      r ? this.flags |= 1 : this.flags &= -2;
    }
    init({
      strictMode: r,
      sourceType: s,
      startIndex: n,
      startLine: o,
      startColumn: f
    }) {
      this.strict = r === !1 ? !1 : r === !0 ? !0 : s === "module", this.startIndex = n, this.curLine = o, this.lineStart = -f, this.startLoc = this.endLoc = new t(o, f, n);
    }
    get maybeInArrowParameters() {
      return (this.flags & 2) > 0;
    }
    set maybeInArrowParameters(r) {
      r ? this.flags |= 2 : this.flags &= -3;
    }
    get inType() {
      return (this.flags & 4) > 0;
    }
    set inType(r) {
      r ? this.flags |= 4 : this.flags &= -5;
    }
    get noAnonFunctionType() {
      return (this.flags & 8) > 0;
    }
    set noAnonFunctionType(r) {
      r ? this.flags |= 8 : this.flags &= -9;
    }
    get hasFlowComment() {
      return (this.flags & 16) > 0;
    }
    set hasFlowComment(r) {
      r ? this.flags |= 16 : this.flags &= -17;
    }
    get isAmbientContext() {
      return (this.flags & 32) > 0;
    }
    set isAmbientContext(r) {
      r ? this.flags |= 32 : this.flags &= -33;
    }
    get inAbstractClass() {
      return (this.flags & 64) > 0;
    }
    set inAbstractClass(r) {
      r ? this.flags |= 64 : this.flags &= -65;
    }
    get inDisallowConditionalTypesContext() {
      return (this.flags & 128) > 0;
    }
    set inDisallowConditionalTypesContext(r) {
      r ? this.flags |= 128 : this.flags &= -129;
    }
    get soloAwait() {
      return (this.flags & 256) > 0;
    }
    set soloAwait(r) {
      r ? this.flags |= 256 : this.flags &= -257;
    }
    get inFSharpPipelineDirectBody() {
      return (this.flags & 512) > 0;
    }
    set inFSharpPipelineDirectBody(r) {
      r ? this.flags |= 512 : this.flags &= -513;
    }
    get canStartJSXElement() {
      return (this.flags & 1024) > 0;
    }
    set canStartJSXElement(r) {
      r ? this.flags |= 1024 : this.flags &= -1025;
    }
    get containsEsc() {
      return (this.flags & 2048) > 0;
    }
    set containsEsc(r) {
      r ? this.flags |= 2048 : this.flags &= -2049;
    }
    get hasTopLevelAwait() {
      return (this.flags & 4096) > 0;
    }
    set hasTopLevelAwait(r) {
      r ? this.flags |= 4096 : this.flags &= -4097;
    }
    curPosition() {
      return new t(this.curLine, this.pos - this.lineStart, this.pos + this.startIndex);
    }
    clone() {
      const r = new an();
      return r.flags = this.flags, r.startIndex = this.startIndex, r.curLine = this.curLine, r.lineStart = this.lineStart, r.startLoc = this.startLoc, r.endLoc = this.endLoc, r.errors = this.errors.slice(), r.potentialArrowAt = this.potentialArrowAt, r.noArrowAt = this.noArrowAt.slice(), r.noArrowParamsConversionAt = this.noArrowParamsConversionAt.slice(), r.topicContext = this.topicContext, r.labels = this.labels.slice(), r.commentsLen = this.commentsLen, r.commentStack = this.commentStack.slice(), r.pos = this.pos, r.type = this.type, r.value = this.value, r.start = this.start, r.end = this.end, r.lastTokEndLoc = this.lastTokEndLoc, r.lastTokStartLoc = this.lastTokStartLoc, r.context = this.context.slice(), r.firstInvalidTemplateEscapePos = this.firstInvalidTemplateEscapePos, r.strictErrors = this.strictErrors, r.tokensLength = this.tokensLength, r;
    }
  }
  var sd = function(r) {
    return r >= 48 && r <= 57;
  };
  const jo = {
    decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]),
    hex: /* @__PURE__ */ new Set([46, 88, 95, 120])
  }, xi = {
    bin: (x) => x === 48 || x === 49,
    oct: (x) => x >= 48 && x <= 55,
    dec: (x) => x >= 48 && x <= 57,
    hex: (x) => x >= 48 && x <= 57 || x >= 65 && x <= 70 || x >= 97 && x <= 102
  };
  function Wo(x, r, s, n, o, f) {
    const E = s, C = n, T = o;
    let N = "", D = null, V = s;
    const {
      length: j
    } = r;
    for (; ; ) {
      if (s >= j) {
        f.unterminated(E, C, T), N += r.slice(V, s);
        break;
      }
      const W = r.charCodeAt(s);
      if (id(x, W, r, s)) {
        N += r.slice(V, s);
        break;
      }
      if (W === 92) {
        N += r.slice(V, s);
        const H = rd(r, s, n, o, x === "template", f);
        H.ch === null && !D ? D = {
          pos: s,
          lineStart: n,
          curLine: o
        } : N += H.ch, {
          pos: s,
          lineStart: n,
          curLine: o
        } = H, V = s;
      } else W === 8232 || W === 8233 ? (++s, ++o, n = s) : W === 10 || W === 13 ? x === "template" ? (N += r.slice(V, s) + `
`, ++s, W === 13 && r.charCodeAt(s) === 10 && ++s, ++o, V = n = s) : f.unterminated(E, C, T) : ++s;
    }
    return {
      pos: s,
      str: N,
      firstInvalidLoc: D,
      lineStart: n,
      curLine: o,
      containsInvalid: !!D
    };
  }
  function id(x, r, s, n) {
    return x === "template" ? r === 96 || r === 36 && s.charCodeAt(n + 1) === 123 : r === (x === "double" ? 34 : 39);
  }
  function rd(x, r, s, n, o, f) {
    const E = !o;
    r++;
    const C = (N) => ({
      pos: r,
      ch: N,
      lineStart: s,
      curLine: n
    }), T = x.charCodeAt(r++);
    switch (T) {
      case 110:
        return C(`
`);
      case 114:
        return C("\r");
      case 120: {
        let N;
        return {
          code: N,
          pos: r
        } = on(x, r, s, n, 2, !1, E, f), C(N === null ? null : String.fromCharCode(N));
      }
      case 117: {
        let N;
        return {
          code: N,
          pos: r
        } = $o(x, r, s, n, E, f), C(N === null ? null : String.fromCodePoint(N));
      }
      case 116:
        return C("	");
      case 98:
        return C("\b");
      case 118:
        return C("\v");
      case 102:
        return C("\f");
      case 13:
        x.charCodeAt(r) === 10 && ++r;
      case 10:
        s = r, ++n;
      case 8232:
      case 8233:
        return C("");
      case 56:
      case 57:
        if (o)
          return C(null);
        f.strictNumericEscape(r - 1, s, n);
      default:
        if (T >= 48 && T <= 55) {
          const N = r - 1;
          let V = /^[0-7]+/.exec(x.slice(N, r + 2))[0], j = parseInt(V, 8);
          j > 255 && (V = V.slice(0, -1), j = parseInt(V, 8)), r += V.length - 1;
          const W = x.charCodeAt(r);
          if (V !== "0" || W === 56 || W === 57) {
            if (o)
              return C(null);
            f.strictNumericEscape(N, s, n);
          }
          return C(String.fromCharCode(j));
        }
        return C(String.fromCharCode(T));
    }
  }
  function on(x, r, s, n, o, f, E, C) {
    const T = r;
    let N;
    return {
      n: N,
      pos: r
    } = Qo(x, r, s, n, 16, o, f, !1, C, !E), N === null && (E ? C.invalidEscapeSequence(T, s, n) : r = T - 1), {
      code: N,
      pos: r
    };
  }
  function Qo(x, r, s, n, o, f, E, C, T, N) {
    const D = r, V = o === 16 ? jo.hex : jo.decBinOct, j = o === 16 ? xi.hex : o === 10 ? xi.dec : o === 8 ? xi.oct : xi.bin;
    let W = !1, H = 0;
    for (let re = 0, me = f ?? 1 / 0; re < me; ++re) {
      const te = x.charCodeAt(r);
      let fe;
      if (te === 95 && C !== "bail") {
        const $t = x.charCodeAt(r - 1), kt = x.charCodeAt(r + 1);
        if (C) {
          if (Number.isNaN(kt) || !j(kt) || V.has($t) || V.has(kt)) {
            if (N) return {
              n: null,
              pos: r
            };
            T.unexpectedNumericSeparator(r, s, n);
          }
        } else {
          if (N) return {
            n: null,
            pos: r
          };
          T.numericSeparatorInEscapeSequence(r, s, n);
        }
        ++r;
        continue;
      }
      if (te >= 97 ? fe = te - 97 + 10 : te >= 65 ? fe = te - 65 + 10 : sd(te) ? fe = te - 48 : fe = 1 / 0, fe >= o) {
        if (fe <= 9 && N)
          return {
            n: null,
            pos: r
          };
        if (fe <= 9 && T.invalidDigit(r, s, n, o))
          fe = 0;
        else if (E)
          fe = 0, W = !0;
        else
          break;
      }
      ++r, H = H * o + fe;
    }
    return r === D || f != null && r - D !== f || W ? {
      n: null,
      pos: r
    } : {
      n: H,
      pos: r
    };
  }
  function $o(x, r, s, n, o, f) {
    const E = x.charCodeAt(r);
    let C;
    if (E === 123) {
      if (++r, {
        code: C,
        pos: r
      } = on(x, r, s, n, x.indexOf("}", r) - r, !0, o, f), ++r, C !== null && C > 1114111)
        if (o)
          f.invalidCodePoint(r, s, n);
        else
          return {
            code: null,
            pos: r
          };
    } else
      ({
        code: C,
        pos: r
      } = on(x, r, s, n, 4, !1, o, f));
    return {
      code: C,
      pos: r
    };
  }
  function Ks(x, r, s) {
    return new t(s, x - r, x);
  }
  const nd = /* @__PURE__ */ new Set([103, 109, 115, 105, 121, 117, 100, 118]);
  class Nt {
    constructor(r) {
      const s = r.startIndex || 0;
      this.type = r.type, this.value = r.value, this.start = s + r.start, this.end = s + r.end, this.loc = new i(r.startLoc, r.endLoc);
    }
  }
  class ad extends td {
    constructor(r, s) {
      super(), this.isLookahead = void 0, this.tokens = [], this.errorHandlers_readInt = {
        invalidDigit: (n, o, f, E) => this.optionFlags & 2048 ? (this.raise(S.InvalidDigit, Ks(n, o, f), {
          radix: E
        }), !0) : !1,
        numericSeparatorInEscapeSequence: this.errorBuilder(S.NumericSeparatorInEscapeSequence),
        unexpectedNumericSeparator: this.errorBuilder(S.UnexpectedNumericSeparator)
      }, this.errorHandlers_readCodePoint = Object.assign({}, this.errorHandlers_readInt, {
        invalidEscapeSequence: this.errorBuilder(S.InvalidEscapeSequence),
        invalidCodePoint: this.errorBuilder(S.InvalidCodePoint)
      }), this.errorHandlers_readStringContents_string = Object.assign({}, this.errorHandlers_readCodePoint, {
        strictNumericEscape: (n, o, f) => {
          this.recordStrictModeErrors(S.StrictNumericEscape, Ks(n, o, f));
        },
        unterminated: (n, o, f) => {
          throw this.raise(S.UnterminatedString, Ks(n - 1, o, f));
        }
      }), this.errorHandlers_readStringContents_template = Object.assign({}, this.errorHandlers_readCodePoint, {
        strictNumericEscape: this.errorBuilder(S.StrictNumericEscape),
        unterminated: (n, o, f) => {
          throw this.raise(S.UnterminatedTemplate, Ks(n, o, f));
        }
      }), this.state = new an(), this.state.init(r), this.input = s, this.length = s.length, this.comments = [], this.isLookahead = !1;
    }
    pushToken(r) {
      this.tokens.length = this.state.tokensLength, this.tokens.push(r), ++this.state.tokensLength;
    }
    next() {
      this.checkKeywordEscapes(), this.optionFlags & 256 && this.pushToken(new Nt(this.state)), this.state.lastTokEndLoc = this.state.endLoc, this.state.lastTokStartLoc = this.state.startLoc, this.nextToken();
    }
    eat(r) {
      return this.match(r) ? (this.next(), !0) : !1;
    }
    match(r) {
      return this.state.type === r;
    }
    createLookaheadState(r) {
      return {
        pos: r.pos,
        value: null,
        type: r.type,
        start: r.start,
        end: r.end,
        context: [this.curContext()],
        inType: r.inType,
        startLoc: r.startLoc,
        lastTokEndLoc: r.lastTokEndLoc,
        curLine: r.curLine,
        lineStart: r.lineStart,
        curPosition: r.curPosition
      };
    }
    lookahead() {
      const r = this.state;
      this.state = this.createLookaheadState(r), this.isLookahead = !0, this.nextToken(), this.isLookahead = !1;
      const s = this.state;
      return this.state = r, s;
    }
    nextTokenStart() {
      return this.nextTokenStartSince(this.state.pos);
    }
    nextTokenStartSince(r) {
      return rn.lastIndex = r, rn.test(this.input) ? rn.lastIndex : r;
    }
    lookaheadCharCode() {
      return this.lookaheadCharCodeSince(this.state.pos);
    }
    lookaheadCharCodeSince(r) {
      return this.input.charCodeAt(this.nextTokenStartSince(r));
    }
    nextTokenInLineStart() {
      return this.nextTokenInLineStartSince(this.state.pos);
    }
    nextTokenInLineStartSince(r) {
      return nn.lastIndex = r, nn.test(this.input) ? nn.lastIndex : r;
    }
    lookaheadInLineCharCode() {
      return this.input.charCodeAt(this.nextTokenInLineStart());
    }
    codePointAtPos(r) {
      let s = this.input.charCodeAt(r);
      if ((s & 64512) === 55296 && ++r < this.input.length) {
        const n = this.input.charCodeAt(r);
        (n & 64512) === 56320 && (s = 65536 + ((s & 1023) << 10) + (n & 1023));
      }
      return s;
    }
    setStrict(r) {
      this.state.strict = r, r && (this.state.strictErrors.forEach(([s, n]) => this.raise(s, n)), this.state.strictErrors.clear());
    }
    curContext() {
      return this.state.context[this.state.context.length - 1];
    }
    nextToken() {
      if (this.skipSpace(), this.state.start = this.state.pos, this.isLookahead || (this.state.startLoc = this.state.curPosition()), this.state.pos >= this.length) {
        this.finishToken(140);
        return;
      }
      this.getTokenFromCode(this.codePointAtPos(this.state.pos));
    }
    skipBlockComment(r) {
      let s;
      this.isLookahead || (s = this.state.curPosition());
      const n = this.state.pos, o = this.input.indexOf(r, n + 2);
      if (o === -1)
        throw this.raise(S.UnterminatedComment, this.state.curPosition());
      for (this.state.pos = o + r.length, yi.lastIndex = n + 2; yi.test(this.input) && yi.lastIndex <= o; )
        ++this.state.curLine, this.state.lineStart = yi.lastIndex;
      if (this.isLookahead) return;
      const f = {
        type: "CommentBlock",
        value: this.input.slice(n + 2, o),
        start: this.sourceToOffsetPos(n),
        end: this.sourceToOffsetPos(o + r.length),
        loc: new i(s, this.state.curPosition())
      };
      return this.optionFlags & 256 && this.pushToken(f), f;
    }
    skipLineComment(r) {
      const s = this.state.pos;
      let n;
      this.isLookahead || (n = this.state.curPosition());
      let o = this.input.charCodeAt(this.state.pos += r);
      if (this.state.pos < this.length)
        for (; !ps(o) && ++this.state.pos < this.length; )
          o = this.input.charCodeAt(this.state.pos);
      if (this.isLookahead) return;
      const f = this.state.pos, C = {
        type: "CommentLine",
        value: this.input.slice(s + r, f),
        start: this.sourceToOffsetPos(s),
        end: this.sourceToOffsetPos(f),
        loc: new i(n, this.state.curPosition())
      };
      return this.optionFlags & 256 && this.pushToken(C), C;
    }
    skipSpace() {
      const r = this.state.pos, s = this.optionFlags & 4096 ? [] : null;
      e: for (; this.state.pos < this.length; ) {
        const n = this.input.charCodeAt(this.state.pos);
        switch (n) {
          case 32:
          case 160:
          case 9:
            ++this.state.pos;
            break;
          case 13:
            this.input.charCodeAt(this.state.pos + 1) === 10 && ++this.state.pos;
          case 10:
          case 8232:
          case 8233:
            ++this.state.pos, ++this.state.curLine, this.state.lineStart = this.state.pos;
            break;
          case 47:
            switch (this.input.charCodeAt(this.state.pos + 1)) {
              case 42: {
                const o = this.skipBlockComment("*/");
                o !== void 0 && (this.addComment(o), s?.push(o));
                break;
              }
              case 47: {
                const o = this.skipLineComment(2);
                o !== void 0 && (this.addComment(o), s?.push(o));
                break;
              }
              default:
                break e;
            }
            break;
          default:
            if (Yf(n))
              ++this.state.pos;
            else if (n === 45 && !this.inModule && this.optionFlags & 8192) {
              const o = this.state.pos;
              if (this.input.charCodeAt(o + 1) === 45 && this.input.charCodeAt(o + 2) === 62 && (r === 0 || this.state.lineStart > r)) {
                const f = this.skipLineComment(3);
                f !== void 0 && (this.addComment(f), s?.push(f));
              } else
                break e;
            } else if (n === 60 && !this.inModule && this.optionFlags & 8192) {
              const o = this.state.pos;
              if (this.input.charCodeAt(o + 1) === 33 && this.input.charCodeAt(o + 2) === 45 && this.input.charCodeAt(o + 3) === 45) {
                const f = this.skipLineComment(4);
                f !== void 0 && (this.addComment(f), s?.push(f));
              } else
                break e;
            } else
              break e;
        }
      }
      if (s?.length > 0) {
        const n = this.state.pos, o = {
          start: this.sourceToOffsetPos(r),
          end: this.sourceToOffsetPos(n),
          comments: s,
          leadingNode: null,
          trailingNode: null,
          containingNode: null
        };
        this.state.commentStack.push(o);
      }
    }
    finishToken(r, s) {
      this.state.end = this.state.pos, this.state.endLoc = this.state.curPosition();
      const n = this.state.type;
      this.state.type = r, this.state.value = s, this.isLookahead || this.updateContext(n);
    }
    replaceToken(r) {
      this.state.type = r, this.updateContext();
    }
    readToken_numberSign() {
      if (this.state.pos === 0 && this.readToken_interpreter())
        return;
      const r = this.state.pos + 1, s = this.codePointAtPos(r);
      if (s >= 48 && s <= 57)
        throw this.raise(S.UnexpectedDigitAfterHash, this.state.curPosition());
      if (s === 123 || s === 91 && this.hasPlugin("recordAndTuple")) {
        if (this.expectPlugin("recordAndTuple"), this.getPluginOption("recordAndTuple", "syntaxType") === "bar")
          throw this.raise(s === 123 ? S.RecordExpressionHashIncorrectStartSyntaxType : S.TupleExpressionHashIncorrectStartSyntaxType, this.state.curPosition());
        this.state.pos += 2, s === 123 ? this.finishToken(7) : this.finishToken(1);
      } else ut(s) ? (++this.state.pos, this.finishToken(139, this.readWord1(s))) : s === 92 ? (++this.state.pos, this.finishToken(139, this.readWord1())) : this.finishOp(27, 1);
    }
    readToken_dot() {
      const r = this.input.charCodeAt(this.state.pos + 1);
      if (r >= 48 && r <= 57) {
        this.readNumber(!0);
        return;
      }
      r === 46 && this.input.charCodeAt(this.state.pos + 2) === 46 ? (this.state.pos += 3, this.finishToken(21)) : (++this.state.pos, this.finishToken(16));
    }
    readToken_slash() {
      this.input.charCodeAt(this.state.pos + 1) === 61 ? this.finishOp(31, 2) : this.finishOp(56, 1);
    }
    readToken_interpreter() {
      if (this.state.pos !== 0 || this.length < 2) return !1;
      let r = this.input.charCodeAt(this.state.pos + 1);
      if (r !== 33) return !1;
      const s = this.state.pos;
      for (this.state.pos += 1; !ps(r) && ++this.state.pos < this.length; )
        r = this.input.charCodeAt(this.state.pos);
      const n = this.input.slice(s + 2, this.state.pos);
      return this.finishToken(28, n), !0;
    }
    readToken_mult_modulo(r) {
      let s = r === 42 ? 55 : 54, n = 1, o = this.input.charCodeAt(this.state.pos + 1);
      r === 42 && o === 42 && (n++, o = this.input.charCodeAt(this.state.pos + 2), s = 57), o === 61 && !this.state.inType && (n++, s = r === 37 ? 33 : 30), this.finishOp(s, n);
    }
    readToken_pipe_amp(r) {
      const s = this.input.charCodeAt(this.state.pos + 1);
      if (s === r) {
        this.input.charCodeAt(this.state.pos + 2) === 61 ? this.finishOp(30, 3) : this.finishOp(r === 124 ? 41 : 42, 2);
        return;
      }
      if (r === 124) {
        if (s === 62) {
          this.finishOp(39, 2);
          return;
        }
        if (this.hasPlugin("recordAndTuple") && s === 125) {
          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
            throw this.raise(S.RecordExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
          this.state.pos += 2, this.finishToken(9);
          return;
        }
        if (this.hasPlugin("recordAndTuple") && s === 93) {
          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
            throw this.raise(S.TupleExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
          this.state.pos += 2, this.finishToken(4);
          return;
        }
      }
      if (s === 61) {
        this.finishOp(30, 2);
        return;
      }
      this.finishOp(r === 124 ? 43 : 45, 1);
    }
    readToken_caret() {
      const r = this.input.charCodeAt(this.state.pos + 1);
      r === 61 && !this.state.inType ? this.finishOp(32, 2) : r === 94 && this.hasPlugin(["pipelineOperator", {
        proposal: "hack",
        topicToken: "^^"
      }]) ? (this.finishOp(37, 2), this.input.codePointAt(this.state.pos) === 94 && this.unexpected()) : this.finishOp(44, 1);
    }
    readToken_atSign() {
      this.input.charCodeAt(this.state.pos + 1) === 64 && this.hasPlugin(["pipelineOperator", {
        proposal: "hack",
        topicToken: "@@"
      }]) ? this.finishOp(38, 2) : this.finishOp(26, 1);
    }
    readToken_plus_min(r) {
      const s = this.input.charCodeAt(this.state.pos + 1);
      if (s === r) {
        this.finishOp(34, 2);
        return;
      }
      s === 61 ? this.finishOp(30, 2) : this.finishOp(53, 1);
    }
    readToken_lt() {
      const {
        pos: r
      } = this.state, s = this.input.charCodeAt(r + 1);
      if (s === 60) {
        if (this.input.charCodeAt(r + 2) === 61) {
          this.finishOp(30, 3);
          return;
        }
        this.finishOp(51, 2);
        return;
      }
      if (s === 61) {
        this.finishOp(49, 2);
        return;
      }
      this.finishOp(47, 1);
    }
    readToken_gt() {
      const {
        pos: r
      } = this.state, s = this.input.charCodeAt(r + 1);
      if (s === 62) {
        const n = this.input.charCodeAt(r + 2) === 62 ? 3 : 2;
        if (this.input.charCodeAt(r + n) === 61) {
          this.finishOp(30, n + 1);
          return;
        }
        this.finishOp(52, n);
        return;
      }
      if (s === 61) {
        this.finishOp(49, 2);
        return;
      }
      this.finishOp(48, 1);
    }
    readToken_eq_excl(r) {
      const s = this.input.charCodeAt(this.state.pos + 1);
      if (s === 61) {
        this.finishOp(46, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
        return;
      }
      if (r === 61 && s === 62) {
        this.state.pos += 2, this.finishToken(19);
        return;
      }
      this.finishOp(r === 61 ? 29 : 35, 1);
    }
    readToken_question() {
      const r = this.input.charCodeAt(this.state.pos + 1), s = this.input.charCodeAt(this.state.pos + 2);
      r === 63 ? s === 61 ? this.finishOp(30, 3) : this.finishOp(40, 2) : r === 46 && !(s >= 48 && s <= 57) ? (this.state.pos += 2, this.finishToken(18)) : (++this.state.pos, this.finishToken(17));
    }
    getTokenFromCode(r) {
      switch (r) {
        case 46:
          this.readToken_dot();
          return;
        case 40:
          ++this.state.pos, this.finishToken(10);
          return;
        case 41:
          ++this.state.pos, this.finishToken(11);
          return;
        case 59:
          ++this.state.pos, this.finishToken(13);
          return;
        case 44:
          ++this.state.pos, this.finishToken(12);
          return;
        case 91:
          if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
            if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
              throw this.raise(S.TupleExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
            this.state.pos += 2, this.finishToken(2);
          } else
            ++this.state.pos, this.finishToken(0);
          return;
        case 93:
          ++this.state.pos, this.finishToken(3);
          return;
        case 123:
          if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
            if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
              throw this.raise(S.RecordExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
            this.state.pos += 2, this.finishToken(6);
          } else
            ++this.state.pos, this.finishToken(5);
          return;
        case 125:
          ++this.state.pos, this.finishToken(8);
          return;
        case 58:
          this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58 ? this.finishOp(15, 2) : (++this.state.pos, this.finishToken(14));
          return;
        case 63:
          this.readToken_question();
          return;
        case 96:
          this.readTemplateToken();
          return;
        case 48: {
          const s = this.input.charCodeAt(this.state.pos + 1);
          if (s === 120 || s === 88) {
            this.readRadixNumber(16);
            return;
          }
          if (s === 111 || s === 79) {
            this.readRadixNumber(8);
            return;
          }
          if (s === 98 || s === 66) {
            this.readRadixNumber(2);
            return;
          }
        }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          this.readNumber(!1);
          return;
        case 34:
        case 39:
          this.readString(r);
          return;
        case 47:
          this.readToken_slash();
          return;
        case 37:
        case 42:
          this.readToken_mult_modulo(r);
          return;
        case 124:
        case 38:
          this.readToken_pipe_amp(r);
          return;
        case 94:
          this.readToken_caret();
          return;
        case 43:
        case 45:
          this.readToken_plus_min(r);
          return;
        case 60:
          this.readToken_lt();
          return;
        case 62:
          this.readToken_gt();
          return;
        case 61:
        case 33:
          this.readToken_eq_excl(r);
          return;
        case 126:
          this.finishOp(36, 1);
          return;
        case 64:
          this.readToken_atSign();
          return;
        case 35:
          this.readToken_numberSign();
          return;
        case 92:
          this.readWord();
          return;
        default:
          if (ut(r)) {
            this.readWord(r);
            return;
          }
      }
      throw this.raise(S.InvalidOrUnexpectedToken, this.state.curPosition(), {
        unexpected: String.fromCodePoint(r)
      });
    }
    finishOp(r, s) {
      const n = this.input.slice(this.state.pos, this.state.pos + s);
      this.state.pos += s, this.finishToken(r, n);
    }
    readRegexp() {
      const r = this.state.startLoc, s = this.state.start + 1;
      let n, o, {
        pos: f
      } = this.state;
      for (; ; ++f) {
        if (f >= this.length)
          throw this.raise(S.UnterminatedRegExp, a(r, 1));
        const N = this.input.charCodeAt(f);
        if (ps(N))
          throw this.raise(S.UnterminatedRegExp, a(r, 1));
        if (n)
          n = !1;
        else {
          if (N === 91)
            o = !0;
          else if (N === 93 && o)
            o = !1;
          else if (N === 47 && !o)
            break;
          n = N === 92;
        }
      }
      const E = this.input.slice(s, f);
      ++f;
      let C = "";
      const T = () => a(r, f + 2 - s);
      for (; f < this.length; ) {
        const N = this.codePointAtPos(f), D = String.fromCharCode(N);
        if (nd.has(N))
          N === 118 ? C.includes("u") && this.raise(S.IncompatibleRegExpUVFlags, T()) : N === 117 && C.includes("v") && this.raise(S.IncompatibleRegExpUVFlags, T()), C.includes(D) && this.raise(S.DuplicateRegExpFlags, T());
        else if (Wt(N) || N === 92)
          this.raise(S.MalformedRegExpFlags, T());
        else
          break;
        ++f, C += D;
      }
      this.state.pos = f, this.finishToken(138, {
        pattern: E,
        flags: C
      });
    }
    readInt(r, s, n = !1, o = !0) {
      const {
        n: f,
        pos: E
      } = Qo(this.input, this.state.pos, this.state.lineStart, this.state.curLine, r, s, n, o, this.errorHandlers_readInt, !1);
      return this.state.pos = E, f;
    }
    readRadixNumber(r) {
      const s = this.state.pos, n = this.state.curPosition();
      let o = !1;
      this.state.pos += 2;
      const f = this.readInt(r);
      f == null && this.raise(S.InvalidDigit, a(n, 2), {
        radix: r
      });
      const E = this.input.charCodeAt(this.state.pos);
      if (E === 110)
        ++this.state.pos, o = !0;
      else if (E === 109)
        throw this.raise(S.InvalidDecimal, n);
      if (ut(this.codePointAtPos(this.state.pos)))
        throw this.raise(S.NumberIdentifier, this.state.curPosition());
      if (o) {
        const C = this.input.slice(s, this.state.pos).replace(/[_n]/g, "");
        this.finishToken(136, C);
        return;
      }
      this.finishToken(135, f);
    }
    readNumber(r) {
      const s = this.state.pos, n = this.state.curPosition();
      let o = !1, f = !1, E = !1, C = !1;
      !r && this.readInt(10) === null && this.raise(S.InvalidNumber, this.state.curPosition());
      const T = this.state.pos - s >= 2 && this.input.charCodeAt(s) === 48;
      if (T) {
        const W = this.input.slice(s, this.state.pos);
        if (this.recordStrictModeErrors(S.StrictOctalLiteral, n), !this.state.strict) {
          const H = W.indexOf("_");
          H > 0 && this.raise(S.ZeroDigitNumericSeparator, a(n, H));
        }
        C = T && !/[89]/.test(W);
      }
      let N = this.input.charCodeAt(this.state.pos);
      if (N === 46 && !C && (++this.state.pos, this.readInt(10), o = !0, N = this.input.charCodeAt(this.state.pos)), (N === 69 || N === 101) && !C && (N = this.input.charCodeAt(++this.state.pos), (N === 43 || N === 45) && ++this.state.pos, this.readInt(10) === null && this.raise(S.InvalidOrMissingExponent, n), o = !0, E = !0, N = this.input.charCodeAt(this.state.pos)), N === 110 && ((o || T) && this.raise(S.InvalidBigIntLiteral, n), ++this.state.pos, f = !0), N === 109) {
        this.expectPlugin("decimal", this.state.curPosition()), (E || T) && this.raise(S.InvalidDecimal, n), ++this.state.pos;
        var D = !0;
      }
      if (ut(this.codePointAtPos(this.state.pos)))
        throw this.raise(S.NumberIdentifier, this.state.curPosition());
      const V = this.input.slice(s, this.state.pos).replace(/[_mn]/g, "");
      if (f) {
        this.finishToken(136, V);
        return;
      }
      if (D) {
        this.finishToken(137, V);
        return;
      }
      const j = C ? parseInt(V, 8) : parseFloat(V);
      this.finishToken(135, j);
    }
    readCodePoint(r) {
      const {
        code: s,
        pos: n
      } = $o(this.input, this.state.pos, this.state.lineStart, this.state.curLine, r, this.errorHandlers_readCodePoint);
      return this.state.pos = n, s;
    }
    readString(r) {
      const {
        str: s,
        pos: n,
        curLine: o,
        lineStart: f
      } = Wo(r === 34 ? "double" : "single", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_string);
      this.state.pos = n + 1, this.state.lineStart = f, this.state.curLine = o, this.finishToken(134, s);
    }
    readTemplateContinuation() {
      this.match(8) || this.unexpected(null, 8), this.state.pos--, this.readTemplateToken();
    }
    readTemplateToken() {
      const r = this.input[this.state.pos], {
        str: s,
        firstInvalidLoc: n,
        pos: o,
        curLine: f,
        lineStart: E
      } = Wo("template", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_template);
      this.state.pos = o + 1, this.state.lineStart = E, this.state.curLine = f, n && (this.state.firstInvalidTemplateEscapePos = new t(n.curLine, n.pos - n.lineStart, this.sourceToOffsetPos(n.pos))), this.input.codePointAt(o) === 96 ? this.finishToken(24, n ? null : r + s + "`") : (this.state.pos++, this.finishToken(25, n ? null : r + s + "${"));
    }
    recordStrictModeErrors(r, s) {
      const n = s.index;
      this.state.strict && !this.state.strictErrors.has(n) ? this.raise(r, s) : this.state.strictErrors.set(n, [r, s]);
    }
    readWord1(r) {
      this.state.containsEsc = !1;
      let s = "";
      const n = this.state.pos;
      let o = this.state.pos;
      for (r !== void 0 && (this.state.pos += r <= 65535 ? 1 : 2); this.state.pos < this.length; ) {
        const f = this.codePointAtPos(this.state.pos);
        if (Wt(f))
          this.state.pos += f <= 65535 ? 1 : 2;
        else if (f === 92) {
          this.state.containsEsc = !0, s += this.input.slice(o, this.state.pos);
          const E = this.state.curPosition(), C = this.state.pos === n ? ut : Wt;
          if (this.input.charCodeAt(++this.state.pos) !== 117) {
            this.raise(S.MissingUnicodeEscape, this.state.curPosition()), o = this.state.pos - 1;
            continue;
          }
          ++this.state.pos;
          const T = this.readCodePoint(!0);
          T !== null && (C(T) || this.raise(S.EscapedCharNotAnIdentifier, E), s += String.fromCodePoint(T)), o = this.state.pos;
        } else
          break;
      }
      return s + this.input.slice(o, this.state.pos);
    }
    readWord(r) {
      const s = this.readWord1(r), n = ye.get(s);
      n !== void 0 ? this.finishToken(n, Tt(n)) : this.finishToken(132, s);
    }
    checkKeywordEscapes() {
      const {
        type: r
      } = this.state;
      Zr(r) && this.state.containsEsc && this.raise(S.InvalidEscapedReservedWord, this.state.startLoc, {
        reservedWord: Tt(r)
      });
    }
    raise(r, s, n = {}) {
      const o = s instanceof t ? s : s.loc.start, f = r(o, n);
      if (!(this.optionFlags & 2048)) throw f;
      return this.isLookahead || this.state.errors.push(f), f;
    }
    raiseOverwrite(r, s, n = {}) {
      const o = s instanceof t ? s : s.loc.start, f = o.index, E = this.state.errors;
      for (let C = E.length - 1; C >= 0; C--) {
        const T = E[C];
        if (T.loc.index === f)
          return E[C] = r(o, n);
        if (T.loc.index < f) break;
      }
      return this.raise(r, s, n);
    }
    updateContext(r) {
    }
    unexpected(r, s) {
      throw this.raise(S.UnexpectedToken, r ?? this.state.startLoc, {
        expected: s ? Tt(s) : null
      });
    }
    expectPlugin(r, s) {
      if (this.hasPlugin(r))
        return !0;
      throw this.raise(S.MissingPlugin, s ?? this.state.startLoc, {
        missingPlugin: [r]
      });
    }
    expectOnePlugin(r) {
      if (!r.some((s) => this.hasPlugin(s)))
        throw this.raise(S.MissingOneOfPlugins, this.state.startLoc, {
          missingPlugin: r
        });
    }
    errorBuilder(r) {
      return (s, n, o) => {
        this.raise(r, Ks(s, n, o));
      };
    }
  }
  class od {
    constructor() {
      this.privateNames = /* @__PURE__ */ new Set(), this.loneAccessors = /* @__PURE__ */ new Map(), this.undefinedPrivateNames = /* @__PURE__ */ new Map();
    }
  }
  class ld {
    constructor(r) {
      this.parser = void 0, this.stack = [], this.undefinedPrivateNames = /* @__PURE__ */ new Map(), this.parser = r;
    }
    current() {
      return this.stack[this.stack.length - 1];
    }
    enter() {
      this.stack.push(new od());
    }
    exit() {
      const r = this.stack.pop(), s = this.current();
      for (const [n, o] of Array.from(r.undefinedPrivateNames))
        s ? s.undefinedPrivateNames.has(n) || s.undefinedPrivateNames.set(n, o) : this.parser.raise(S.InvalidPrivateFieldResolution, o, {
          identifierName: n
        });
    }
    declarePrivateName(r, s, n) {
      const {
        privateNames: o,
        loneAccessors: f,
        undefinedPrivateNames: E
      } = this.current();
      let C = o.has(r);
      if (s & 3) {
        const T = C && f.get(r);
        if (T) {
          const N = T & 4, D = s & 4, V = T & 3, j = s & 3;
          C = V === j || N !== D, C || f.delete(r);
        } else C || f.set(r, s);
      }
      C && this.parser.raise(S.PrivateNameRedeclaration, n, {
        identifierName: r
      }), o.add(r), E.delete(r);
    }
    usePrivateName(r, s) {
      let n;
      for (n of this.stack)
        if (n.privateNames.has(r)) return;
      n ? n.undefinedPrivateNames.set(r, s) : this.parser.raise(S.InvalidPrivateFieldResolution, s, {
        identifierName: r
      });
    }
  }
  class Ii {
    constructor(r = 0) {
      this.type = r;
    }
    canBeArrowParameterDeclaration() {
      return this.type === 2 || this.type === 1;
    }
    isCertainlyParameterDeclaration() {
      return this.type === 3;
    }
  }
  class Ho extends Ii {
    constructor(r) {
      super(r), this.declarationErrors = /* @__PURE__ */ new Map();
    }
    recordDeclarationError(r, s) {
      const n = s.index;
      this.declarationErrors.set(n, [r, s]);
    }
    clearDeclarationError(r) {
      this.declarationErrors.delete(r);
    }
    iterateErrors(r) {
      this.declarationErrors.forEach(r);
    }
  }
  class cd {
    constructor(r) {
      this.parser = void 0, this.stack = [new Ii()], this.parser = r;
    }
    enter(r) {
      this.stack.push(r);
    }
    exit() {
      this.stack.pop();
    }
    recordParameterInitializerError(r, s) {
      const n = s.loc.start, {
        stack: o
      } = this;
      let f = o.length - 1, E = o[f];
      for (; !E.isCertainlyParameterDeclaration(); ) {
        if (E.canBeArrowParameterDeclaration())
          E.recordDeclarationError(r, n);
        else
          return;
        E = o[--f];
      }
      this.parser.raise(r, n);
    }
    recordArrowParameterBindingError(r, s) {
      const {
        stack: n
      } = this, o = n[n.length - 1], f = s.loc.start;
      if (o.isCertainlyParameterDeclaration())
        this.parser.raise(r, f);
      else if (o.canBeArrowParameterDeclaration())
        o.recordDeclarationError(r, f);
      else
        return;
    }
    recordAsyncArrowParametersError(r) {
      const {
        stack: s
      } = this;
      let n = s.length - 1, o = s[n];
      for (; o.canBeArrowParameterDeclaration(); )
        o.type === 2 && o.recordDeclarationError(S.AwaitBindingIdentifier, r), o = s[--n];
    }
    validateAsPattern() {
      const {
        stack: r
      } = this, s = r[r.length - 1];
      s.canBeArrowParameterDeclaration() && s.iterateErrors(([n, o]) => {
        this.parser.raise(n, o);
        let f = r.length - 2, E = r[f];
        for (; E.canBeArrowParameterDeclaration(); )
          E.clearDeclarationError(o.index), E = r[--f];
      });
    }
  }
  function hd() {
    return new Ii(3);
  }
  function ud() {
    return new Ho(1);
  }
  function pd() {
    return new Ho(2);
  }
  function Yo() {
    return new Ii();
  }
  class fd extends ad {
    addExtra(r, s, n, o = !0) {
      if (!r) return;
      let {
        extra: f
      } = r;
      f == null && (f = {}, r.extra = f), o ? f[s] = n : Object.defineProperty(f, s, {
        enumerable: o,
        value: n
      });
    }
    isContextual(r) {
      return this.state.type === r && !this.state.containsEsc;
    }
    isUnparsedContextual(r, s) {
      if (this.input.startsWith(s, r)) {
        const n = this.input.charCodeAt(r + s.length);
        return !(Wt(n) || (n & 64512) === 55296);
      }
      return !1;
    }
    isLookaheadContextual(r) {
      const s = this.nextTokenStart();
      return this.isUnparsedContextual(s, r);
    }
    eatContextual(r) {
      return this.isContextual(r) ? (this.next(), !0) : !1;
    }
    expectContextual(r, s) {
      if (!this.eatContextual(r)) {
        if (s != null)
          throw this.raise(s, this.state.startLoc);
        this.unexpected(null, r);
      }
    }
    canInsertSemicolon() {
      return this.match(140) || this.match(8) || this.hasPrecedingLineBreak();
    }
    hasPrecedingLineBreak() {
      return Go(this.input, this.offsetToSourcePos(this.state.lastTokEndLoc.index), this.state.start);
    }
    hasFollowingLineBreak() {
      return Go(this.input, this.state.end, this.nextTokenStart());
    }
    isLineTerminator() {
      return this.eat(13) || this.canInsertSemicolon();
    }
    semicolon(r = !0) {
      (r ? this.isLineTerminator() : this.eat(13)) || this.raise(S.MissingSemicolon, this.state.lastTokEndLoc);
    }
    expect(r, s) {
      this.eat(r) || this.unexpected(s, r);
    }
    tryParse(r, s = this.state.clone()) {
      const n = {
        node: null
      };
      try {
        const o = r((f = null) => {
          throw n.node = f, n;
        });
        if (this.state.errors.length > s.errors.length) {
          const f = this.state;
          return this.state = s, this.state.tokensLength = f.tokensLength, {
            node: o,
            error: f.errors[s.errors.length],
            thrown: !1,
            aborted: !1,
            failState: f
          };
        }
        return {
          node: o,
          error: null,
          thrown: !1,
          aborted: !1,
          failState: null
        };
      } catch (o) {
        const f = this.state;
        if (this.state = s, o instanceof SyntaxError)
          return {
            node: null,
            error: o,
            thrown: !0,
            aborted: !1,
            failState: f
          };
        if (o === n)
          return {
            node: n.node,
            error: null,
            thrown: !1,
            aborted: !0,
            failState: f
          };
        throw o;
      }
    }
    checkExpressionErrors(r, s) {
      if (!r) return !1;
      const {
        shorthandAssignLoc: n,
        doubleProtoLoc: o,
        privateKeyLoc: f,
        optionalParametersLoc: E,
        voidPatternLoc: C
      } = r, T = !!n || !!o || !!E || !!f || !!C;
      if (!s)
        return T;
      n != null && this.raise(S.InvalidCoverInitializedName, n), o != null && this.raise(S.DuplicateProto, o), f != null && this.raise(S.UnexpectedPrivateField, f), E != null && this.unexpected(E), C != null && this.raise(S.InvalidCoverDiscardElement, C);
    }
    isLiteralPropertyName() {
      return Us(this.state.type);
    }
    isPrivateName(r) {
      return r.type === "PrivateName";
    }
    getPrivateNameSV(r) {
      return r.id.name;
    }
    hasPropertyAsPrivateName(r) {
      return (r.type === "MemberExpression" || r.type === "OptionalMemberExpression") && this.isPrivateName(r.property);
    }
    isObjectProperty(r) {
      return r.type === "ObjectProperty";
    }
    isObjectMethod(r) {
      return r.type === "ObjectMethod";
    }
    initializeScopes(r = this.options.sourceType === "module") {
      const s = this.state.labels;
      this.state.labels = [];
      const n = this.exportedIdentifiers;
      this.exportedIdentifiers = /* @__PURE__ */ new Set();
      const o = this.inModule;
      this.inModule = r;
      const f = this.scope, E = this.getScopeHandler();
      this.scope = new E(this, r);
      const C = this.prodParam;
      this.prodParam = new qf();
      const T = this.classScope;
      this.classScope = new ld(this);
      const N = this.expressionScope;
      return this.expressionScope = new cd(this), () => {
        this.state.labels = s, this.exportedIdentifiers = n, this.inModule = o, this.scope = f, this.prodParam = C, this.classScope = T, this.expressionScope = N;
      };
    }
    enterInitialScopes() {
      let r = 0;
      (this.inModule || this.optionFlags & 1) && (r |= 2), this.optionFlags & 32 && (r |= 1);
      const s = !this.inModule && this.options.sourceType === "commonjs";
      (s || this.optionFlags & 2) && (r |= 4), this.prodParam.enter(r);
      let n = s ? 514 : 1;
      this.optionFlags & 4 && (n |= 512), this.scope.enter(n);
    }
    checkDestructuringPrivate(r) {
      const {
        privateKeyLoc: s
      } = r;
      s !== null && this.expectPlugin("destructuringPrivate", s);
    }
  }
  class Ei {
    constructor() {
      this.shorthandAssignLoc = null, this.doubleProtoLoc = null, this.privateKeyLoc = null, this.optionalParametersLoc = null, this.voidPatternLoc = null;
    }
  }
  class bi {
    constructor(r, s, n) {
      this.type = "", this.start = s, this.end = 0, this.loc = new i(n), r?.optionFlags & 128 && (this.range = [s, 0]), r != null && r.filename && (this.loc.filename = r.filename);
    }
  }
  const ln = bi.prototype;
  ln.__clone = function() {
    const x = new bi(void 0, this.start, this.loc.start), r = Object.keys(this);
    for (let s = 0, n = r.length; s < n; s++) {
      const o = r[s];
      o !== "leadingComments" && o !== "trailingComments" && o !== "innerComments" && (x[o] = this[o]);
    }
    return x;
  };
  class dd extends fd {
    startNode() {
      const r = this.state.startLoc;
      return new bi(this, r.index, r);
    }
    startNodeAt(r) {
      return new bi(this, r.index, r);
    }
    startNodeAtNode(r) {
      return this.startNodeAt(r.loc.start);
    }
    finishNode(r, s) {
      return this.finishNodeAt(r, s, this.state.lastTokEndLoc);
    }
    finishNodeAt(r, s, n) {
      return r.type = s, r.end = n.index, r.loc.end = n, this.optionFlags & 128 && (r.range[1] = n.index), this.optionFlags & 4096 && this.processComment(r), r;
    }
    resetStartLocation(r, s) {
      r.start = s.index, r.loc.start = s, this.optionFlags & 128 && (r.range[0] = s.index);
    }
    resetEndLocation(r, s = this.state.lastTokEndLoc) {
      r.end = s.index, r.loc.end = s, this.optionFlags & 128 && (r.range[1] = s.index);
    }
    resetStartLocationFromNode(r, s) {
      this.resetStartLocation(r, s.loc.start);
    }
    castNodeTo(r, s) {
      return r.type = s, r;
    }
    cloneIdentifier(r) {
      const {
        type: s,
        start: n,
        end: o,
        loc: f,
        range: E,
        name: C
      } = r, T = Object.create(ln);
      return T.type = s, T.start = n, T.end = o, T.loc = f, T.range = E, T.name = C, r.extra && (T.extra = r.extra), T;
    }
    cloneStringLiteral(r) {
      const {
        type: s,
        start: n,
        end: o,
        loc: f,
        range: E,
        extra: C
      } = r, T = Object.create(ln);
      return T.type = s, T.start = n, T.end = o, T.loc = f, T.range = E, T.extra = C, T.value = r.value, T;
    }
  }
  const cn = (x) => x.type === "ParenthesizedExpression" ? cn(x.expression) : x;
  class md extends dd {
    toAssignable(r, s = !1) {
      var n, o;
      let f;
      switch ((r.type === "ParenthesizedExpression" || (n = r.extra) != null && n.parenthesized) && (f = cn(r), s ? f.type === "Identifier" ? this.expressionScope.recordArrowParameterBindingError(S.InvalidParenthesizedAssignment, r) : f.type !== "CallExpression" && f.type !== "MemberExpression" && !this.isOptionalMemberExpression(f) && this.raise(S.InvalidParenthesizedAssignment, r) : this.raise(S.InvalidParenthesizedAssignment, r)), r.type) {
        case "Identifier":
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
        case "VoidPattern":
          break;
        case "ObjectExpression":
          this.castNodeTo(r, "ObjectPattern");
          for (let C = 0, T = r.properties.length, N = T - 1; C < T; C++) {
            var E;
            const D = r.properties[C], V = C === N;
            this.toAssignableObjectExpressionProp(D, V, s), V && D.type === "RestElement" && (E = r.extra) != null && E.trailingCommaLoc && this.raise(S.RestTrailingComma, r.extra.trailingCommaLoc);
          }
          break;
        case "ObjectProperty": {
          const {
            key: C,
            value: T
          } = r;
          this.isPrivateName(C) && this.classScope.usePrivateName(this.getPrivateNameSV(C), C.loc.start), this.toAssignable(T, s);
          break;
        }
        case "SpreadElement":
          throw new Error("Internal @babel/parser error (this is a bug, please report it). SpreadElement should be converted by .toAssignable's caller.");
        case "ArrayExpression":
          this.castNodeTo(r, "ArrayPattern"), this.toAssignableList(r.elements, (o = r.extra) == null ? void 0 : o.trailingCommaLoc, s);
          break;
        case "AssignmentExpression":
          r.operator !== "=" && this.raise(S.MissingEqInAssignment, r.left.loc.end), this.castNodeTo(r, "AssignmentPattern"), delete r.operator, r.left.type === "VoidPattern" && this.raise(S.VoidPatternInitializer, r.left), this.toAssignable(r.left, s);
          break;
        case "ParenthesizedExpression":
          this.toAssignable(f, s);
          break;
      }
    }
    toAssignableObjectExpressionProp(r, s, n) {
      if (r.type === "ObjectMethod")
        this.raise(r.kind === "get" || r.kind === "set" ? S.PatternHasAccessor : S.PatternHasMethod, r.key);
      else if (r.type === "SpreadElement") {
        this.castNodeTo(r, "RestElement");
        const o = r.argument;
        this.checkToRestConversion(o, !1), this.toAssignable(o, n), s || this.raise(S.RestTrailingComma, r);
      } else
        this.toAssignable(r, n);
    }
    toAssignableList(r, s, n) {
      const o = r.length - 1;
      for (let f = 0; f <= o; f++) {
        const E = r[f];
        E && (this.toAssignableListItem(r, f, n), E.type === "RestElement" && (f < o ? this.raise(S.RestTrailingComma, E) : s && this.raise(S.RestTrailingComma, s)));
      }
    }
    toAssignableListItem(r, s, n) {
      const o = r[s];
      if (o.type === "SpreadElement") {
        this.castNodeTo(o, "RestElement");
        const f = o.argument;
        this.checkToRestConversion(f, !0), this.toAssignable(f, n);
      } else
        this.toAssignable(o, n);
    }
    isAssignable(r, s) {
      switch (r.type) {
        case "Identifier":
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
        case "VoidPattern":
          return !0;
        case "ObjectExpression": {
          const n = r.properties.length - 1;
          return r.properties.every((o, f) => o.type !== "ObjectMethod" && (f === n || o.type !== "SpreadElement") && this.isAssignable(o));
        }
        case "ObjectProperty":
          return this.isAssignable(r.value);
        case "SpreadElement":
          return this.isAssignable(r.argument);
        case "ArrayExpression":
          return r.elements.every((n) => n === null || this.isAssignable(n));
        case "AssignmentExpression":
          return r.operator === "=";
        case "ParenthesizedExpression":
          return this.isAssignable(r.expression);
        case "MemberExpression":
        case "OptionalMemberExpression":
          return !s;
        default:
          return !1;
      }
    }
    toReferencedList(r, s) {
      return r;
    }
    toReferencedListDeep(r, s) {
      this.toReferencedList(r, s);
      for (const n of r)
        n?.type === "ArrayExpression" && this.toReferencedListDeep(n.elements);
    }
    parseSpread(r) {
      const s = this.startNode();
      return this.next(), s.argument = this.parseMaybeAssignAllowIn(r, void 0), this.finishNode(s, "SpreadElement");
    }
    parseRestBinding() {
      const r = this.startNode();
      this.next();
      const s = this.parseBindingAtom();
      return s.type === "VoidPattern" && this.raise(S.UnexpectedVoidPattern, s), r.argument = s, this.finishNode(r, "RestElement");
    }
    parseBindingAtom() {
      switch (this.state.type) {
        case 0: {
          const r = this.startNode();
          return this.next(), r.elements = this.parseBindingList(3, 93, 1), this.finishNode(r, "ArrayPattern");
        }
        case 5:
          return this.parseObjectLike(8, !0);
        case 88:
          return this.parseVoidPattern(null);
      }
      return this.parseIdentifier();
    }
    parseBindingList(r, s, n) {
      const o = n & 1, f = [];
      let E = !0;
      for (; !this.eat(r); )
        if (E ? E = !1 : this.expect(12), o && this.match(12))
          f.push(null);
        else {
          if (this.eat(r))
            break;
          if (this.match(21)) {
            let C = this.parseRestBinding();
            if ((this.hasPlugin("flow") || n & 2) && (C = this.parseFunctionParamType(C)), f.push(C), !this.checkCommaAfterRest(s)) {
              this.expect(r);
              break;
            }
          } else {
            const C = [];
            if (n & 2)
              for (this.match(26) && this.hasPlugin("decorators") && this.raise(S.UnsupportedParameterDecorator, this.state.startLoc); this.match(26); )
                C.push(this.parseDecorator());
            f.push(this.parseBindingElement(n, C));
          }
        }
      return f;
    }
    parseBindingRestProperty(r) {
      return this.next(), this.hasPlugin("discardBinding") && this.match(88) ? (r.argument = this.parseVoidPattern(null), this.raise(S.UnexpectedVoidPattern, r.argument)) : r.argument = this.parseIdentifier(), this.checkCommaAfterRest(125), this.finishNode(r, "RestElement");
    }
    parseBindingProperty() {
      const {
        type: r,
        startLoc: s
      } = this.state;
      if (r === 21)
        return this.parseBindingRestProperty(this.startNode());
      const n = this.startNode();
      return r === 139 ? (this.expectPlugin("destructuringPrivate", s), this.classScope.usePrivateName(this.state.value, s), n.key = this.parsePrivateName()) : this.parsePropertyName(n), n.method = !1, this.parseObjPropValue(n, s, !1, !1, !0, !1);
    }
    parseBindingElement(r, s) {
      const n = this.parseMaybeDefault();
      return (this.hasPlugin("flow") || r & 2) && this.parseFunctionParamType(n), s.length && (n.decorators = s, this.resetStartLocationFromNode(n, s[0])), this.parseMaybeDefault(n.loc.start, n);
    }
    parseFunctionParamType(r) {
      return r;
    }
    parseMaybeDefault(r, s) {
      if (r ?? (r = this.state.startLoc), s = s ?? this.parseBindingAtom(), !this.eat(29)) return s;
      const n = this.startNodeAt(r);
      return s.type === "VoidPattern" && this.raise(S.VoidPatternInitializer, s), n.left = s, n.right = this.parseMaybeAssignAllowIn(), this.finishNode(n, "AssignmentPattern");
    }
    isValidLVal(r, s, n, o) {
      switch (r) {
        case "AssignmentPattern":
          return "left";
        case "RestElement":
          return "argument";
        case "ObjectProperty":
          return "value";
        case "ParenthesizedExpression":
          return "expression";
        case "ArrayPattern":
          return "elements";
        case "ObjectPattern":
          return "properties";
        case "VoidPattern":
          return !0;
        case "CallExpression":
          if (!s && !this.state.strict && this.optionFlags & 8192)
            return !0;
      }
      return !1;
    }
    isOptionalMemberExpression(r) {
      return r.type === "OptionalMemberExpression";
    }
    checkLVal(r, s, n = 64, o = !1, f = !1, E = !1, C = !1) {
      var T;
      const N = r.type;
      if (this.isObjectMethod(r)) return;
      const D = this.isOptionalMemberExpression(r);
      if (D || N === "MemberExpression") {
        D && (this.expectPlugin("optionalChainingAssign", r.loc.start), s.type !== "AssignmentExpression" && this.raise(S.InvalidLhsOptionalChaining, r, {
          ancestor: s
        })), n !== 64 && this.raise(S.InvalidPropertyBindingPattern, r);
        return;
      }
      if (N === "Identifier") {
        this.checkIdentifier(r, n, f);
        const {
          name: te
        } = r;
        o && (o.has(te) ? this.raise(S.ParamDupe, r) : o.add(te));
        return;
      } else N === "VoidPattern" && s.type === "CatchClause" && this.raise(S.VoidPatternCatchClauseParam, r);
      const V = cn(r);
      C || (C = V.type === "CallExpression" && (V.callee.type === "Import" || V.callee.type === "Super"));
      const j = this.isValidLVal(N, C, !(E || (T = r.extra) != null && T.parenthesized) && s.type === "AssignmentExpression", n);
      if (j === !0) return;
      if (j === !1) {
        const te = n === 64 ? S.InvalidLhs : S.InvalidLhsBinding;
        this.raise(te, r, {
          ancestor: s
        });
        return;
      }
      let W, H;
      typeof j == "string" ? (W = j, H = N === "ParenthesizedExpression") : [W, H] = j;
      const re = N === "ArrayPattern" || N === "ObjectPattern" ? {
        type: N
      } : s, me = r[W];
      if (Array.isArray(me))
        for (const te of me)
          te && this.checkLVal(te, re, n, o, f, H, !0);
      else me && this.checkLVal(me, re, n, o, f, H, C);
    }
    checkIdentifier(r, s, n = !1) {
      this.state.strict && (n ? Uo(r.name, this.inModule) : Fo(r.name)) && (s === 64 ? this.raise(S.StrictEvalArguments, r, {
        referenceName: r.name
      }) : this.raise(S.StrictEvalArgumentsBinding, r, {
        bindingName: r.name
      })), s & 8192 && r.name === "let" && this.raise(S.LetInLexicalBinding, r), s & 64 || this.declareNameFromIdentifier(r, s);
    }
    declareNameFromIdentifier(r, s) {
      this.scope.declareName(r.name, s, r.loc.start);
    }
    checkToRestConversion(r, s) {
      switch (r.type) {
        case "ParenthesizedExpression":
          this.checkToRestConversion(r.expression, s);
          break;
        case "Identifier":
        case "MemberExpression":
          break;
        case "ArrayExpression":
        case "ObjectExpression":
          if (s) break;
        default:
          this.raise(S.InvalidRestAssignmentPattern, r);
      }
    }
    checkCommaAfterRest(r) {
      return this.match(12) ? (this.raise(this.lookaheadCharCode() === r ? S.RestTrailingComma : S.ElementAfterRest, this.state.startLoc), !0) : !1;
    }
  }
  const hn = /in(?:stanceof)?|as|satisfies/y;
  function Ad(x) {
    if (x == null)
      throw new Error(`Unexpected ${x} value.`);
    return x;
  }
  function Jo(x) {
    if (!x)
      throw new Error("Assert fail");
  }
  const Q = v`typescript`({
    AbstractMethodHasImplementation: ({
      methodName: x
    }) => `Method '${x}' cannot have an implementation because it is marked abstract.`,
    AbstractPropertyHasInitializer: ({
      propertyName: x
    }) => `Property '${x}' cannot have an initializer because it is marked abstract.`,
    AccessorCannotBeOptional: "An 'accessor' property cannot be declared optional.",
    AccessorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
    AccessorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
    ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
    ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
    ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
    ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
    DeclareAccessor: ({
      kind: x
    }) => `'declare' is not allowed in ${x}ters.`,
    DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
    DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
    DuplicateAccessibilityModifier: ({
      modifier: x
    }) => `Accessibility modifier already seen: '${x}'.`,
    DuplicateModifier: ({
      modifier: x
    }) => `Duplicate modifier: '${x}'.`,
    EmptyHeritageClauseType: ({
      token: x
    }) => `'${x}' list cannot be empty.`,
    EmptyTypeArguments: "Type argument list cannot be empty.",
    EmptyTypeParameters: "Type parameter list cannot be empty.",
    ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
    ImportAliasHasImportType: "An import alias can not use 'import type'.",
    ImportReflectionHasImportType: "An `import module` declaration can not use `type` modifier",
    IncompatibleModifiers: ({
      modifiers: x
    }) => `'${x[0]}' modifier cannot be used with '${x[1]}' modifier.`,
    IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
    IndexSignatureHasAccessibility: ({
      modifier: x
    }) => `Index signatures cannot have an accessibility modifier ('${x}').`,
    IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
    IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
    IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
    InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.",
    InvalidHeritageClauseType: ({
      token: x
    }) => `'${x}' list can only include identifiers or qualified-names with optional type arguments.`,
    InvalidModifierOnAwaitUsingDeclaration: (x) => `'${x}' modifier cannot appear on an await using declaration.`,
    InvalidModifierOnTypeMember: ({
      modifier: x
    }) => `'${x}' modifier cannot appear on a type member.`,
    InvalidModifierOnTypeParameter: ({
      modifier: x
    }) => `'${x}' modifier cannot appear on a type parameter.`,
    InvalidModifierOnTypeParameterPositions: ({
      modifier: x
    }) => `'${x}' modifier can only appear on a type parameter of a class, interface or type alias.`,
    InvalidModifierOnUsingDeclaration: (x) => `'${x}' modifier cannot appear on a using declaration.`,
    InvalidModifiersOrder: ({
      orderedModifiers: x
    }) => `'${x[0]}' modifier must precede '${x[1]}' modifier.`,
    InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
    InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
    MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
    NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
    NonClassMethodPropertyHasAbstractModifier: "'abstract' modifier can only appear on a class, method, or property declaration.",
    OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
    OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
    PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
    PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
    PrivateElementHasAccessibility: ({
      modifier: x
    }) => `Private elements cannot have an accessibility modifier ('${x}').`,
    ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
    ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
    ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
    SetAccessorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
    SetAccessorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
    SetAccessorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
    SingleTypeParameterWithoutTrailingComma: ({
      typeParameterName: x
    }) => `Single type parameter ${x} should have a trailing comma. Example usage: <${x},>.`,
    StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
    TupleOptionalAfterType: "A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).",
    TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
    TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
    TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
    TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
    UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
    UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
    UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
    UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
    UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
    UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
    UnsupportedSignatureParameterKind: ({
      type: x
    }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${x}.`,
    UsingDeclarationInAmbientContext: (x) => `'${x}' declarations are not allowed in ambient contexts.`
  });
  function gd(x) {
    switch (x) {
      case "any":
        return "TSAnyKeyword";
      case "boolean":
        return "TSBooleanKeyword";
      case "bigint":
        return "TSBigIntKeyword";
      case "never":
        return "TSNeverKeyword";
      case "number":
        return "TSNumberKeyword";
      case "object":
        return "TSObjectKeyword";
      case "string":
        return "TSStringKeyword";
      case "symbol":
        return "TSSymbolKeyword";
      case "undefined":
        return "TSUndefinedKeyword";
      case "unknown":
        return "TSUnknownKeyword";
      default:
        return;
    }
  }
  function Xo(x) {
    return x === "private" || x === "public" || x === "protected";
  }
  function yd(x) {
    return x === "in" || x === "out";
  }
  var Sd = (x) => class extends x {
    constructor(...s) {
      super(...s), this.tsParseInOutModifiers = this.tsParseModifiers.bind(this, {
        allowedModifiers: ["in", "out"],
        disallowedModifiers: ["const", "public", "private", "protected", "readonly", "declare", "abstract", "override"],
        errorTemplate: Q.InvalidModifierOnTypeParameter
      }), this.tsParseConstModifier = this.tsParseModifiers.bind(this, {
        allowedModifiers: ["const"],
        disallowedModifiers: ["in", "out"],
        errorTemplate: Q.InvalidModifierOnTypeParameterPositions
      }), this.tsParseInOutConstModifiers = this.tsParseModifiers.bind(this, {
        allowedModifiers: ["in", "out", "const"],
        disallowedModifiers: ["public", "private", "protected", "readonly", "declare", "abstract", "override"],
        errorTemplate: Q.InvalidModifierOnTypeParameter
      });
    }
    getScopeHandler() {
      return Zf;
    }
    tsIsIdentifier() {
      return ae(this.state.type);
    }
    tsTokenCanFollowModifier() {
      return this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(139) || this.isLiteralPropertyName();
    }
    tsNextTokenOnSameLineAndCanFollowModifier() {
      return this.next(), this.hasPrecedingLineBreak() ? !1 : this.tsTokenCanFollowModifier();
    }
    tsNextTokenCanFollowModifier() {
      return this.match(106) ? (this.next(), this.tsTokenCanFollowModifier()) : this.tsNextTokenOnSameLineAndCanFollowModifier();
    }
    tsParseModifier(s, n, o) {
      if (!ae(this.state.type) && this.state.type !== 58 && this.state.type !== 75)
        return;
      const f = this.state.value;
      if (s.includes(f)) {
        if (o && this.match(106) || n && this.tsIsStartOfStaticBlocks())
          return;
        if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)))
          return f;
      }
    }
    tsParseModifiers({
      allowedModifiers: s,
      disallowedModifiers: n,
      stopOnStartOfClassStaticBlock: o,
      errorTemplate: f = Q.InvalidModifierOnTypeMember
    }, E) {
      const C = (N, D, V, j) => {
        D === V && E[j] && this.raise(Q.InvalidModifiersOrder, N, {
          orderedModifiers: [V, j]
        });
      }, T = (N, D, V, j) => {
        (E[V] && D === j || E[j] && D === V) && this.raise(Q.IncompatibleModifiers, N, {
          modifiers: [V, j]
        });
      };
      for (; ; ) {
        const {
          startLoc: N
        } = this.state, D = this.tsParseModifier(s.concat(n ?? []), o, E.static);
        if (!D) break;
        Xo(D) ? E.accessibility ? this.raise(Q.DuplicateAccessibilityModifier, N, {
          modifier: D
        }) : (C(N, D, D, "override"), C(N, D, D, "static"), C(N, D, D, "readonly"), E.accessibility = D) : yd(D) ? (E[D] && this.raise(Q.DuplicateModifier, N, {
          modifier: D
        }), E[D] = !0, C(N, D, "in", "out")) : (hasOwnProperty.call(E, D) ? this.raise(Q.DuplicateModifier, N, {
          modifier: D
        }) : (C(N, D, "static", "readonly"), C(N, D, "static", "override"), C(N, D, "override", "readonly"), C(N, D, "abstract", "override"), T(N, D, "declare", "override"), T(N, D, "static", "abstract")), E[D] = !0), n != null && n.includes(D) && this.raise(f, N, {
          modifier: D
        });
      }
    }
    tsIsListTerminator(s) {
      switch (s) {
        case "EnumMembers":
        case "TypeMembers":
          return this.match(8);
        case "HeritageClauseElement":
          return this.match(5);
        case "TupleElementTypes":
          return this.match(3);
        case "TypeParametersOrArguments":
          return this.match(48);
      }
    }
    tsParseList(s, n) {
      const o = [];
      for (; !this.tsIsListTerminator(s); )
        o.push(n());
      return o;
    }
    tsParseDelimitedList(s, n, o) {
      return Ad(this.tsParseDelimitedListWorker(s, n, !0, o));
    }
    tsParseDelimitedListWorker(s, n, o, f) {
      const E = [];
      let C = -1;
      for (; !this.tsIsListTerminator(s); ) {
        C = -1;
        const T = n();
        if (T == null)
          return;
        if (E.push(T), this.eat(12)) {
          C = this.state.lastTokStartLoc.index;
          continue;
        }
        if (this.tsIsListTerminator(s))
          break;
        o && this.expect(12);
        return;
      }
      return f && (f.value = C), E;
    }
    tsParseBracketedList(s, n, o, f, E) {
      f || (o ? this.expect(0) : this.expect(47));
      const C = this.tsParseDelimitedList(s, n, E);
      return o ? this.expect(3) : this.expect(48), C;
    }
    tsParseImportType() {
      const s = this.startNode();
      return this.expect(83), this.expect(10), this.match(134) ? s.argument = this.parseStringLiteral(this.state.value) : (this.raise(Q.UnsupportedImportTypeArgument, this.state.startLoc), s.argument = super.parseExprAtom()), this.eat(12) ? s.options = this.tsParseImportTypeOptions() : s.options = null, this.expect(11), this.eat(16) && (s.qualifier = this.tsParseEntityName(3)), this.match(47) && (s.typeParameters = this.tsParseTypeArguments()), this.finishNode(s, "TSImportType");
    }
    tsParseImportTypeOptions() {
      const s = this.startNode();
      this.expect(5);
      const n = this.startNode();
      return this.isContextual(76) ? (n.method = !1, n.key = this.parseIdentifier(!0), n.computed = !1, n.shorthand = !1) : this.unexpected(null, 76), this.expect(14), n.value = this.tsParseImportTypeWithPropertyValue(), s.properties = [this.finishObjectProperty(n)], this.eat(12), this.expect(8), this.finishNode(s, "ObjectExpression");
    }
    tsParseImportTypeWithPropertyValue() {
      const s = this.startNode(), n = [];
      for (this.expect(5); !this.match(8); ) {
        const o = this.state.type;
        ae(o) || o === 134 ? n.push(super.parsePropertyDefinition(null)) : this.unexpected(), this.eat(12);
      }
      return s.properties = n, this.next(), this.finishNode(s, "ObjectExpression");
    }
    tsParseEntityName(s) {
      let n;
      if (s & 1 && this.match(78))
        if (s & 2)
          n = this.parseIdentifier(!0);
        else {
          const o = this.startNode();
          this.next(), n = this.finishNode(o, "ThisExpression");
        }
      else
        n = this.parseIdentifier(!!(s & 1));
      for (; this.eat(16); ) {
        const o = this.startNodeAtNode(n);
        o.left = n, o.right = this.parseIdentifier(!!(s & 1)), n = this.finishNode(o, "TSQualifiedName");
      }
      return n;
    }
    tsParseTypeReference() {
      const s = this.startNode();
      return s.typeName = this.tsParseEntityName(1), !this.hasPrecedingLineBreak() && this.match(47) && (s.typeParameters = this.tsParseTypeArguments()), this.finishNode(s, "TSTypeReference");
    }
    tsParseThisTypePredicate(s) {
      this.next();
      const n = this.startNodeAtNode(s);
      return n.parameterName = s, n.typeAnnotation = this.tsParseTypeAnnotation(!1), n.asserts = !1, this.finishNode(n, "TSTypePredicate");
    }
    tsParseThisTypeNode() {
      const s = this.startNode();
      return this.next(), this.finishNode(s, "TSThisType");
    }
    tsParseTypeQuery() {
      const s = this.startNode();
      return this.expect(87), this.match(83) ? s.exprName = this.tsParseImportType() : s.exprName = this.tsParseEntityName(3), !this.hasPrecedingLineBreak() && this.match(47) && (s.typeParameters = this.tsParseTypeArguments()), this.finishNode(s, "TSTypeQuery");
    }
    tsParseTypeParameter(s) {
      const n = this.startNode();
      return s(n), n.name = this.tsParseTypeParameterName(), n.constraint = this.tsEatThenParseType(81), n.default = this.tsEatThenParseType(29), this.finishNode(n, "TSTypeParameter");
    }
    tsTryParseTypeParameters(s) {
      if (this.match(47))
        return this.tsParseTypeParameters(s);
    }
    tsParseTypeParameters(s) {
      const n = this.startNode();
      this.match(47) || this.match(143) ? this.next() : this.unexpected();
      const o = {
        value: -1
      };
      return n.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, s), !1, !0, o), n.params.length === 0 && this.raise(Q.EmptyTypeParameters, n), o.value !== -1 && this.addExtra(n, "trailingComma", o.value), this.finishNode(n, "TSTypeParameterDeclaration");
    }
    tsFillSignature(s, n) {
      const o = s === 19, f = "parameters", E = "typeAnnotation";
      n.typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier), this.expect(10), n[f] = this.tsParseBindingListForSignature(), o ? n[E] = this.tsParseTypeOrTypePredicateAnnotation(s) : this.match(s) && (n[E] = this.tsParseTypeOrTypePredicateAnnotation(s));
    }
    tsParseBindingListForSignature() {
      const s = super.parseBindingList(11, 41, 2);
      for (const n of s) {
        const {
          type: o
        } = n;
        (o === "AssignmentPattern" || o === "TSParameterProperty") && this.raise(Q.UnsupportedSignatureParameterKind, n, {
          type: o
        });
      }
      return s;
    }
    tsParseTypeMemberSemicolon() {
      !this.eat(12) && !this.isLineTerminator() && this.expect(13);
    }
    tsParseSignatureMember(s, n) {
      return this.tsFillSignature(14, n), this.tsParseTypeMemberSemicolon(), this.finishNode(n, s);
    }
    tsIsUnambiguouslyIndexSignature() {
      return this.next(), ae(this.state.type) ? (this.next(), this.match(14)) : !1;
    }
    tsTryParseIndexSignature(s) {
      if (!(this.match(0) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))))
        return;
      this.expect(0);
      const n = this.parseIdentifier();
      n.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(n), this.expect(3), s.parameters = [n];
      const o = this.tsTryParseTypeAnnotation();
      return o && (s.typeAnnotation = o), this.tsParseTypeMemberSemicolon(), this.finishNode(s, "TSIndexSignature");
    }
    tsParsePropertyOrMethodSignature(s, n) {
      if (this.eat(17) && (s.optional = !0), this.match(10) || this.match(47)) {
        n && this.raise(Q.ReadonlyForMethodSignature, s);
        const o = s;
        o.kind && this.match(47) && this.raise(Q.AccessorCannotHaveTypeParameters, this.state.curPosition()), this.tsFillSignature(14, o), this.tsParseTypeMemberSemicolon();
        const f = "parameters", E = "typeAnnotation";
        if (o.kind === "get")
          o[f].length > 0 && (this.raise(S.BadGetterArity, this.state.curPosition()), this.isThisParam(o[f][0]) && this.raise(Q.AccessorCannotDeclareThisParameter, this.state.curPosition()));
        else if (o.kind === "set") {
          if (o[f].length !== 1)
            this.raise(S.BadSetterArity, this.state.curPosition());
          else {
            const C = o[f][0];
            this.isThisParam(C) && this.raise(Q.AccessorCannotDeclareThisParameter, this.state.curPosition()), C.type === "Identifier" && C.optional && this.raise(Q.SetAccessorCannotHaveOptionalParameter, this.state.curPosition()), C.type === "RestElement" && this.raise(Q.SetAccessorCannotHaveRestParameter, this.state.curPosition());
          }
          o[E] && this.raise(Q.SetAccessorCannotHaveReturnType, o[E]);
        } else
          o.kind = "method";
        return this.finishNode(o, "TSMethodSignature");
      } else {
        const o = s;
        n && (o.readonly = !0);
        const f = this.tsTryParseTypeAnnotation();
        return f && (o.typeAnnotation = f), this.tsParseTypeMemberSemicolon(), this.finishNode(o, "TSPropertySignature");
      }
    }
    tsParseTypeMember() {
      const s = this.startNode();
      if (this.match(10) || this.match(47))
        return this.tsParseSignatureMember("TSCallSignatureDeclaration", s);
      if (this.match(77)) {
        const o = this.startNode();
        return this.next(), this.match(10) || this.match(47) ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", s) : (s.key = this.createIdentifier(o, "new"), this.tsParsePropertyOrMethodSignature(s, !1));
      }
      this.tsParseModifiers({
        allowedModifiers: ["readonly"],
        disallowedModifiers: ["declare", "abstract", "private", "protected", "public", "static", "override"]
      }, s);
      const n = this.tsTryParseIndexSignature(s);
      return n || (super.parsePropertyName(s), !s.computed && s.key.type === "Identifier" && (s.key.name === "get" || s.key.name === "set") && this.tsTokenCanFollowModifier() && (s.kind = s.key.name, super.parsePropertyName(s), !this.match(10) && !this.match(47) && this.unexpected(null, 10)), this.tsParsePropertyOrMethodSignature(s, !!s.readonly));
    }
    tsParseTypeLiteral() {
      const s = this.startNode();
      return s.members = this.tsParseObjectTypeMembers(), this.finishNode(s, "TSTypeLiteral");
    }
    tsParseObjectTypeMembers() {
      this.expect(5);
      const s = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
      return this.expect(8), s;
    }
    tsIsStartOfMappedType() {
      return this.next(), this.eat(53) ? this.isContextual(122) : (this.isContextual(122) && this.next(), !this.match(0) || (this.next(), !this.tsIsIdentifier()) ? !1 : (this.next(), this.match(58)));
    }
    tsParseMappedType() {
      const s = this.startNode();
      this.expect(5), this.match(53) ? (s.readonly = this.state.value, this.next(), this.expectContextual(122)) : this.eatContextual(122) && (s.readonly = !0), this.expect(0);
      const n = this.startNode();
      return n.name = this.tsParseTypeParameterName(), n.constraint = this.tsExpectThenParseType(58), s.typeParameter = this.finishNode(n, "TSTypeParameter"), s.nameType = this.eatContextual(93) ? this.tsParseType() : null, this.expect(3), this.match(53) ? (s.optional = this.state.value, this.next(), this.expect(17)) : this.eat(17) && (s.optional = !0), s.typeAnnotation = this.tsTryParseType(), this.semicolon(), this.expect(8), this.finishNode(s, "TSMappedType");
    }
    tsParseTupleType() {
      const s = this.startNode();
      s.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
      let n = !1;
      return s.elementTypes.forEach((o) => {
        const {
          type: f
        } = o;
        n && f !== "TSRestType" && f !== "TSOptionalType" && !(f === "TSNamedTupleMember" && o.optional) && this.raise(Q.OptionalTypeBeforeRequired, o), n || (n = f === "TSNamedTupleMember" && o.optional || f === "TSOptionalType");
      }), this.finishNode(s, "TSTupleType");
    }
    tsParseTupleElementType() {
      const s = this.state.startLoc, n = this.eat(21), {
        startLoc: o
      } = this.state;
      let f, E, C, T;
      const D = Ke(this.state.type) ? this.lookaheadCharCode() : null;
      if (D === 58)
        f = !0, C = !1, E = this.parseIdentifier(!0), this.expect(14), T = this.tsParseType();
      else if (D === 63) {
        C = !0;
        const V = this.state.value, j = this.tsParseNonArrayType();
        this.lookaheadCharCode() === 58 ? (f = !0, E = this.createIdentifier(this.startNodeAt(o), V), this.expect(17), this.expect(14), T = this.tsParseType()) : (f = !1, T = j, this.expect(17));
      } else
        T = this.tsParseType(), C = this.eat(17), f = this.eat(14);
      if (f) {
        let V;
        E ? (V = this.startNodeAt(o), V.optional = C, V.label = E, V.elementType = T, this.eat(17) && (V.optional = !0, this.raise(Q.TupleOptionalAfterType, this.state.lastTokStartLoc))) : (V = this.startNodeAt(o), V.optional = C, this.raise(Q.InvalidTupleMemberLabel, T), V.label = T, V.elementType = this.tsParseType()), T = this.finishNode(V, "TSNamedTupleMember");
      } else if (C) {
        const V = this.startNodeAt(o);
        V.typeAnnotation = T, T = this.finishNode(V, "TSOptionalType");
      }
      if (n) {
        const V = this.startNodeAt(s);
        V.typeAnnotation = T, T = this.finishNode(V, "TSRestType");
      }
      return T;
    }
    tsParseParenthesizedType() {
      const s = this.startNode();
      return this.expect(10), s.typeAnnotation = this.tsParseType(), this.expect(11), this.finishNode(s, "TSParenthesizedType");
    }
    tsParseFunctionOrConstructorType(s, n) {
      const o = this.startNode();
      return s === "TSConstructorType" && (o.abstract = !!n, n && this.next(), this.next()), this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(19, o)), this.finishNode(o, s);
    }
    tsParseLiteralTypeNode() {
      const s = this.startNode();
      switch (this.state.type) {
        case 135:
        case 136:
        case 134:
        case 85:
        case 86:
          s.literal = super.parseExprAtom();
          break;
        default:
          this.unexpected();
      }
      return this.finishNode(s, "TSLiteralType");
    }
    tsParseTemplateLiteralType() {
      const s = this.startNode();
      return s.literal = super.parseTemplate(!1), this.finishNode(s, "TSLiteralType");
    }
    parseTemplateSubstitution() {
      return this.state.inType ? this.tsParseType() : super.parseTemplateSubstitution();
    }
    tsParseThisTypeOrThisTypePredicate() {
      const s = this.tsParseThisTypeNode();
      return this.isContextual(116) && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(s) : s;
    }
    tsParseNonArrayType() {
      switch (this.state.type) {
        case 134:
        case 135:
        case 136:
        case 85:
        case 86:
          return this.tsParseLiteralTypeNode();
        case 53:
          if (this.state.value === "-") {
            const s = this.startNode(), n = this.lookahead();
            return n.type !== 135 && n.type !== 136 && this.unexpected(), s.literal = this.parseMaybeUnary(), this.finishNode(s, "TSLiteralType");
          }
          break;
        case 78:
          return this.tsParseThisTypeOrThisTypePredicate();
        case 87:
          return this.tsParseTypeQuery();
        case 83:
          return this.tsParseImportType();
        case 5:
          return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
        case 0:
          return this.tsParseTupleType();
        case 10:
          return this.tsParseParenthesizedType();
        case 25:
        case 24:
          return this.tsParseTemplateLiteralType();
        default: {
          const {
            type: s
          } = this.state;
          if (ae(s) || s === 88 || s === 84) {
            const n = s === 88 ? "TSVoidKeyword" : s === 84 ? "TSNullKeyword" : gd(this.state.value);
            if (n !== void 0 && this.lookaheadCharCode() !== 46) {
              const o = this.startNode();
              return this.next(), this.finishNode(o, n);
            }
            return this.tsParseTypeReference();
          }
        }
      }
      throw this.unexpected();
    }
    tsParseArrayTypeOrHigher() {
      const {
        startLoc: s
      } = this.state;
      let n = this.tsParseNonArrayType();
      for (; !this.hasPrecedingLineBreak() && this.eat(0); )
        if (this.match(3)) {
          const o = this.startNodeAt(s);
          o.elementType = n, this.expect(3), n = this.finishNode(o, "TSArrayType");
        } else {
          const o = this.startNodeAt(s);
          o.objectType = n, o.indexType = this.tsParseType(), this.expect(3), n = this.finishNode(o, "TSIndexedAccessType");
        }
      return n;
    }
    tsParseTypeOperator() {
      const s = this.startNode(), n = this.state.value;
      return this.next(), s.operator = n, s.typeAnnotation = this.tsParseTypeOperatorOrHigher(), n === "readonly" && this.tsCheckTypeAnnotationForReadOnly(s), this.finishNode(s, "TSTypeOperator");
    }
    tsCheckTypeAnnotationForReadOnly(s) {
      switch (s.typeAnnotation.type) {
        case "TSTupleType":
        case "TSArrayType":
          return;
        default:
          this.raise(Q.UnexpectedReadonly, s);
      }
    }
    tsParseInferType() {
      const s = this.startNode();
      this.expectContextual(115);
      const n = this.startNode();
      return n.name = this.tsParseTypeParameterName(), n.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType()), s.typeParameter = this.finishNode(n, "TSTypeParameter"), this.finishNode(s, "TSInferType");
    }
    tsParseConstraintForInferType() {
      if (this.eat(81)) {
        const s = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
        if (this.state.inDisallowConditionalTypesContext || !this.match(17))
          return s;
      }
    }
    tsParseTypeOperatorOrHigher() {
      return Cf(this.state.type) && !this.state.containsEsc ? this.tsParseTypeOperator() : this.isContextual(115) ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
    }
    tsParseUnionOrIntersectionType(s, n, o) {
      const f = this.startNode(), E = this.eat(o), C = [];
      do
        C.push(n());
      while (this.eat(o));
      return C.length === 1 && !E ? C[0] : (f.types = C, this.finishNode(f, s));
    }
    tsParseIntersectionTypeOrHigher() {
      return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), 45);
    }
    tsParseUnionTypeOrHigher() {
      return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), 43);
    }
    tsIsStartOfFunctionType() {
      return this.match(47) ? !0 : this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
    }
    tsSkipParameterStart() {
      if (ae(this.state.type) || this.match(78))
        return this.next(), !0;
      if (this.match(5)) {
        const {
          errors: s
        } = this.state, n = s.length;
        try {
          return this.parseObjectLike(8, !0), s.length === n;
        } catch {
          return !1;
        }
      }
      if (this.match(0)) {
        this.next();
        const {
          errors: s
        } = this.state, n = s.length;
        try {
          return super.parseBindingList(3, 93, 1), s.length === n;
        } catch {
          return !1;
        }
      }
      return !1;
    }
    tsIsUnambiguouslyStartOfFunctionType() {
      return this.next(), !!(this.match(11) || this.match(21) || this.tsSkipParameterStart() && (this.match(14) || this.match(12) || this.match(17) || this.match(29) || this.match(11) && (this.next(), this.match(19))));
    }
    tsParseTypeOrTypePredicateAnnotation(s) {
      return this.tsInType(() => {
        const n = this.startNode();
        this.expect(s);
        const o = this.startNode(), f = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
        if (f && this.match(78)) {
          let T = this.tsParseThisTypeOrThisTypePredicate();
          return T.type === "TSThisType" ? (o.parameterName = T, o.asserts = !0, o.typeAnnotation = null, T = this.finishNode(o, "TSTypePredicate")) : (this.resetStartLocationFromNode(T, o), T.asserts = !0), n.typeAnnotation = T, this.finishNode(n, "TSTypeAnnotation");
        }
        const E = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
        if (!E)
          return f ? (o.parameterName = this.parseIdentifier(), o.asserts = f, o.typeAnnotation = null, n.typeAnnotation = this.finishNode(o, "TSTypePredicate"), this.finishNode(n, "TSTypeAnnotation")) : this.tsParseTypeAnnotation(!1, n);
        const C = this.tsParseTypeAnnotation(!1);
        return o.parameterName = E, o.typeAnnotation = C, o.asserts = f, n.typeAnnotation = this.finishNode(o, "TSTypePredicate"), this.finishNode(n, "TSTypeAnnotation");
      });
    }
    tsTryParseTypeOrTypePredicateAnnotation() {
      if (this.match(14))
        return this.tsParseTypeOrTypePredicateAnnotation(14);
    }
    tsTryParseTypeAnnotation() {
      if (this.match(14))
        return this.tsParseTypeAnnotation();
    }
    tsTryParseType() {
      return this.tsEatThenParseType(14);
    }
    tsParseTypePredicatePrefix() {
      const s = this.parseIdentifier();
      if (this.isContextual(116) && !this.hasPrecedingLineBreak())
        return this.next(), s;
    }
    tsParseTypePredicateAsserts() {
      if (this.state.type !== 109)
        return !1;
      const s = this.state.containsEsc;
      return this.next(), !ae(this.state.type) && !this.match(78) ? !1 : (s && this.raise(S.InvalidEscapedReservedWord, this.state.lastTokStartLoc, {
        reservedWord: "asserts"
      }), !0);
    }
    tsParseTypeAnnotation(s = !0, n = this.startNode()) {
      return this.tsInType(() => {
        s && this.expect(14), n.typeAnnotation = this.tsParseType();
      }), this.finishNode(n, "TSTypeAnnotation");
    }
    tsParseType() {
      Jo(this.state.inType);
      const s = this.tsParseNonConditionalType();
      if (this.state.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(81))
        return s;
      const n = this.startNodeAtNode(s);
      return n.checkType = s, n.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType()), this.expect(17), n.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.expect(14), n.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.finishNode(n, "TSConditionalType");
    }
    isAbstractConstructorSignature() {
      return this.isContextual(124) && this.isLookaheadContextual("new");
    }
    tsParseNonConditionalType() {
      return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(77) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType("TSConstructorType", !0) : this.tsParseUnionTypeOrHigher();
    }
    tsParseTypeAssertion() {
      this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(Q.ReservedTypeAssertion, this.state.startLoc);
      const s = this.startNode();
      return s.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? this.tsParseTypeReference() : this.tsParseType())), this.expect(48), s.expression = this.parseMaybeUnary(), this.finishNode(s, "TSTypeAssertion");
    }
    tsParseHeritageClause(s) {
      const n = this.state.startLoc, o = this.tsParseDelimitedList("HeritageClauseElement", () => {
        const f = this.startNode();
        return f.expression = this.tsParseEntityName(3), this.match(47) && (f.typeParameters = this.tsParseTypeArguments()), this.finishNode(f, "TSExpressionWithTypeArguments");
      });
      return o.length || this.raise(Q.EmptyHeritageClauseType, n, {
        token: s
      }), o;
    }
    tsParseInterfaceDeclaration(s, n = {}) {
      if (this.hasFollowingLineBreak()) return null;
      this.expectContextual(129), n.declare && (s.declare = !0), ae(this.state.type) ? (s.id = this.parseIdentifier(), this.checkIdentifier(s.id, 130)) : (s.id = null, this.raise(Q.MissingInterfaceName, this.state.startLoc)), s.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers), this.eat(81) && (s.extends = this.tsParseHeritageClause("extends"));
      const o = this.startNode();
      return o.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)), s.body = this.finishNode(o, "TSInterfaceBody"), this.finishNode(s, "TSInterfaceDeclaration");
    }
    tsParseTypeAliasDeclaration(s) {
      return s.id = this.parseIdentifier(), this.checkIdentifier(s.id, 2), s.typeAnnotation = this.tsInType(() => {
        if (s.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers), this.expect(29), this.isContextual(114) && this.lookaheadCharCode() !== 46) {
          const n = this.startNode();
          return this.next(), this.finishNode(n, "TSIntrinsicKeyword");
        }
        return this.tsParseType();
      }), this.semicolon(), this.finishNode(s, "TSTypeAliasDeclaration");
    }
    tsInTopLevelContext(s) {
      if (this.curContext() !== B.brace) {
        const n = this.state.context;
        this.state.context = [n[0]];
        try {
          return s();
        } finally {
          this.state.context = n;
        }
      } else
        return s();
    }
    tsInType(s) {
      const n = this.state.inType;
      this.state.inType = !0;
      try {
        return s();
      } finally {
        this.state.inType = n;
      }
    }
    tsInDisallowConditionalTypesContext(s) {
      const n = this.state.inDisallowConditionalTypesContext;
      this.state.inDisallowConditionalTypesContext = !0;
      try {
        return s();
      } finally {
        this.state.inDisallowConditionalTypesContext = n;
      }
    }
    tsInAllowConditionalTypesContext(s) {
      const n = this.state.inDisallowConditionalTypesContext;
      this.state.inDisallowConditionalTypesContext = !1;
      try {
        return s();
      } finally {
        this.state.inDisallowConditionalTypesContext = n;
      }
    }
    tsEatThenParseType(s) {
      if (this.match(s))
        return this.tsNextThenParseType();
    }
    tsExpectThenParseType(s) {
      return this.tsInType(() => (this.expect(s), this.tsParseType()));
    }
    tsNextThenParseType() {
      return this.tsInType(() => (this.next(), this.tsParseType()));
    }
    tsParseEnumMember() {
      const s = this.startNode();
      return s.id = this.match(134) ? super.parseStringLiteral(this.state.value) : this.parseIdentifier(!0), this.eat(29) && (s.initializer = super.parseMaybeAssignAllowIn()), this.finishNode(s, "TSEnumMember");
    }
    tsParseEnumDeclaration(s, n = {}) {
      return n.const && (s.const = !0), n.declare && (s.declare = !0), this.expectContextual(126), s.id = this.parseIdentifier(), this.checkIdentifier(s.id, s.const ? 8971 : 8459), this.expect(5), s.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(8), this.finishNode(s, "TSEnumDeclaration");
    }
    tsParseEnumBody() {
      const s = this.startNode();
      return this.expect(5), s.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(8), this.finishNode(s, "TSEnumBody");
    }
    tsParseModuleBlock() {
      const s = this.startNode();
      return this.scope.enter(0), this.expect(5), super.parseBlockOrModuleBlockBody(s.body = [], void 0, !0, 8), this.scope.exit(), this.finishNode(s, "TSModuleBlock");
    }
    tsParseModuleOrNamespaceDeclaration(s, n = !1) {
      if (s.id = this.parseIdentifier(), n || this.checkIdentifier(s.id, 1024), this.eat(16)) {
        const o = this.startNode();
        this.tsParseModuleOrNamespaceDeclaration(o, !0), s.body = o;
      } else
        this.scope.enter(1024), this.prodParam.enter(0), s.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit();
      return this.finishNode(s, "TSModuleDeclaration");
    }
    tsParseAmbientExternalModuleDeclaration(s) {
      return this.isContextual(112) ? (s.kind = "global", s.global = !0, s.id = this.parseIdentifier()) : this.match(134) ? (s.kind = "module", s.id = super.parseStringLiteral(this.state.value)) : this.unexpected(), this.match(5) ? (this.scope.enter(1024), this.prodParam.enter(0), s.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(s, "TSModuleDeclaration");
    }
    tsParseImportEqualsDeclaration(s, n, o) {
      s.isExport = o || !1, s.id = n || this.parseIdentifier(), this.checkIdentifier(s.id, 4096), this.expect(29);
      const f = this.tsParseModuleReference();
      return s.importKind === "type" && f.type !== "TSExternalModuleReference" && this.raise(Q.ImportAliasHasImportType, f), s.moduleReference = f, this.semicolon(), this.finishNode(s, "TSImportEqualsDeclaration");
    }
    tsIsExternalModuleReference() {
      return this.isContextual(119) && this.lookaheadCharCode() === 40;
    }
    tsParseModuleReference() {
      return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(0);
    }
    tsParseExternalModuleReference() {
      const s = this.startNode();
      return this.expectContextual(119), this.expect(10), this.match(134) || this.unexpected(), s.expression = super.parseExprAtom(), this.expect(11), this.sawUnambiguousESM = !0, this.finishNode(s, "TSExternalModuleReference");
    }
    tsLookAhead(s) {
      const n = this.state.clone(), o = s();
      return this.state = n, o;
    }
    tsTryParseAndCatch(s) {
      const n = this.tryParse((o) => s() || o());
      if (!(n.aborted || !n.node))
        return n.error && (this.state = n.failState), n.node;
    }
    tsTryParse(s) {
      const n = this.state.clone(), o = s();
      if (o !== void 0 && o !== !1)
        return o;
      this.state = n;
    }
    tsTryParseDeclare(s) {
      if (this.isLineTerminator())
        return;
      const n = this.state.type;
      return this.tsInAmbientContext(() => {
        switch (n) {
          case 68:
            return s.declare = !0, super.parseFunctionStatement(s, !1, !1);
          case 80:
            return s.declare = !0, this.parseClass(s, !0, !1);
          case 126:
            return this.tsParseEnumDeclaration(s, {
              declare: !0
            });
          case 112:
            return this.tsParseAmbientExternalModuleDeclaration(s);
          case 100:
            if (this.state.containsEsc)
              return;
          case 75:
          case 74:
            return !this.match(75) || !this.isLookaheadContextual("enum") ? (s.declare = !0, this.parseVarStatement(s, this.state.value, !0)) : (this.expect(75), this.tsParseEnumDeclaration(s, {
              const: !0,
              declare: !0
            }));
          case 107:
            if (this.isUsing())
              return this.raise(Q.InvalidModifierOnUsingDeclaration, this.state.startLoc, "declare"), s.declare = !0, this.parseVarStatement(s, "using", !0);
            break;
          case 96:
            if (this.isAwaitUsing())
              return this.raise(Q.InvalidModifierOnAwaitUsingDeclaration, this.state.startLoc, "declare"), s.declare = !0, this.next(), this.parseVarStatement(s, "await using", !0);
            break;
          case 129: {
            const o = this.tsParseInterfaceDeclaration(s, {
              declare: !0
            });
            if (o) return o;
          }
          default:
            if (ae(n))
              return this.tsParseDeclaration(s, this.state.type, !0, null);
        }
      });
    }
    tsTryParseExportDeclaration() {
      return this.tsParseDeclaration(this.startNode(), this.state.type, !0, null);
    }
    tsParseDeclaration(s, n, o, f) {
      switch (n) {
        case 124:
          if (this.tsCheckLineTerminator(o) && (this.match(80) || ae(this.state.type)))
            return this.tsParseAbstractDeclaration(s, f);
          break;
        case 127:
          if (this.tsCheckLineTerminator(o)) {
            if (this.match(134))
              return this.tsParseAmbientExternalModuleDeclaration(s);
            if (ae(this.state.type))
              return s.kind = "module", this.tsParseModuleOrNamespaceDeclaration(s);
          }
          break;
        case 128:
          if (this.tsCheckLineTerminator(o) && ae(this.state.type))
            return s.kind = "namespace", this.tsParseModuleOrNamespaceDeclaration(s);
          break;
        case 130:
          if (this.tsCheckLineTerminator(o) && ae(this.state.type))
            return this.tsParseTypeAliasDeclaration(s);
          break;
      }
    }
    tsCheckLineTerminator(s) {
      return s ? this.hasFollowingLineBreak() ? !1 : (this.next(), !0) : !this.isLineTerminator();
    }
    tsTryParseGenericAsyncArrowFunction(s) {
      if (!this.match(47)) return;
      const n = this.state.maybeInArrowParameters;
      this.state.maybeInArrowParameters = !0;
      const o = this.tsTryParseAndCatch(() => {
        const f = this.startNodeAt(s);
        return f.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier), super.parseFunctionParams(f), f.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(19), f;
      });
      if (this.state.maybeInArrowParameters = n, !!o)
        return super.parseArrowExpression(o, null, !0);
    }
    tsParseTypeArgumentsInExpression() {
      if (this.reScan_lt() === 47)
        return this.tsParseTypeArguments();
    }
    tsParseTypeArguments() {
      const s = this.startNode();
      return s.params = this.tsInType(() => this.tsInTopLevelContext(() => (this.expect(47), this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))), s.params.length === 0 ? this.raise(Q.EmptyTypeArguments, s) : !this.state.inType && this.curContext() === B.brace && this.reScan_lt_gt(), this.expect(48), this.finishNode(s, "TSTypeParameterInstantiation");
    }
    tsIsDeclarationStart() {
      return vf(this.state.type);
    }
    isExportDefaultSpecifier() {
      return this.tsIsDeclarationStart() ? !1 : super.isExportDefaultSpecifier();
    }
    parseBindingElement(s, n) {
      const o = n.length ? n[0].loc.start : this.state.startLoc, f = {};
      this.tsParseModifiers({
        allowedModifiers: ["public", "private", "protected", "override", "readonly"]
      }, f);
      const E = f.accessibility, C = f.override, T = f.readonly;
      !(s & 4) && (E || T || C) && this.raise(Q.UnexpectedParameterModifier, o);
      const N = this.parseMaybeDefault();
      s & 2 && this.parseFunctionParamType(N);
      const D = this.parseMaybeDefault(N.loc.start, N);
      if (E || T || C) {
        const V = this.startNodeAt(o);
        return n.length && (V.decorators = n), E && (V.accessibility = E), T && (V.readonly = T), C && (V.override = C), D.type !== "Identifier" && D.type !== "AssignmentPattern" && this.raise(Q.UnsupportedParameterPropertyKind, V), V.parameter = D, this.finishNode(V, "TSParameterProperty");
      }
      return n.length && (N.decorators = n), D;
    }
    isSimpleParameter(s) {
      return s.type === "TSParameterProperty" && super.isSimpleParameter(s.parameter) || super.isSimpleParameter(s);
    }
    tsDisallowOptionalPattern(s) {
      for (const n of s.params)
        n.type !== "Identifier" && n.optional && !this.state.isAmbientContext && this.raise(Q.PatternIsOptional, n);
    }
    setArrowFunctionParameters(s, n, o) {
      super.setArrowFunctionParameters(s, n, o), this.tsDisallowOptionalPattern(s);
    }
    parseFunctionBodyAndFinish(s, n, o = !1) {
      this.match(14) && (s.returnType = this.tsParseTypeOrTypePredicateAnnotation(14));
      const f = n === "FunctionDeclaration" ? "TSDeclareFunction" : n === "ClassMethod" || n === "ClassPrivateMethod" ? "TSDeclareMethod" : void 0;
      return f && !this.match(5) && this.isLineTerminator() ? this.finishNode(s, f) : f === "TSDeclareFunction" && this.state.isAmbientContext && (this.raise(Q.DeclareFunctionHasImplementation, s), s.declare) ? super.parseFunctionBodyAndFinish(s, f, o) : (this.tsDisallowOptionalPattern(s), super.parseFunctionBodyAndFinish(s, n, o));
    }
    registerFunctionStatementId(s) {
      !s.body && s.id ? this.checkIdentifier(s.id, 1024) : super.registerFunctionStatementId(s);
    }
    tsCheckForInvalidTypeCasts(s) {
      s.forEach((n) => {
        n?.type === "TSTypeCastExpression" && this.raise(Q.UnexpectedTypeAnnotation, n.typeAnnotation);
      });
    }
    toReferencedList(s, n) {
      return this.tsCheckForInvalidTypeCasts(s), s;
    }
    parseArrayLike(s, n, o) {
      const f = super.parseArrayLike(s, n, o);
      return f.type === "ArrayExpression" && this.tsCheckForInvalidTypeCasts(f.elements), f;
    }
    parseSubscript(s, n, o, f) {
      if (!this.hasPrecedingLineBreak() && this.match(35)) {
        this.state.canStartJSXElement = !1, this.next();
        const C = this.startNodeAt(n);
        return C.expression = s, this.finishNode(C, "TSNonNullExpression");
      }
      let E = !1;
      if (this.match(18) && this.lookaheadCharCode() === 60) {
        if (o)
          return f.stop = !0, s;
        f.optionalChainMember = E = !0, this.next();
      }
      if (this.match(47) || this.match(51)) {
        let C;
        const T = this.tsTryParseAndCatch(() => {
          if (!o && this.atPossibleAsyncArrow(s)) {
            const j = this.tsTryParseGenericAsyncArrowFunction(n);
            if (j)
              return f.stop = !0, j;
          }
          const N = this.tsParseTypeArgumentsInExpression();
          if (!N) return;
          if (E && !this.match(10)) {
            C = this.state.curPosition();
            return;
          }
          if (gi(this.state.type)) {
            const j = super.parseTaggedTemplateExpression(s, n, f);
            return j.typeParameters = N, j;
          }
          if (!o && this.eat(10)) {
            const j = this.startNodeAt(n);
            return j.callee = s, j.arguments = this.parseCallExpressionArguments(), this.tsCheckForInvalidTypeCasts(j.arguments), j.typeParameters = N, f.optionalChainMember && (j.optional = E), this.finishCallExpression(j, f.optionalChainMember);
          }
          const D = this.state.type;
          if (D === 48 || D === 52 || D !== 10 && D !== 93 && D !== 120 && Vs(D) && !this.hasPrecedingLineBreak())
            return;
          const V = this.startNodeAt(n);
          return V.expression = s, V.typeParameters = N, this.finishNode(V, "TSInstantiationExpression");
        });
        if (C && this.unexpected(C, 10), T)
          return T.type === "TSInstantiationExpression" && ((this.match(16) || this.match(18) && this.lookaheadCharCode() !== 40) && this.raise(Q.InvalidPropertyAccessAfterInstantiationExpression, this.state.startLoc), !this.match(16) && !this.match(18) && (T.expression = super.stopParseSubscript(s, f))), T;
      }
      return super.parseSubscript(s, n, o, f);
    }
    parseNewCallee(s) {
      var n;
      super.parseNewCallee(s);
      const {
        callee: o
      } = s;
      o.type === "TSInstantiationExpression" && !((n = o.extra) != null && n.parenthesized) && (s.typeParameters = o.typeParameters, s.callee = o.expression);
    }
    parseExprOp(s, n, o) {
      let f;
      if (Ai(58) > o && !this.hasPrecedingLineBreak() && (this.isContextual(93) || (f = this.isContextual(120)))) {
        const E = this.startNodeAt(n);
        return E.expression = s, E.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? (f && this.raise(S.UnexpectedKeyword, this.state.startLoc, {
          keyword: "const"
        }), this.tsParseTypeReference()) : this.tsParseType())), this.finishNode(E, f ? "TSSatisfiesExpression" : "TSAsExpression"), this.reScan_lt_gt(), this.parseExprOp(E, n, o);
      }
      return super.parseExprOp(s, n, o);
    }
    checkReservedWord(s, n, o, f) {
      this.state.isAmbientContext || super.checkReservedWord(s, n, o, f);
    }
    checkImportReflection(s) {
      super.checkImportReflection(s), s.module && s.importKind !== "value" && this.raise(Q.ImportReflectionHasImportType, s.specifiers[0].loc.start);
    }
    checkDuplicateExports() {
    }
    isPotentialImportPhase(s) {
      if (super.isPotentialImportPhase(s)) return !0;
      if (this.isContextual(130)) {
        const n = this.lookaheadCharCode();
        return s ? n === 123 || n === 42 : n !== 61;
      }
      return !s && this.isContextual(87);
    }
    applyImportPhase(s, n, o, f) {
      super.applyImportPhase(s, n, o, f), n ? s.exportKind = o === "type" ? "type" : "value" : s.importKind = o === "type" || o === "typeof" ? o : "value";
    }
    parseImport(s) {
      if (this.match(134))
        return s.importKind = "value", super.parseImport(s);
      let n;
      if (ae(this.state.type) && this.lookaheadCharCode() === 61)
        return s.importKind = "value", this.tsParseImportEqualsDeclaration(s);
      if (this.isContextual(130)) {
        const o = this.parseMaybeImportPhase(s, !1);
        if (this.lookaheadCharCode() === 61)
          return this.tsParseImportEqualsDeclaration(s, o);
        n = super.parseImportSpecifiersAndAfter(s, o);
      } else
        n = super.parseImport(s);
      return n.importKind === "type" && n.specifiers.length > 1 && n.specifiers[0].type === "ImportDefaultSpecifier" && this.raise(Q.TypeImportCannotSpecifyDefaultAndNamed, n), n;
    }
    parseExport(s, n) {
      if (this.match(83)) {
        const o = s;
        this.next();
        let f = null;
        return this.isContextual(130) && this.isPotentialImportPhase(!1) ? f = this.parseMaybeImportPhase(o, !1) : o.importKind = "value", this.tsParseImportEqualsDeclaration(o, f, !0);
      } else if (this.eat(29)) {
        const o = s;
        return o.expression = super.parseExpression(), this.semicolon(), this.sawUnambiguousESM = !0, this.finishNode(o, "TSExportAssignment");
      } else if (this.eatContextual(93)) {
        const o = s;
        return this.expectContextual(128), o.id = this.parseIdentifier(), this.semicolon(), this.finishNode(o, "TSNamespaceExportDeclaration");
      } else
        return super.parseExport(s, n);
    }
    isAbstractClass() {
      return this.isContextual(124) && this.isLookaheadContextual("class");
    }
    parseExportDefaultExpression() {
      if (this.isAbstractClass()) {
        const s = this.startNode();
        return this.next(), s.abstract = !0, this.parseClass(s, !0, !0);
      }
      if (this.match(129)) {
        const s = this.tsParseInterfaceDeclaration(this.startNode());
        if (s) return s;
      }
      return super.parseExportDefaultExpression();
    }
    parseVarStatement(s, n, o = !1) {
      const {
        isAmbientContext: f
      } = this.state, E = super.parseVarStatement(s, n, o || f);
      if (!f) return E;
      if (!s.declare && (n === "using" || n === "await using"))
        return this.raiseOverwrite(Q.UsingDeclarationInAmbientContext, s, n), E;
      for (const {
        id: C,
        init: T
      } of E.declarations)
        T && (n === "var" || n === "let" || C.typeAnnotation ? this.raise(Q.InitializerNotAllowedInAmbientContext, T) : Id(T, this.hasPlugin("estree")) || this.raise(Q.ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference, T));
      return E;
    }
    parseStatementContent(s, n) {
      if (!this.state.containsEsc)
        switch (this.state.type) {
          case 75: {
            if (this.isLookaheadContextual("enum")) {
              const o = this.startNode();
              return this.expect(75), this.tsParseEnumDeclaration(o, {
                const: !0
              });
            }
            break;
          }
          case 124:
          case 125: {
            if (this.nextTokenIsIdentifierAndNotTSRelationalOperatorOnSameLine()) {
              const o = this.state.type, f = this.startNode();
              this.next();
              const E = o === 125 ? this.tsTryParseDeclare(f) : this.tsParseAbstractDeclaration(f, n);
              return E ? (o === 125 && (E.declare = !0), E) : (f.expression = this.createIdentifier(this.startNodeAt(f.loc.start), o === 125 ? "declare" : "abstract"), this.semicolon(!1), this.finishNode(f, "ExpressionStatement"));
            }
            break;
          }
          case 126:
            return this.tsParseEnumDeclaration(this.startNode());
          case 112: {
            if (this.lookaheadCharCode() === 123) {
              const f = this.startNode();
              return this.tsParseAmbientExternalModuleDeclaration(f);
            }
            break;
          }
          case 129: {
            const o = this.tsParseInterfaceDeclaration(this.startNode());
            if (o) return o;
            break;
          }
          case 127: {
            if (this.nextTokenIsIdentifierOrStringLiteralOnSameLine()) {
              const o = this.startNode();
              return this.next(), this.tsParseDeclaration(o, 127, !1, n);
            }
            break;
          }
          case 128: {
            if (this.nextTokenIsIdentifierOnSameLine()) {
              const o = this.startNode();
              return this.next(), this.tsParseDeclaration(o, 128, !1, n);
            }
            break;
          }
          case 130: {
            if (this.nextTokenIsIdentifierOnSameLine()) {
              const o = this.startNode();
              return this.next(), this.tsParseTypeAliasDeclaration(o);
            }
            break;
          }
        }
      return super.parseStatementContent(s, n);
    }
    parseAccessModifier() {
      return this.tsParseModifier(["public", "protected", "private"]);
    }
    tsHasSomeModifiers(s, n) {
      return n.some((o) => Xo(o) ? s.accessibility === o : !!s[o]);
    }
    tsIsStartOfStaticBlocks() {
      return this.isContextual(106) && this.lookaheadCharCode() === 123;
    }
    parseClassMember(s, n, o) {
      const f = ["declare", "private", "public", "protected", "override", "abstract", "readonly", "static"];
      this.tsParseModifiers({
        allowedModifiers: f,
        disallowedModifiers: ["in", "out"],
        stopOnStartOfClassStaticBlock: !0,
        errorTemplate: Q.InvalidModifierOnTypeParameterPositions
      }, n);
      const E = () => {
        this.tsIsStartOfStaticBlocks() ? (this.next(), this.next(), this.tsHasSomeModifiers(n, f) && this.raise(Q.StaticBlockCannotHaveModifier, this.state.curPosition()), super.parseClassStaticBlock(s, n)) : this.parseClassMemberWithIsStatic(s, n, o, !!n.static);
      };
      n.declare ? this.tsInAmbientContext(E) : E();
    }
    parseClassMemberWithIsStatic(s, n, o, f) {
      const E = this.tsTryParseIndexSignature(n);
      if (E) {
        s.body.push(E), n.abstract && this.raise(Q.IndexSignatureHasAbstract, n), n.accessibility && this.raise(Q.IndexSignatureHasAccessibility, n, {
          modifier: n.accessibility
        }), n.declare && this.raise(Q.IndexSignatureHasDeclare, n), n.override && this.raise(Q.IndexSignatureHasOverride, n);
        return;
      }
      !this.state.inAbstractClass && n.abstract && this.raise(Q.NonAbstractClassHasAbstractMethod, n), n.override && (o.hadSuperClass || this.raise(Q.OverrideNotInSubClass, n)), super.parseClassMemberWithIsStatic(s, n, o, f);
    }
    parsePostMemberNameModifiers(s) {
      this.eat(17) && (s.optional = !0), s.readonly && this.match(10) && this.raise(Q.ClassMethodHasReadonly, s), s.declare && this.match(10) && this.raise(Q.ClassMethodHasDeclare, s);
    }
    shouldParseExportDeclaration() {
      return this.tsIsDeclarationStart() ? !0 : super.shouldParseExportDeclaration();
    }
    parseConditional(s, n, o) {
      if (!this.match(17)) return s;
      if (this.state.maybeInArrowParameters) {
        const f = this.lookaheadCharCode();
        if (f === 44 || f === 61 || f === 58 || f === 41)
          return this.setOptionalParametersError(o), s;
      }
      return super.parseConditional(s, n, o);
    }
    parseParenItem(s, n) {
      const o = super.parseParenItem(s, n);
      if (this.eat(17) && (o.optional = !0, this.resetEndLocation(s)), this.match(14)) {
        const f = this.startNodeAt(n);
        return f.expression = s, f.typeAnnotation = this.tsParseTypeAnnotation(), this.finishNode(f, "TSTypeCastExpression");
      }
      return s;
    }
    parseExportDeclaration(s) {
      if (!this.state.isAmbientContext && this.isContextual(125))
        return this.tsInAmbientContext(() => this.parseExportDeclaration(s));
      const n = this.state.startLoc, o = this.eatContextual(125);
      if (o && (this.isContextual(125) || !this.shouldParseExportDeclaration()))
        throw this.raise(Q.ExpectedAmbientAfterExportDeclare, this.state.startLoc);
      const E = ae(this.state.type) && this.tsTryParseExportDeclaration() || super.parseExportDeclaration(s);
      return E ? ((E.type === "TSInterfaceDeclaration" || E.type === "TSTypeAliasDeclaration" || o) && (s.exportKind = "type"), o && E.type !== "TSImportEqualsDeclaration" && (this.resetStartLocation(E, n), E.declare = !0), E) : null;
    }
    parseClassId(s, n, o, f) {
      if ((!n || o) && this.isContextual(113))
        return;
      super.parseClassId(s, n, o, s.declare ? 1024 : 8331);
      const E = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers);
      E && (s.typeParameters = E);
    }
    parseClassPropertyAnnotation(s) {
      s.optional || (this.eat(35) ? s.definite = !0 : this.eat(17) && (s.optional = !0));
      const n = this.tsTryParseTypeAnnotation();
      n && (s.typeAnnotation = n);
    }
    parseClassProperty(s) {
      if (this.parseClassPropertyAnnotation(s), this.state.isAmbientContext && !(s.readonly && !s.typeAnnotation) && this.match(29) && this.raise(Q.DeclareClassFieldHasInitializer, this.state.startLoc), s.abstract && this.match(29)) {
        const {
          key: n
        } = s;
        this.raise(Q.AbstractPropertyHasInitializer, this.state.startLoc, {
          propertyName: n.type === "Identifier" && !s.computed ? n.name : `[${this.input.slice(this.offsetToSourcePos(n.start), this.offsetToSourcePos(n.end))}]`
        });
      }
      return super.parseClassProperty(s);
    }
    parseClassPrivateProperty(s) {
      return s.abstract && this.raise(Q.PrivateElementHasAbstract, s), s.accessibility && this.raise(Q.PrivateElementHasAccessibility, s, {
        modifier: s.accessibility
      }), this.parseClassPropertyAnnotation(s), super.parseClassPrivateProperty(s);
    }
    parseClassAccessorProperty(s) {
      return this.parseClassPropertyAnnotation(s), s.optional && this.raise(Q.AccessorCannotBeOptional, s), super.parseClassAccessorProperty(s);
    }
    pushClassMethod(s, n, o, f, E, C) {
      const T = this.tsTryParseTypeParameters(this.tsParseConstModifier);
      T && E && this.raise(Q.ConstructorHasTypeParameters, T);
      const {
        declare: N = !1,
        kind: D
      } = n;
      N && (D === "get" || D === "set") && this.raise(Q.DeclareAccessor, n, {
        kind: D
      }), T && (n.typeParameters = T), super.pushClassMethod(s, n, o, f, E, C);
    }
    pushClassPrivateMethod(s, n, o, f) {
      const E = this.tsTryParseTypeParameters(this.tsParseConstModifier);
      E && (n.typeParameters = E), super.pushClassPrivateMethod(s, n, o, f);
    }
    declareClassPrivateMethodInScope(s, n) {
      s.type !== "TSDeclareMethod" && (s.type === "MethodDefinition" && s.value.body == null || super.declareClassPrivateMethodInScope(s, n));
    }
    parseClassSuper(s) {
      if (super.parseClassSuper(s), s.superClass)
        if (s.superClass.type === "TSInstantiationExpression") {
          const n = s.superClass, o = n.expression;
          this.takeSurroundingComments(o, o.start, o.end);
          const f = n.typeParameters;
          this.takeSurroundingComments(f, f.start, f.end), s.superClass = o, s.superTypeParameters = f;
        } else (this.match(47) || this.match(51)) && (s.superTypeParameters = this.tsParseTypeArgumentsInExpression());
      this.eatContextual(113) && (s.implements = this.tsParseHeritageClause("implements"));
    }
    parseObjPropValue(s, n, o, f, E, C, T) {
      const N = this.tsTryParseTypeParameters(this.tsParseConstModifier);
      return N && (s.typeParameters = N), super.parseObjPropValue(s, n, o, f, E, C, T);
    }
    parseFunctionParams(s, n) {
      const o = this.tsTryParseTypeParameters(this.tsParseConstModifier);
      o && (s.typeParameters = o), super.parseFunctionParams(s, n);
    }
    parseVarId(s, n) {
      super.parseVarId(s, n), s.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.eat(35) && (s.definite = !0);
      const o = this.tsTryParseTypeAnnotation();
      o && (s.id.typeAnnotation = o, this.resetEndLocation(s.id));
    }
    parseAsyncArrowFromCallExpression(s, n) {
      return this.match(14) && (s.returnType = this.tsParseTypeAnnotation()), super.parseAsyncArrowFromCallExpression(s, n);
    }
    parseMaybeAssign(s, n) {
      var o, f, E, C, T;
      let N, D, V;
      if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
        if (N = this.state.clone(), D = this.tryParse(() => super.parseMaybeAssign(s, n), N), !D.error) return D.node;
        const {
          context: H
        } = this.state, re = H[H.length - 1];
        (re === B.j_oTag || re === B.j_expr) && H.pop();
      }
      if (!((o = D) != null && o.error) && !this.match(47))
        return super.parseMaybeAssign(s, n);
      (!N || N === this.state) && (N = this.state.clone());
      let j;
      const W = this.tryParse((H) => {
        var re, me;
        j = this.tsParseTypeParameters(this.tsParseConstModifier);
        const te = super.parseMaybeAssign(s, n);
        return (te.type !== "ArrowFunctionExpression" || (re = te.extra) != null && re.parenthesized) && H(), ((me = j) == null ? void 0 : me.params.length) !== 0 && this.resetStartLocationFromNode(te, j), te.typeParameters = j, te;
      }, N);
      if (!W.error && !W.aborted)
        return j && this.reportReservedArrowTypeParam(j), W.node;
      if (!D && (Jo(!this.hasPlugin("jsx")), V = this.tryParse(() => super.parseMaybeAssign(s, n), N), !V.error))
        return V.node;
      if ((f = D) != null && f.node)
        return this.state = D.failState, D.node;
      if (W.node)
        return this.state = W.failState, j && this.reportReservedArrowTypeParam(j), W.node;
      if ((E = V) != null && E.node)
        return this.state = V.failState, V.node;
      throw ((C = D) == null ? void 0 : C.error) || W.error || ((T = V) == null ? void 0 : T.error);
    }
    reportReservedArrowTypeParam(s) {
      var n;
      s.params.length === 1 && !s.params[0].constraint && !((n = s.extra) != null && n.trailingComma) && this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(Q.ReservedArrowTypeParam, s);
    }
    parseMaybeUnary(s, n) {
      return !this.hasPlugin("jsx") && this.match(47) ? this.tsParseTypeAssertion() : super.parseMaybeUnary(s, n);
    }
    parseArrow(s) {
      if (this.match(14)) {
        const n = this.tryParse((o) => {
          const f = this.tsParseTypeOrTypePredicateAnnotation(14);
          return (this.canInsertSemicolon() || !this.match(19)) && o(), f;
        });
        if (n.aborted) return;
        n.thrown || (n.error && (this.state = n.failState), s.returnType = n.node);
      }
      return super.parseArrow(s);
    }
    parseFunctionParamType(s) {
      this.eat(17) && (s.optional = !0);
      const n = this.tsTryParseTypeAnnotation();
      return n && (s.typeAnnotation = n), this.resetEndLocation(s), s;
    }
    isAssignable(s, n) {
      switch (s.type) {
        case "TSTypeCastExpression":
          return this.isAssignable(s.expression, n);
        case "TSParameterProperty":
          return !0;
        default:
          return super.isAssignable(s, n);
      }
    }
    toAssignable(s, n = !1) {
      switch (s.type) {
        case "ParenthesizedExpression":
          this.toAssignableParenthesizedExpression(s, n);
          break;
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
          n ? this.expressionScope.recordArrowParameterBindingError(Q.UnexpectedTypeCastInParameter, s) : this.raise(Q.UnexpectedTypeCastInParameter, s), this.toAssignable(s.expression, n);
          break;
        case "AssignmentExpression":
          !n && s.left.type === "TSTypeCastExpression" && (s.left = this.typeCastToParameter(s.left));
        default:
          super.toAssignable(s, n);
      }
    }
    toAssignableParenthesizedExpression(s, n) {
      switch (s.expression.type) {
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
        case "ParenthesizedExpression":
          this.toAssignable(s.expression, n);
          break;
        default:
          super.toAssignable(s, n);
      }
    }
    checkToRestConversion(s, n) {
      switch (s.type) {
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
        case "TSNonNullExpression":
          this.checkToRestConversion(s.expression, !1);
          break;
        default:
          super.checkToRestConversion(s, n);
      }
    }
    isValidLVal(s, n, o, f) {
      switch (s) {
        case "TSTypeCastExpression":
          return !0;
        case "TSParameterProperty":
          return "parameter";
        case "TSNonNullExpression":
          return "expression";
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
          return (f !== 64 || !o) && ["expression", !0];
        default:
          return super.isValidLVal(s, n, o, f);
      }
    }
    parseBindingAtom() {
      return this.state.type === 78 ? this.parseIdentifier(!0) : super.parseBindingAtom();
    }
    parseMaybeDecoratorArguments(s, n) {
      if (this.match(47) || this.match(51)) {
        const o = this.tsParseTypeArgumentsInExpression();
        if (this.match(10)) {
          const f = super.parseMaybeDecoratorArguments(s, n);
          return f.typeParameters = o, f;
        }
        this.unexpected(null, 10);
      }
      return super.parseMaybeDecoratorArguments(s, n);
    }
    checkCommaAfterRest(s) {
      return this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === s ? (this.next(), !1) : super.checkCommaAfterRest(s);
    }
    isClassMethod() {
      return this.match(47) || super.isClassMethod();
    }
    isClassProperty() {
      return this.match(35) || this.match(14) || super.isClassProperty();
    }
    parseMaybeDefault(s, n) {
      const o = super.parseMaybeDefault(s, n);
      return o.type === "AssignmentPattern" && o.typeAnnotation && o.right.start < o.typeAnnotation.start && this.raise(Q.TypeAnnotationAfterAssign, o.typeAnnotation), o;
    }
    getTokenFromCode(s) {
      if (this.state.inType) {
        if (s === 62) {
          this.finishOp(48, 1);
          return;
        }
        if (s === 60) {
          this.finishOp(47, 1);
          return;
        }
      }
      super.getTokenFromCode(s);
    }
    reScan_lt_gt() {
      const {
        type: s
      } = this.state;
      s === 47 ? (this.state.pos -= 1, this.readToken_lt()) : s === 48 && (this.state.pos -= 1, this.readToken_gt());
    }
    reScan_lt() {
      const {
        type: s
      } = this.state;
      return s === 51 ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : s;
    }
    toAssignableListItem(s, n, o) {
      const f = s[n];
      f.type === "TSTypeCastExpression" && (s[n] = this.typeCastToParameter(f)), super.toAssignableListItem(s, n, o);
    }
    typeCastToParameter(s) {
      return s.expression.typeAnnotation = s.typeAnnotation, this.resetEndLocation(s.expression, s.typeAnnotation.loc.end), s.expression;
    }
    shouldParseArrow(s) {
      return this.match(14) ? s.every((n) => this.isAssignable(n, !0)) : super.shouldParseArrow(s);
    }
    shouldParseAsyncArrow() {
      return this.match(14) || super.shouldParseAsyncArrow();
    }
    canHaveLeadingDecorator() {
      return super.canHaveLeadingDecorator() || this.isAbstractClass();
    }
    jsxParseOpeningElementAfterName(s) {
      if (this.match(47) || this.match(51)) {
        const n = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
        n && (s.typeParameters = n);
      }
      return super.jsxParseOpeningElementAfterName(s);
    }
    getGetterSetterExpectedParamCount(s) {
      const n = super.getGetterSetterExpectedParamCount(s), f = this.getObjectOrClassMethodParams(s)[0];
      return f && this.isThisParam(f) ? n + 1 : n;
    }
    parseCatchClauseParam() {
      const s = super.parseCatchClauseParam(), n = this.tsTryParseTypeAnnotation();
      return n && (s.typeAnnotation = n, this.resetEndLocation(s)), s;
    }
    tsInAmbientContext(s) {
      const {
        isAmbientContext: n,
        strict: o
      } = this.state;
      this.state.isAmbientContext = !0, this.state.strict = !1;
      try {
        return s();
      } finally {
        this.state.isAmbientContext = n, this.state.strict = o;
      }
    }
    parseClass(s, n, o) {
      const f = this.state.inAbstractClass;
      this.state.inAbstractClass = !!s.abstract;
      try {
        return super.parseClass(s, n, o);
      } finally {
        this.state.inAbstractClass = f;
      }
    }
    tsParseAbstractDeclaration(s, n) {
      if (this.match(80))
        return s.abstract = !0, this.maybeTakeDecorators(n, this.parseClass(s, !0, !1));
      if (this.isContextual(129))
        return this.hasFollowingLineBreak() ? null : (s.abstract = !0, this.raise(Q.NonClassMethodPropertyHasAbstractModifier, s), this.tsParseInterfaceDeclaration(s));
      throw this.unexpected(null, 80);
    }
    parseMethod(s, n, o, f, E, C, T) {
      const N = super.parseMethod(s, n, o, f, E, C, T);
      if ((N.abstract || N.type === "TSAbstractMethodDefinition") && (this.hasPlugin("estree") ? N.value : N).body) {
        const {
          key: j
        } = N;
        this.raise(Q.AbstractMethodHasImplementation, N, {
          methodName: j.type === "Identifier" && !N.computed ? j.name : `[${this.input.slice(this.offsetToSourcePos(j.start), this.offsetToSourcePos(j.end))}]`
        });
      }
      return N;
    }
    tsParseTypeParameterName() {
      return this.parseIdentifier().name;
    }
    shouldParseAsAmbientContext() {
      return !!this.getPluginOption("typescript", "dts");
    }
    parse() {
      return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.parse();
    }
    getExpression() {
      return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.getExpression();
    }
    parseExportSpecifier(s, n, o, f) {
      return !n && f ? (this.parseTypeOnlyImportExportSpecifier(s, !1, o), this.finishNode(s, "ExportSpecifier")) : (s.exportKind = "value", super.parseExportSpecifier(s, n, o, f));
    }
    parseImportSpecifier(s, n, o, f, E) {
      return !n && f ? (this.parseTypeOnlyImportExportSpecifier(s, !0, o), this.finishNode(s, "ImportSpecifier")) : (s.importKind = "value", super.parseImportSpecifier(s, n, o, f, o ? 4098 : 4096));
    }
    parseTypeOnlyImportExportSpecifier(s, n, o) {
      const f = n ? "imported" : "local", E = n ? "local" : "exported";
      let C = s[f], T, N = !1, D = !0;
      const V = C.loc.start;
      if (this.isContextual(93)) {
        const W = this.parseIdentifier();
        if (this.isContextual(93)) {
          const H = this.parseIdentifier();
          Ke(this.state.type) ? (N = !0, C = W, T = n ? this.parseIdentifier() : this.parseModuleExportName(), D = !1) : (T = H, D = !1);
        } else Ke(this.state.type) ? (D = !1, T = n ? this.parseIdentifier() : this.parseModuleExportName()) : (N = !0, C = W);
      } else Ke(this.state.type) && (N = !0, n ? (C = this.parseIdentifier(!0), this.isContextual(93) || this.checkReservedWord(C.name, C.loc.start, !0, !0)) : C = this.parseModuleExportName());
      N && o && this.raise(n ? Q.TypeModifierIsUsedInTypeImports : Q.TypeModifierIsUsedInTypeExports, V), s[f] = C, s[E] = T;
      const j = n ? "importKind" : "exportKind";
      s[j] = N ? "type" : "value", D && this.eatContextual(93) && (s[E] = n ? this.parseIdentifier() : this.parseModuleExportName()), s[E] || (s[E] = this.cloneIdentifier(s[f])), n && this.checkIdentifier(s[E], N ? 4098 : 4096);
    }
    fillOptionalPropertiesForTSESLint(s) {
      var n, o, f, E, C, T, N, D, V, j, W, H, re, me, te, fe, $t, kt, nl, al, ol, ll, cl, hl, ul, pl, fl, dl, ml, Al, gl, yl, Sl, xl, Il, El, bl, wl, Cl, vl, Tl, Pl, Nl, kl, Ol, _l, Dl, Bl;
      switch (s.type) {
        case "ExpressionStatement":
          (n = s.directive) != null || (s.directive = void 0);
          return;
        case "RestElement":
          s.value = void 0;
        case "Identifier":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "ObjectPattern":
          (o = s.decorators) != null || (s.decorators = []), (f = s.optional) != null || (s.optional = !1), (E = s.typeAnnotation) != null || (s.typeAnnotation = void 0);
          return;
        case "TSParameterProperty":
          (C = s.accessibility) != null || (s.accessibility = void 0), (T = s.decorators) != null || (s.decorators = []), (N = s.override) != null || (s.override = !1), (D = s.readonly) != null || (s.readonly = !1), (V = s.static) != null || (s.static = !1);
          return;
        case "TSEmptyBodyFunctionExpression":
          s.body = null;
        case "TSDeclareFunction":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ClassMethod":
        case "ClassPrivateMethod":
          (j = s.declare) != null || (s.declare = !1), (W = s.returnType) != null || (s.returnType = void 0), (H = s.typeParameters) != null || (s.typeParameters = void 0);
          return;
        case "Property":
          (re = s.optional) != null || (s.optional = !1);
          return;
        case "TSMethodSignature":
        case "TSPropertySignature":
          (me = s.optional) != null || (s.optional = !1);
        case "TSIndexSignature":
          (te = s.accessibility) != null || (s.accessibility = void 0), (fe = s.readonly) != null || (s.readonly = !1), ($t = s.static) != null || (s.static = !1);
          return;
        case "TSAbstractPropertyDefinition":
        case "PropertyDefinition":
        case "TSAbstractAccessorProperty":
        case "AccessorProperty":
          (kt = s.declare) != null || (s.declare = !1), (nl = s.definite) != null || (s.definite = !1), (al = s.readonly) != null || (s.readonly = !1), (ol = s.typeAnnotation) != null || (s.typeAnnotation = void 0);
        case "TSAbstractMethodDefinition":
        case "MethodDefinition":
          (ll = s.accessibility) != null || (s.accessibility = void 0), (cl = s.decorators) != null || (s.decorators = []), (hl = s.override) != null || (s.override = !1), (ul = s.optional) != null || (s.optional = !1);
          return;
        case "ClassExpression":
          (pl = s.id) != null || (s.id = null);
        case "ClassDeclaration":
          (fl = s.abstract) != null || (s.abstract = !1), (dl = s.declare) != null || (s.declare = !1), (ml = s.decorators) != null || (s.decorators = []), (Al = s.implements) != null || (s.implements = []), (gl = s.superTypeArguments) != null || (s.superTypeArguments = void 0), (yl = s.typeParameters) != null || (s.typeParameters = void 0);
          return;
        case "TSTypeAliasDeclaration":
        case "VariableDeclaration":
          (Sl = s.declare) != null || (s.declare = !1);
          return;
        case "VariableDeclarator":
          (xl = s.definite) != null || (s.definite = !1);
          return;
        case "TSEnumDeclaration":
          (Il = s.const) != null || (s.const = !1), (El = s.declare) != null || (s.declare = !1);
          return;
        case "TSEnumMember":
          (bl = s.computed) != null || (s.computed = !1);
          return;
        case "TSImportType":
          (wl = s.qualifier) != null || (s.qualifier = null), (Cl = s.options) != null || (s.options = null);
          return;
        case "TSInterfaceDeclaration":
          (vl = s.declare) != null || (s.declare = !1), (Tl = s.extends) != null || (s.extends = []);
          return;
        case "TSMappedType":
          (Pl = s.optional) != null || (s.optional = !1), (Nl = s.readonly) != null || (s.readonly = void 0);
          return;
        case "TSModuleDeclaration":
          (kl = s.declare) != null || (s.declare = !1), (Ol = s.global) != null || (s.global = s.kind === "global");
          return;
        case "TSTypeParameter":
          (_l = s.const) != null || (s.const = !1), (Dl = s.in) != null || (s.in = !1), (Bl = s.out) != null || (s.out = !1);
          return;
      }
    }
    chStartsBindingIdentifierAndNotRelationalOperator(s, n) {
      if (ut(s)) {
        if (hn.lastIndex = n, hn.test(this.input)) {
          const o = this.codePointAtPos(hn.lastIndex);
          if (!Wt(o) && o !== 92)
            return !1;
        }
        return !0;
      } else return s === 92;
    }
    nextTokenIsIdentifierAndNotTSRelationalOperatorOnSameLine() {
      const s = this.nextTokenInLineStart(), n = this.codePointAtPos(s);
      return this.chStartsBindingIdentifierAndNotRelationalOperator(n, s);
    }
    nextTokenIsIdentifierOrStringLiteralOnSameLine() {
      const s = this.nextTokenInLineStart(), n = this.codePointAtPos(s);
      return this.chStartsBindingIdentifier(n, s) || n === 34 || n === 39;
    }
  };
  function xd(x) {
    if (x.type !== "MemberExpression") return !1;
    const {
      computed: r,
      property: s
    } = x;
    return r && s.type !== "StringLiteral" && (s.type !== "TemplateLiteral" || s.expressions.length > 0) ? !1 : qo(x.object);
  }
  function Id(x, r) {
    var s;
    const {
      type: n
    } = x;
    if ((s = x.extra) != null && s.parenthesized)
      return !1;
    if (r) {
      if (n === "Literal") {
        const {
          value: o
        } = x;
        if (typeof o == "string" || typeof o == "boolean")
          return !0;
      }
    } else if (n === "StringLiteral" || n === "BooleanLiteral")
      return !0;
    return !!(Zo(x, r) || Ed(x, r) || n === "TemplateLiteral" && x.expressions.length === 0 || xd(x));
  }
  function Zo(x, r) {
    return r ? x.type === "Literal" && (typeof x.value == "number" || "bigint" in x) : x.type === "NumericLiteral" || x.type === "BigIntLiteral";
  }
  function Ed(x, r) {
    if (x.type === "UnaryExpression") {
      const {
        operator: s,
        argument: n
      } = x;
      if (s === "-" && Zo(n, r))
        return !0;
    }
    return !1;
  }
  function qo(x) {
    return x.type === "Identifier" ? !0 : x.type !== "MemberExpression" || x.computed ? !1 : qo(x.object);
  }
  const zo = v`placeholders`({
    ClassNameIsRequired: "A class name is required.",
    UnexpectedSpace: "Unexpected space in placeholder."
  });
  var bd = (x) => class extends x {
    parsePlaceholder(s) {
      if (this.match(133)) {
        const n = this.startNode();
        return this.next(), this.assertNoSpace(), n.name = super.parseIdentifier(!0), this.assertNoSpace(), this.expect(133), this.finishPlaceholder(n, s);
      }
    }
    finishPlaceholder(s, n) {
      let o = s;
      return (!o.expectedNode || !o.type) && (o = this.finishNode(o, "Placeholder")), o.expectedNode = n, o;
    }
    getTokenFromCode(s) {
      s === 37 && this.input.charCodeAt(this.state.pos + 1) === 37 ? this.finishOp(133, 2) : super.getTokenFromCode(s);
    }
    parseExprAtom(s) {
      return this.parsePlaceholder("Expression") || super.parseExprAtom(s);
    }
    parseIdentifier(s) {
      return this.parsePlaceholder("Identifier") || super.parseIdentifier(s);
    }
    checkReservedWord(s, n, o, f) {
      s !== void 0 && super.checkReservedWord(s, n, o, f);
    }
    cloneIdentifier(s) {
      const n = super.cloneIdentifier(s);
      return n.type === "Placeholder" && (n.expectedNode = s.expectedNode), n;
    }
    cloneStringLiteral(s) {
      return s.type === "Placeholder" ? this.cloneIdentifier(s) : super.cloneStringLiteral(s);
    }
    parseBindingAtom() {
      return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
    }
    isValidLVal(s, n, o, f) {
      return s === "Placeholder" || super.isValidLVal(s, n, o, f);
    }
    toAssignable(s, n) {
      s && s.type === "Placeholder" && s.expectedNode === "Expression" ? s.expectedNode = "Pattern" : super.toAssignable(s, n);
    }
    chStartsBindingIdentifier(s, n) {
      if (super.chStartsBindingIdentifier(s, n))
        return !0;
      const o = this.nextTokenStart();
      return this.input.charCodeAt(o) === 37 && this.input.charCodeAt(o + 1) === 37;
    }
    verifyBreakContinue(s, n) {
      var o;
      ((o = s.label) == null ? void 0 : o.type) !== "Placeholder" && super.verifyBreakContinue(s, n);
    }
    parseExpressionStatement(s, n) {
      var o;
      if (n.type !== "Placeholder" || (o = n.extra) != null && o.parenthesized)
        return super.parseExpressionStatement(s, n);
      if (this.match(14)) {
        const E = s;
        return E.label = this.finishPlaceholder(n, "Identifier"), this.next(), E.body = super.parseStatementOrSloppyAnnexBFunctionDeclaration(), this.finishNode(E, "LabeledStatement");
      }
      this.semicolon();
      const f = s;
      return f.name = n.name, this.finishPlaceholder(f, "Statement");
    }
    parseBlock(s, n, o) {
      return this.parsePlaceholder("BlockStatement") || super.parseBlock(s, n, o);
    }
    parseFunctionId(s) {
      return this.parsePlaceholder("Identifier") || super.parseFunctionId(s);
    }
    parseClass(s, n, o) {
      const f = n ? "ClassDeclaration" : "ClassExpression";
      this.next();
      const E = this.state.strict, C = this.parsePlaceholder("Identifier");
      if (C)
        if (this.match(81) || this.match(133) || this.match(5))
          s.id = C;
        else {
          if (o || !n)
            return s.id = null, s.body = this.finishPlaceholder(C, "ClassBody"), this.finishNode(s, f);
          throw this.raise(zo.ClassNameIsRequired, this.state.startLoc);
        }
      else
        this.parseClassId(s, n, o);
      return super.parseClassSuper(s), s.body = this.parsePlaceholder("ClassBody") || super.parseClassBody(!!s.superClass, E), this.finishNode(s, f);
    }
    parseExport(s, n) {
      const o = this.parsePlaceholder("Identifier");
      if (!o) return super.parseExport(s, n);
      const f = s;
      if (!this.isContextual(98) && !this.match(12))
        return f.specifiers = [], f.source = null, f.declaration = this.finishPlaceholder(o, "Declaration"), this.finishNode(f, "ExportNamedDeclaration");
      this.expectPlugin("exportDefaultFrom");
      const E = this.startNode();
      return E.exported = o, f.specifiers = [this.finishNode(E, "ExportDefaultSpecifier")], super.parseExport(f, n);
    }
    isExportDefaultSpecifier() {
      if (this.match(65)) {
        const s = this.nextTokenStart();
        if (this.isUnparsedContextual(s, "from") && this.input.startsWith(Tt(133), this.nextTokenStartSince(s + 4)))
          return !0;
      }
      return super.isExportDefaultSpecifier();
    }
    maybeParseExportDefaultSpecifier(s, n) {
      var o;
      return (o = s.specifiers) != null && o.length ? !0 : super.maybeParseExportDefaultSpecifier(s, n);
    }
    checkExport(s) {
      const {
        specifiers: n
      } = s;
      n != null && n.length && (s.specifiers = n.filter((o) => o.exported.type === "Placeholder")), super.checkExport(s), s.specifiers = n;
    }
    parseImport(s) {
      const n = this.parsePlaceholder("Identifier");
      if (!n) return super.parseImport(s);
      if (s.specifiers = [], !this.isContextual(98) && !this.match(12))
        return s.source = this.finishPlaceholder(n, "StringLiteral"), this.semicolon(), this.finishNode(s, "ImportDeclaration");
      const o = this.startNodeAtNode(n);
      return o.local = n, s.specifiers.push(this.finishNode(o, "ImportDefaultSpecifier")), this.eat(12) && (this.maybeParseStarImportSpecifier(s) || this.parseNamedImportSpecifiers(s)), this.expectContextual(98), s.source = this.parseImportSource(), this.semicolon(), this.finishNode(s, "ImportDeclaration");
    }
    parseImportSource() {
      return this.parsePlaceholder("StringLiteral") || super.parseImportSource();
    }
    assertNoSpace() {
      this.state.start > this.offsetToSourcePos(this.state.lastTokEndLoc.index) && this.raise(zo.UnexpectedSpace, this.state.lastTokEndLoc);
    }
  }, wd = (x) => class extends x {
    parseV8Intrinsic() {
      if (this.match(54)) {
        const s = this.state.startLoc, n = this.startNode();
        if (this.next(), ae(this.state.type)) {
          const o = this.parseIdentifierName(), f = this.createIdentifier(n, o);
          if (this.castNodeTo(f, "V8IntrinsicIdentifier"), this.match(10))
            return f;
        }
        this.unexpected(s);
      }
    }
    parseExprAtom(s) {
      return this.parseV8Intrinsic() || super.parseExprAtom(s);
    }
  };
  const el = ["minimal", "fsharp", "hack", "smart"], tl = ["^^", "@@", "^", "%", "#"];
  function Cd(x) {
    if (x.has("decorators")) {
      if (x.has("decorators-legacy"))
        throw new Error("Cannot use the decorators and decorators-legacy plugin together");
      const n = x.get("decorators").decoratorsBeforeExport;
      if (n != null && typeof n != "boolean")
        throw new Error("'decoratorsBeforeExport' must be a boolean, if specified.");
      const o = x.get("decorators").allowCallParenthesized;
      if (o != null && typeof o != "boolean")
        throw new Error("'allowCallParenthesized' must be a boolean.");
    }
    if (x.has("flow") && x.has("typescript"))
      throw new Error("Cannot combine flow and typescript plugins.");
    if (x.has("placeholders") && x.has("v8intrinsic"))
      throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
    if (x.has("pipelineOperator")) {
      var r;
      const n = x.get("pipelineOperator").proposal;
      if (!el.includes(n)) {
        const o = el.map((f) => `"${f}"`).join(", ");
        throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${o}.`);
      }
      if (n === "hack") {
        var s;
        if (x.has("placeholders"))
          throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
        if (x.has("v8intrinsic"))
          throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
        const o = x.get("pipelineOperator").topicToken;
        if (!tl.includes(o)) {
          const f = tl.map((E) => `"${E}"`).join(", ");
          throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${f}.`);
        }
        if (o === "#" && ((s = x.get("recordAndTuple")) == null ? void 0 : s.syntaxType) === "hash")
          throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "hack", topicToken: "#" }]\` and \`${JSON.stringify(["recordAndTuple", x.get("recordAndTuple")])}\`.`);
      } else if (n === "smart" && ((r = x.get("recordAndTuple")) == null ? void 0 : r.syntaxType) === "hash")
        throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "smart" }]\` and \`${JSON.stringify(["recordAndTuple", x.get("recordAndTuple")])}\`.`);
    }
    if (x.has("moduleAttributes")) {
      if (x.has("deprecatedImportAssert") || x.has("importAssertions"))
        throw new Error("Cannot combine importAssertions, deprecatedImportAssert and moduleAttributes plugins.");
      if (x.get("moduleAttributes").version !== "may-2020")
        throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
    }
    if (x.has("importAssertions") && x.has("deprecatedImportAssert"))
      throw new Error("Cannot combine importAssertions and deprecatedImportAssert plugins.");
    if (x.has("deprecatedImportAssert") || x.has("importAttributes") && x.get("importAttributes").deprecatedAssertSyntax && x.set("deprecatedImportAssert", {}), x.has("recordAndTuple")) {
      const n = x.get("recordAndTuple").syntaxType;
      if (n != null) {
        const o = ["hash", "bar"];
        if (!o.includes(n))
          throw new Error("The 'syntaxType' option of the 'recordAndTuple' plugin must be one of: " + o.map((f) => `'${f}'`).join(", "));
      }
    }
    if (x.has("asyncDoExpressions") && !x.has("doExpressions")) {
      const n = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
      throw n.missingPlugins = "doExpressions", n;
    }
    if (x.has("optionalChainingAssign") && x.get("optionalChainingAssign").version !== "2023-07")
      throw new Error("The 'optionalChainingAssign' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is '2023-07'.");
    if (x.has("discardBinding") && x.get("discardBinding").syntaxType !== "void")
      throw new Error("The 'discardBinding' plugin requires a 'syntaxType' option. Currently the only supported value is 'void'.");
  }
  const sl = {
    estree: k,
    jsx: Jf,
    flow: Qf,
    typescript: Sd,
    v8intrinsic: wd,
    placeholders: bd
  }, vd = Object.keys(sl);
  class Td extends md {
    checkProto(r, s, n, o) {
      if (r.type === "SpreadElement" || this.isObjectMethod(r) || r.computed || r.shorthand)
        return n;
      const f = r.key;
      return (f.type === "Identifier" ? f.name : f.value) === "__proto__" ? s ? (this.raise(S.RecordNoProto, f), !0) : (n && (o ? o.doubleProtoLoc === null && (o.doubleProtoLoc = f.loc.start) : this.raise(S.DuplicateProto, f)), !0) : n;
    }
    shouldExitDescending(r, s) {
      return r.type === "ArrowFunctionExpression" && this.offsetToSourcePos(r.start) === s;
    }
    getExpression() {
      if (this.enterInitialScopes(), this.nextToken(), this.match(140))
        throw this.raise(S.ParseExpressionEmptyInput, this.state.startLoc);
      const r = this.parseExpression();
      if (!this.match(140))
        throw this.raise(S.ParseExpressionExpectsEOF, this.state.startLoc, {
          unexpected: this.input.codePointAt(this.state.start)
        });
      return this.finalizeRemainingComments(), r.comments = this.comments, r.errors = this.state.errors, this.optionFlags & 256 && (r.tokens = this.tokens), r;
    }
    parseExpression(r, s) {
      return r ? this.disallowInAnd(() => this.parseExpressionBase(s)) : this.allowInAnd(() => this.parseExpressionBase(s));
    }
    parseExpressionBase(r) {
      const s = this.state.startLoc, n = this.parseMaybeAssign(r);
      if (this.match(12)) {
        const o = this.startNodeAt(s);
        for (o.expressions = [n]; this.eat(12); )
          o.expressions.push(this.parseMaybeAssign(r));
        return this.toReferencedList(o.expressions), this.finishNode(o, "SequenceExpression");
      }
      return n;
    }
    parseMaybeAssignDisallowIn(r, s) {
      return this.disallowInAnd(() => this.parseMaybeAssign(r, s));
    }
    parseMaybeAssignAllowIn(r, s) {
      return this.allowInAnd(() => this.parseMaybeAssign(r, s));
    }
    setOptionalParametersError(r) {
      r.optionalParametersLoc = this.state.startLoc;
    }
    parseMaybeAssign(r, s) {
      const n = this.state.startLoc, o = this.isContextual(108);
      if (o && this.prodParam.hasYield) {
        this.next();
        let T = this.parseYield(n);
        return s && (T = s.call(this, T, n)), T;
      }
      let f;
      r ? f = !1 : (r = new Ei(), f = !0);
      const {
        type: E
      } = this.state;
      (E === 10 || ae(E)) && (this.state.potentialArrowAt = this.state.start);
      let C = this.parseMaybeConditional(r);
      if (s && (C = s.call(this, C, n)), xf(this.state.type)) {
        const T = this.startNodeAt(n), N = this.state.value;
        if (T.operator = N, this.match(29)) {
          this.toAssignable(C, !0), T.left = C;
          const D = n.index;
          r.doubleProtoLoc != null && r.doubleProtoLoc.index >= D && (r.doubleProtoLoc = null), r.shorthandAssignLoc != null && r.shorthandAssignLoc.index >= D && (r.shorthandAssignLoc = null), r.privateKeyLoc != null && r.privateKeyLoc.index >= D && (this.checkDestructuringPrivate(r), r.privateKeyLoc = null), r.voidPatternLoc != null && r.voidPatternLoc.index >= D && (r.voidPatternLoc = null);
        } else
          T.left = C;
        return this.next(), T.right = this.parseMaybeAssign(), this.checkLVal(C, this.finishNode(T, "AssignmentExpression"), void 0, void 0, void 0, void 0, N === "||=" || N === "&&=" || N === "??="), T;
      } else f && this.checkExpressionErrors(r, !0);
      if (o) {
        const {
          type: T
        } = this.state;
        if ((this.hasPlugin("v8intrinsic") ? Vs(T) : Vs(T) && !this.match(54)) && !this.isAmbiguousPrefixOrIdentifier())
          return this.raiseOverwrite(S.YieldNotInGeneratorFunction, n), this.parseYield(n);
      }
      return C;
    }
    parseMaybeConditional(r) {
      const s = this.state.startLoc, n = this.state.potentialArrowAt, o = this.parseExprOps(r);
      return this.shouldExitDescending(o, n) ? o : this.parseConditional(o, s, r);
    }
    parseConditional(r, s, n) {
      if (this.eat(17)) {
        const o = this.startNodeAt(s);
        return o.test = r, o.consequent = this.parseMaybeAssignAllowIn(), this.expect(14), o.alternate = this.parseMaybeAssign(), this.finishNode(o, "ConditionalExpression");
      }
      return r;
    }
    parseMaybeUnaryOrPrivate(r) {
      return this.match(139) ? this.parsePrivateName() : this.parseMaybeUnary(r);
    }
    parseExprOps(r) {
      const s = this.state.startLoc, n = this.state.potentialArrowAt, o = this.parseMaybeUnaryOrPrivate(r);
      return this.shouldExitDescending(o, n) ? o : this.parseExprOp(o, s, -1);
    }
    parseExprOp(r, s, n) {
      if (this.isPrivateName(r)) {
        const f = this.getPrivateNameSV(r);
        (n >= Ai(58) || !this.prodParam.hasIn || !this.match(58)) && this.raise(S.PrivateInExpectedIn, r, {
          identifierName: f
        }), this.classScope.usePrivateName(f, r.loc.start);
      }
      const o = this.state.type;
      if (Ef(o) && (this.prodParam.hasIn || !this.match(58))) {
        let f = Ai(o);
        if (f > n) {
          if (o === 39) {
            if (this.expectPlugin("pipelineOperator"), this.state.inFSharpPipelineDirectBody)
              return r;
            this.checkPipelineAtInfixOperator(r, s);
          }
          const E = this.startNodeAt(s);
          E.left = r, E.operator = this.state.value;
          const C = o === 41 || o === 42, T = o === 40;
          if (T && (f = Ai(42)), this.next(), o === 39 && this.hasPlugin(["pipelineOperator", {
            proposal: "minimal"
          }]) && this.state.type === 96 && this.prodParam.hasAwait)
            throw this.raise(S.UnexpectedAwaitAfterPipelineBody, this.state.startLoc);
          E.right = this.parseExprOpRightExpr(o, f);
          const N = this.finishNode(E, C || T ? "LogicalExpression" : "BinaryExpression"), D = this.state.type;
          if (T && (D === 41 || D === 42) || C && D === 40)
            throw this.raise(S.MixingCoalesceWithLogical, this.state.startLoc);
          return this.parseExprOp(N, s, n);
        }
      }
      return r;
    }
    parseExprOpRightExpr(r, s) {
      const n = this.state.startLoc;
      switch (r) {
        case 39:
          switch (this.getPluginOption("pipelineOperator", "proposal")) {
            case "hack":
              return this.withTopicBindingContext(() => this.parseHackPipeBody());
            case "fsharp":
              return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(s));
          }
          if (this.getPluginOption("pipelineOperator", "proposal") === "smart")
            return this.withTopicBindingContext(() => {
              if (this.prodParam.hasYield && this.isContextual(108))
                throw this.raise(S.PipeBodyIsTighter, this.state.startLoc);
              return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(r, s), n);
            });
        default:
          return this.parseExprOpBaseRightExpr(r, s);
      }
    }
    parseExprOpBaseRightExpr(r, s) {
      const n = this.state.startLoc;
      return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), n, Tf(r) ? s - 1 : s);
    }
    parseHackPipeBody() {
      var r;
      const {
        startLoc: s
      } = this.state, n = this.parseMaybeAssign();
      return A.has(n.type) && !((r = n.extra) != null && r.parenthesized) && this.raise(S.PipeUnparenthesizedBody, s, {
        type: n.type
      }), this.topicReferenceWasUsedInCurrentContext() || this.raise(S.PipeTopicUnused, s), n;
    }
    checkExponentialAfterUnary(r) {
      this.match(57) && this.raise(S.UnexpectedTokenUnaryExponentiation, r.argument);
    }
    parseMaybeUnary(r, s) {
      const n = this.state.startLoc, o = this.isContextual(96);
      if (o && this.recordAwaitIfAllowed()) {
        this.next();
        const T = this.parseAwait(n);
        return s || this.checkExponentialAfterUnary(T), T;
      }
      const f = this.match(34), E = this.startNode();
      if (wf(this.state.type)) {
        E.operator = this.state.value, E.prefix = !0, this.match(72) && this.expectPlugin("throwExpressions");
        const T = this.match(89);
        if (this.next(), E.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(r, !0), this.state.strict && T) {
          const N = E.argument;
          N.type === "Identifier" ? this.raise(S.StrictDelete, E) : this.hasPropertyAsPrivateName(N) && this.raise(S.DeletePrivateField, E);
        }
        if (!f)
          return s || this.checkExponentialAfterUnary(E), this.finishNode(E, "UnaryExpression");
      }
      const C = this.parseUpdate(E, f, r);
      if (o) {
        const {
          type: T
        } = this.state;
        if ((this.hasPlugin("v8intrinsic") ? Vs(T) : Vs(T) && !this.match(54)) && !this.isAmbiguousPrefixOrIdentifier())
          return this.raiseOverwrite(S.AwaitNotInAsyncContext, n), this.parseAwait(n);
      }
      return C;
    }
    parseUpdate(r, s, n) {
      if (s) {
        const E = r;
        return this.checkLVal(E.argument, this.finishNode(E, "UpdateExpression")), r;
      }
      const o = this.state.startLoc;
      let f = this.parseExprSubscripts(n);
      if (this.checkExpressionErrors(n, !1)) return f;
      for (; bf(this.state.type) && !this.canInsertSemicolon(); ) {
        const E = this.startNodeAt(o);
        E.operator = this.state.value, E.prefix = !1, E.argument = f, this.next(), this.checkLVal(f, f = this.finishNode(E, "UpdateExpression"));
      }
      return f;
    }
    parseExprSubscripts(r) {
      const s = this.state.startLoc, n = this.state.potentialArrowAt, o = this.parseExprAtom(r);
      return this.shouldExitDescending(o, n) ? o : this.parseSubscripts(o, s);
    }
    parseSubscripts(r, s, n) {
      const o = {
        optionalChainMember: !1,
        maybeAsyncArrow: this.atPossibleAsyncArrow(r),
        stop: !1
      };
      do
        r = this.parseSubscript(r, s, n, o), o.maybeAsyncArrow = !1;
      while (!o.stop);
      return r;
    }
    parseSubscript(r, s, n, o) {
      const {
        type: f
      } = this.state;
      if (!n && f === 15)
        return this.parseBind(r, s, o);
      if (gi(f))
        return this.parseTaggedTemplateExpression(r, s, o);
      let E = !1;
      if (f === 18) {
        if (n && (this.raise(S.OptionalChainingNoNew, this.state.startLoc), this.lookaheadCharCode() === 40))
          return this.stopParseSubscript(r, o);
        o.optionalChainMember = E = !0, this.next();
      }
      if (!n && this.match(10))
        return this.parseCoverCallAndAsyncArrowHead(r, s, o, E);
      {
        const C = this.eat(0);
        return C || E || this.eat(16) ? this.parseMember(r, s, o, C, E) : this.stopParseSubscript(r, o);
      }
    }
    stopParseSubscript(r, s) {
      return s.stop = !0, r;
    }
    parseMember(r, s, n, o, f) {
      const E = this.startNodeAt(s);
      return E.object = r, E.computed = o, o ? (E.property = this.parseExpression(), this.expect(3)) : this.match(139) ? (r.type === "Super" && this.raise(S.SuperPrivateField, s), this.classScope.usePrivateName(this.state.value, this.state.startLoc), E.property = this.parsePrivateName()) : E.property = this.parseIdentifier(!0), n.optionalChainMember ? (E.optional = f, this.finishNode(E, "OptionalMemberExpression")) : this.finishNode(E, "MemberExpression");
    }
    parseBind(r, s, n) {
      const o = this.startNodeAt(s);
      o.object = r, this.next();
      const f = this.match(83), E = this.parseNoCallExpr();
      if (E.type === "Super" || f && E.type === "ImportExpression" || E.type === "Import")
        throw this.raise(S.UnsupportedBindRHS, E);
      return o.callee = E, n.stop = !0, this.parseSubscripts(this.finishNode(o, "BindExpression"), s, !1);
    }
    parseCoverCallAndAsyncArrowHead(r, s, n, o) {
      const f = this.state.maybeInArrowParameters;
      let E = null;
      this.state.maybeInArrowParameters = !0, this.next();
      const C = this.startNodeAt(s);
      C.callee = r;
      const {
        maybeAsyncArrow: T,
        optionalChainMember: N
      } = n;
      T && (this.expressionScope.enter(pd()), E = new Ei()), N && (C.optional = o), o ? C.arguments = this.parseCallExpressionArguments() : C.arguments = this.parseCallExpressionArguments(r.type !== "Super", C, E);
      let D = this.finishCallExpression(C, N);
      return T && this.shouldParseAsyncArrow() && !o ? (n.stop = !0, this.checkDestructuringPrivate(E), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), D = this.parseAsyncArrowFromCallExpression(this.startNodeAt(s), D)) : (T && (this.checkExpressionErrors(E, !0), this.expressionScope.exit()), this.toReferencedArguments(D)), this.state.maybeInArrowParameters = f, D;
    }
    toReferencedArguments(r, s) {
      this.toReferencedListDeep(r.arguments, s);
    }
    parseTaggedTemplateExpression(r, s, n) {
      const o = this.startNodeAt(s);
      return o.tag = r, o.quasi = this.parseTemplate(!0), n.optionalChainMember && this.raise(S.OptionalChainingNoTemplate, s), this.finishNode(o, "TaggedTemplateExpression");
    }
    atPossibleAsyncArrow(r) {
      return r.type === "Identifier" && r.name === "async" && this.state.lastTokEndLoc.index === r.end && !this.canInsertSemicolon() && r.end - r.start === 5 && this.offsetToSourcePos(r.start) === this.state.potentialArrowAt;
    }
    finishCallExpression(r, s) {
      if (r.callee.type === "Import")
        if (r.arguments.length === 0 || r.arguments.length > 2)
          this.raise(S.ImportCallArity, r);
        else
          for (const n of r.arguments)
            n.type === "SpreadElement" && this.raise(S.ImportCallSpreadArgument, n);
      return this.finishNode(r, s ? "OptionalCallExpression" : "CallExpression");
    }
    parseCallExpressionArguments(r, s, n) {
      const o = [];
      let f = !0;
      const E = this.state.inFSharpPipelineDirectBody;
      for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(11); ) {
        if (f)
          f = !1;
        else if (this.expect(12), this.match(11)) {
          s && this.addTrailingCommaExtraToNode(s), this.next();
          break;
        }
        o.push(this.parseExprListItem(11, !1, n, r));
      }
      return this.state.inFSharpPipelineDirectBody = E, o;
    }
    shouldParseAsyncArrow() {
      return this.match(19) && !this.canInsertSemicolon();
    }
    parseAsyncArrowFromCallExpression(r, s) {
      var n;
      return this.resetPreviousNodeTrailingComments(s), this.expect(19), this.parseArrowExpression(r, s.arguments, !0, (n = s.extra) == null ? void 0 : n.trailingCommaLoc), s.innerComments && Gs(r, s.innerComments), s.callee.trailingComments && Gs(r, s.callee.trailingComments), r;
    }
    parseNoCallExpr() {
      const r = this.state.startLoc;
      return this.parseSubscripts(this.parseExprAtom(), r, !0);
    }
    parseExprAtom(r) {
      let s, n = null;
      const {
        type: o
      } = this.state;
      switch (o) {
        case 79:
          return this.parseSuper();
        case 83:
          return s = this.startNode(), this.next(), this.match(16) ? this.parseImportMetaPropertyOrPhaseCall(s) : this.match(10) ? this.optionFlags & 512 ? this.parseImportCall(s) : this.finishNode(s, "Import") : (this.raise(S.UnsupportedImport, this.state.lastTokStartLoc), this.finishNode(s, "Import"));
        case 78:
          return s = this.startNode(), this.next(), this.finishNode(s, "ThisExpression");
        case 90:
          return this.parseDo(this.startNode(), !1);
        case 56:
        case 31:
          return this.readRegexp(), this.parseRegExpLiteral(this.state.value);
        case 135:
          return this.parseNumericLiteral(this.state.value);
        case 136:
          return this.parseBigIntLiteral(this.state.value);
        case 134:
          return this.parseStringLiteral(this.state.value);
        case 84:
          return this.parseNullLiteral();
        case 85:
          return this.parseBooleanLiteral(!0);
        case 86:
          return this.parseBooleanLiteral(!1);
        case 10: {
          const f = this.state.potentialArrowAt === this.state.start;
          return this.parseParenAndDistinguishExpression(f);
        }
        case 0:
          return this.parseArrayLike(3, !1, r);
        case 5:
          return this.parseObjectLike(8, !1, !1, r);
        case 68:
          return this.parseFunctionOrFunctionSent();
        case 26:
          n = this.parseDecorators();
        case 80:
          return this.parseClass(this.maybeTakeDecorators(n, this.startNode()), !1);
        case 77:
          return this.parseNewOrNewTarget();
        case 25:
        case 24:
          return this.parseTemplate(!1);
        case 15: {
          s = this.startNode(), this.next(), s.object = null;
          const f = s.callee = this.parseNoCallExpr();
          if (f.type === "MemberExpression")
            return this.finishNode(s, "BindExpression");
          throw this.raise(S.UnsupportedBind, f);
        }
        case 139:
          return this.raise(S.PrivateInExpectedIn, this.state.startLoc, {
            identifierName: this.state.value
          }), this.parsePrivateName();
        case 33:
          return this.parseTopicReferenceThenEqualsSign(54, "%");
        case 32:
          return this.parseTopicReferenceThenEqualsSign(44, "^");
        case 37:
        case 38:
          return this.parseTopicReference("hack");
        case 44:
        case 54:
        case 27: {
          const f = this.getPluginOption("pipelineOperator", "proposal");
          if (f)
            return this.parseTopicReference(f);
          throw this.unexpected();
        }
        case 47: {
          const f = this.input.codePointAt(this.nextTokenStart());
          throw ut(f) || f === 62 ? this.expectOnePlugin(["jsx", "flow", "typescript"]) : this.unexpected();
        }
        default:
          if (o === 137)
            return this.parseDecimalLiteral(this.state.value);
          if (o === 2 || o === 1)
            return this.parseArrayLike(this.state.type === 2 ? 4 : 3, !0);
          if (o === 6 || o === 7)
            return this.parseObjectLike(this.state.type === 6 ? 9 : 8, !1, !0);
          if (ae(o)) {
            if (this.isContextual(127) && this.lookaheadInLineCharCode() === 123)
              return this.parseModuleExpression();
            const f = this.state.potentialArrowAt === this.state.start, E = this.state.containsEsc, C = this.parseIdentifier();
            if (!E && C.name === "async" && !this.canInsertSemicolon()) {
              const {
                type: T
              } = this.state;
              if (T === 68)
                return this.resetPreviousNodeTrailingComments(C), this.next(), this.parseAsyncFunctionExpression(this.startNodeAtNode(C));
              if (ae(T))
                return f && this.lookaheadCharCode() === 61 ? this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(C)) : C;
              if (T === 90)
                return this.resetPreviousNodeTrailingComments(C), this.parseDo(this.startNodeAtNode(C), !0);
            }
            return f && this.match(19) && !this.canInsertSemicolon() ? (this.next(), this.parseArrowExpression(this.startNodeAtNode(C), [C], !1)) : C;
          } else
            throw this.unexpected();
      }
    }
    parseTopicReferenceThenEqualsSign(r, s) {
      const n = this.getPluginOption("pipelineOperator", "proposal");
      if (n)
        return this.state.type = r, this.state.value = s, this.state.pos--, this.state.end--, this.state.endLoc = a(this.state.endLoc, -1), this.parseTopicReference(n);
      throw this.unexpected();
    }
    parseTopicReference(r) {
      const s = this.startNode(), n = this.state.startLoc, o = this.state.type;
      return this.next(), this.finishTopicReference(s, n, r, o);
    }
    finishTopicReference(r, s, n, o) {
      if (this.testTopicReferenceConfiguration(n, s, o))
        return n === "hack" ? (this.topicReferenceIsAllowedInCurrentContext() || this.raise(S.PipeTopicUnbound, s), this.registerTopicReference(), this.finishNode(r, "TopicReference")) : (this.topicReferenceIsAllowedInCurrentContext() || this.raise(S.PrimaryTopicNotAllowed, s), this.registerTopicReference(), this.finishNode(r, "PipelinePrimaryTopicReference"));
      throw this.raise(S.PipeTopicUnconfiguredToken, s, {
        token: Tt(o)
      });
    }
    testTopicReferenceConfiguration(r, s, n) {
      switch (r) {
        case "hack":
          return this.hasPlugin(["pipelineOperator", {
            topicToken: Tt(n)
          }]);
        case "smart":
          return n === 27;
        default:
          throw this.raise(S.PipeTopicRequiresHackPipes, s);
      }
    }
    parseAsyncArrowUnaryFunction(r) {
      this.prodParam.enter(Si(!0, this.prodParam.hasYield));
      const s = [this.parseIdentifier()];
      return this.prodParam.exit(), this.hasPrecedingLineBreak() && this.raise(S.LineTerminatorBeforeArrow, this.state.curPosition()), this.expect(19), this.parseArrowExpression(r, s, !0);
    }
    parseDo(r, s) {
      this.expectPlugin("doExpressions"), s && this.expectPlugin("asyncDoExpressions"), r.async = s, this.next();
      const n = this.state.labels;
      return this.state.labels = [], s ? (this.prodParam.enter(2), r.body = this.parseBlock(), this.prodParam.exit()) : r.body = this.parseBlock(), this.state.labels = n, this.finishNode(r, "DoExpression");
    }
    parseSuper() {
      const r = this.startNode();
      return this.next(), this.match(10) && !this.scope.allowDirectSuper ? this.optionFlags & 16 || this.raise(S.SuperNotAllowed, r) : this.scope.allowSuper || this.optionFlags & 16 || this.raise(S.UnexpectedSuper, r), !this.match(10) && !this.match(0) && !this.match(16) && this.raise(S.UnsupportedSuper, r), this.finishNode(r, "Super");
    }
    parsePrivateName() {
      const r = this.startNode(), s = this.startNodeAt(a(this.state.startLoc, 1)), n = this.state.value;
      return this.next(), r.id = this.createIdentifier(s, n), this.finishNode(r, "PrivateName");
    }
    parseFunctionOrFunctionSent() {
      const r = this.startNode();
      if (this.next(), this.prodParam.hasYield && this.match(16)) {
        const s = this.createIdentifier(this.startNodeAtNode(r), "function");
        return this.next(), this.match(103) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected(), this.parseMetaProperty(r, s, "sent");
      }
      return this.parseFunction(r);
    }
    parseMetaProperty(r, s, n) {
      r.meta = s;
      const o = this.state.containsEsc;
      return r.property = this.parseIdentifier(!0), (r.property.name !== n || o) && this.raise(S.UnsupportedMetaProperty, r.property, {
        target: s.name,
        onlyValidPropertyName: n
      }), this.finishNode(r, "MetaProperty");
    }
    parseImportMetaPropertyOrPhaseCall(r) {
      if (this.next(), this.isContextual(105) || this.isContextual(97)) {
        const s = this.isContextual(105);
        return this.expectPlugin(s ? "sourcePhaseImports" : "deferredImportEvaluation"), this.next(), r.phase = s ? "source" : "defer", this.parseImportCall(r);
      } else {
        const s = this.createIdentifierAt(this.startNodeAtNode(r), "import", this.state.lastTokStartLoc);
        return this.isContextual(101) && (this.inModule || this.raise(S.ImportMetaOutsideModule, s), this.sawUnambiguousESM = !0), this.parseMetaProperty(r, s, "meta");
      }
    }
    parseLiteralAtNode(r, s, n) {
      return this.addExtra(n, "rawValue", r), this.addExtra(n, "raw", this.input.slice(this.offsetToSourcePos(n.start), this.state.end)), n.value = r, this.next(), this.finishNode(n, s);
    }
    parseLiteral(r, s) {
      const n = this.startNode();
      return this.parseLiteralAtNode(r, s, n);
    }
    parseStringLiteral(r) {
      return this.parseLiteral(r, "StringLiteral");
    }
    parseNumericLiteral(r) {
      return this.parseLiteral(r, "NumericLiteral");
    }
    parseBigIntLiteral(r) {
      return this.parseLiteral(r, "BigIntLiteral");
    }
    parseDecimalLiteral(r) {
      return this.parseLiteral(r, "DecimalLiteral");
    }
    parseRegExpLiteral(r) {
      const s = this.startNode();
      return this.addExtra(s, "raw", this.input.slice(this.offsetToSourcePos(s.start), this.state.end)), s.pattern = r.pattern, s.flags = r.flags, this.next(), this.finishNode(s, "RegExpLiteral");
    }
    parseBooleanLiteral(r) {
      const s = this.startNode();
      return s.value = r, this.next(), this.finishNode(s, "BooleanLiteral");
    }
    parseNullLiteral() {
      const r = this.startNode();
      return this.next(), this.finishNode(r, "NullLiteral");
    }
    parseParenAndDistinguishExpression(r) {
      const s = this.state.startLoc;
      let n;
      this.next(), this.expressionScope.enter(ud());
      const o = this.state.maybeInArrowParameters, f = this.state.inFSharpPipelineDirectBody;
      this.state.maybeInArrowParameters = !0, this.state.inFSharpPipelineDirectBody = !1;
      const E = this.state.startLoc, C = [], T = new Ei();
      let N = !0, D, V;
      for (; !this.match(11); ) {
        if (N)
          N = !1;
        else if (this.expect(12, T.optionalParametersLoc === null ? null : T.optionalParametersLoc), this.match(11)) {
          V = this.state.startLoc;
          break;
        }
        if (this.match(21)) {
          const H = this.state.startLoc;
          if (D = this.state.startLoc, C.push(this.parseParenItem(this.parseRestBinding(), H)), !this.checkCommaAfterRest(41))
            break;
        } else
          C.push(this.parseMaybeAssignAllowInOrVoidPattern(11, T, this.parseParenItem));
      }
      const j = this.state.lastTokEndLoc;
      this.expect(11), this.state.maybeInArrowParameters = o, this.state.inFSharpPipelineDirectBody = f;
      let W = this.startNodeAt(s);
      return r && this.shouldParseArrow(C) && (W = this.parseArrow(W)) ? (this.checkDestructuringPrivate(T), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), this.parseArrowExpression(W, C, !1), W) : (this.expressionScope.exit(), C.length || this.unexpected(this.state.lastTokStartLoc), V && this.unexpected(V), D && this.unexpected(D), this.checkExpressionErrors(T, !0), this.toReferencedListDeep(C, !0), C.length > 1 ? (n = this.startNodeAt(E), n.expressions = C, this.finishNode(n, "SequenceExpression"), this.resetEndLocation(n, j)) : n = C[0], this.wrapParenthesis(s, n));
    }
    wrapParenthesis(r, s) {
      if (!(this.optionFlags & 1024))
        return this.addExtra(s, "parenthesized", !0), this.addExtra(s, "parenStart", r.index), this.takeSurroundingComments(s, r.index, this.state.lastTokEndLoc.index), s;
      const n = this.startNodeAt(r);
      return n.expression = s, this.finishNode(n, "ParenthesizedExpression");
    }
    shouldParseArrow(r) {
      return !this.canInsertSemicolon();
    }
    parseArrow(r) {
      if (this.eat(19))
        return r;
    }
    parseParenItem(r, s) {
      return r;
    }
    parseNewOrNewTarget() {
      const r = this.startNode();
      if (this.next(), this.match(16)) {
        const s = this.createIdentifier(this.startNodeAtNode(r), "new");
        this.next();
        const n = this.parseMetaProperty(r, s, "target");
        return this.scope.allowNewTarget || this.raise(S.UnexpectedNewTarget, n), n;
      }
      return this.parseNew(r);
    }
    parseNew(r) {
      if (this.parseNewCallee(r), this.eat(10)) {
        const s = this.parseExprList(11);
        this.toReferencedList(s), r.arguments = s;
      } else
        r.arguments = [];
      return this.finishNode(r, "NewExpression");
    }
    parseNewCallee(r) {
      const s = this.match(83), n = this.parseNoCallExpr();
      r.callee = n, (s && n.type === "ImportExpression" || n.type === "Import") && this.raise(S.ImportCallNotNewExpression, n), n.type === "Super" && this.raise(S.SuperCallNotNewExpression, n);
    }
    parseTemplateElement(r) {
      const {
        start: s,
        startLoc: n,
        end: o,
        value: f
      } = this.state, E = s + 1, C = this.startNodeAt(a(n, 1));
      f === null && (r || this.raise(S.InvalidEscapeSequenceTemplate, a(this.state.firstInvalidTemplateEscapePos, 1)));
      const T = this.match(24), N = T ? -1 : -2, D = o + N;
      C.value = {
        raw: this.input.slice(E, D).replace(/\r\n?/g, `
`),
        cooked: f === null ? null : f.slice(1, N)
      }, C.tail = T, this.next();
      const V = this.finishNode(C, "TemplateElement");
      return this.resetEndLocation(V, a(this.state.lastTokEndLoc, N)), V;
    }
    parseTemplate(r) {
      const s = this.startNode();
      let n = this.parseTemplateElement(r);
      const o = [n], f = [];
      for (; !n.tail; )
        f.push(this.parseTemplateSubstitution()), this.readTemplateContinuation(), o.push(n = this.parseTemplateElement(r));
      return s.expressions = f, s.quasis = o, this.finishNode(s, "TemplateLiteral");
    }
    parseTemplateSubstitution() {
      return this.parseExpression();
    }
    parseObjectLike(r, s, n, o) {
      n && this.expectPlugin("recordAndTuple");
      const f = this.state.inFSharpPipelineDirectBody;
      this.state.inFSharpPipelineDirectBody = !1;
      let E = !1, C = !0;
      const T = this.startNode();
      for (T.properties = [], this.next(); !this.match(r); ) {
        if (C)
          C = !1;
        else if (this.expect(12), this.match(r)) {
          this.addTrailingCommaExtraToNode(T);
          break;
        }
        let D;
        s ? D = this.parseBindingProperty() : (D = this.parsePropertyDefinition(o), E = this.checkProto(D, n, E, o)), n && !this.isObjectProperty(D) && D.type !== "SpreadElement" && this.raise(S.InvalidRecordProperty, D), D.shorthand && this.addExtra(D, "shorthand", !0), T.properties.push(D);
      }
      this.next(), this.state.inFSharpPipelineDirectBody = f;
      let N = "ObjectExpression";
      return s ? N = "ObjectPattern" : n && (N = "RecordExpression"), this.finishNode(T, N);
    }
    addTrailingCommaExtraToNode(r) {
      this.addExtra(r, "trailingComma", this.state.lastTokStartLoc.index), this.addExtra(r, "trailingCommaLoc", this.state.lastTokStartLoc, !1);
    }
    maybeAsyncOrAccessorProp(r) {
      return !r.computed && r.key.type === "Identifier" && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
    }
    parsePropertyDefinition(r) {
      let s = [];
      if (this.match(26))
        for (this.hasPlugin("decorators") && this.raise(S.UnsupportedPropertyDecorator, this.state.startLoc); this.match(26); )
          s.push(this.parseDecorator());
      const n = this.startNode();
      let o = !1, f = !1, E;
      if (this.match(21))
        return s.length && this.unexpected(), this.parseSpread();
      s.length && (n.decorators = s, s = []), n.method = !1, r && (E = this.state.startLoc);
      let C = this.eat(55);
      this.parsePropertyNamePrefixOperator(n);
      const T = this.state.containsEsc;
      if (this.parsePropertyName(n, r), !C && !T && this.maybeAsyncOrAccessorProp(n)) {
        const {
          key: N
        } = n, D = N.name;
        D === "async" && !this.hasPrecedingLineBreak() && (o = !0, this.resetPreviousNodeTrailingComments(N), C = this.eat(55), this.parsePropertyName(n)), (D === "get" || D === "set") && (f = !0, this.resetPreviousNodeTrailingComments(N), n.kind = D, this.match(55) && (C = !0, this.raise(S.AccessorIsGenerator, this.state.curPosition(), {
          kind: D
        }), this.next()), this.parsePropertyName(n));
      }
      return this.parseObjPropValue(n, E, C, o, !1, f, r);
    }
    getGetterSetterExpectedParamCount(r) {
      return r.kind === "get" ? 0 : 1;
    }
    getObjectOrClassMethodParams(r) {
      return r.params;
    }
    checkGetterSetterParams(r) {
      var s;
      const n = this.getGetterSetterExpectedParamCount(r), o = this.getObjectOrClassMethodParams(r);
      o.length !== n && this.raise(r.kind === "get" ? S.BadGetterArity : S.BadSetterArity, r), r.kind === "set" && ((s = o[o.length - 1]) == null ? void 0 : s.type) === "RestElement" && this.raise(S.BadSetterRestParameter, r);
    }
    parseObjectMethod(r, s, n, o, f) {
      if (f) {
        const E = this.parseMethod(r, s, !1, !1, !1, "ObjectMethod");
        return this.checkGetterSetterParams(E), E;
      }
      if (n || s || this.match(10))
        return o && this.unexpected(), r.kind = "method", r.method = !0, this.parseMethod(r, s, n, !1, !1, "ObjectMethod");
    }
    parseObjectProperty(r, s, n, o) {
      if (r.shorthand = !1, this.eat(14))
        return r.value = n ? this.parseMaybeDefault(this.state.startLoc) : this.parseMaybeAssignAllowInOrVoidPattern(8, o), this.finishObjectProperty(r);
      if (!r.computed && r.key.type === "Identifier") {
        if (this.checkReservedWord(r.key.name, r.key.loc.start, !0, !1), n)
          r.value = this.parseMaybeDefault(s, this.cloneIdentifier(r.key));
        else if (this.match(29)) {
          const f = this.state.startLoc;
          o != null ? o.shorthandAssignLoc === null && (o.shorthandAssignLoc = f) : this.raise(S.InvalidCoverInitializedName, f), r.value = this.parseMaybeDefault(s, this.cloneIdentifier(r.key));
        } else
          r.value = this.cloneIdentifier(r.key);
        return r.shorthand = !0, this.finishObjectProperty(r);
      }
    }
    finishObjectProperty(r) {
      return this.finishNode(r, "ObjectProperty");
    }
    parseObjPropValue(r, s, n, o, f, E, C) {
      const T = this.parseObjectMethod(r, n, o, f, E) || this.parseObjectProperty(r, s, f, C);
      return T || this.unexpected(), T;
    }
    parsePropertyName(r, s) {
      if (this.eat(0))
        r.computed = !0, r.key = this.parseMaybeAssignAllowIn(), this.expect(3);
      else {
        const {
          type: n,
          value: o
        } = this.state;
        let f;
        if (Ke(n))
          f = this.parseIdentifier(!0);
        else
          switch (n) {
            case 135:
              f = this.parseNumericLiteral(o);
              break;
            case 134:
              f = this.parseStringLiteral(o);
              break;
            case 136:
              f = this.parseBigIntLiteral(o);
              break;
            case 139: {
              const E = this.state.startLoc;
              s != null ? s.privateKeyLoc === null && (s.privateKeyLoc = E) : this.raise(S.UnexpectedPrivateField, E), f = this.parsePrivateName();
              break;
            }
            default:
              if (n === 137) {
                f = this.parseDecimalLiteral(o);
                break;
              }
              this.unexpected();
          }
        r.key = f, n !== 139 && (r.computed = !1);
      }
    }
    initFunction(r, s) {
      r.id = null, r.generator = !1, r.async = s;
    }
    parseMethod(r, s, n, o, f, E, C = !1) {
      this.initFunction(r, n), r.generator = s, this.scope.enter(530 | (C ? 576 : 0) | (f ? 32 : 0)), this.prodParam.enter(Si(n, r.generator)), this.parseFunctionParams(r, o);
      const T = this.parseFunctionBodyAndFinish(r, E, !0);
      return this.prodParam.exit(), this.scope.exit(), T;
    }
    parseArrayLike(r, s, n) {
      s && this.expectPlugin("recordAndTuple");
      const o = this.state.inFSharpPipelineDirectBody;
      this.state.inFSharpPipelineDirectBody = !1;
      const f = this.startNode();
      return this.next(), f.elements = this.parseExprList(r, !s, n, f), this.state.inFSharpPipelineDirectBody = o, this.finishNode(f, s ? "TupleExpression" : "ArrayExpression");
    }
    parseArrowExpression(r, s, n, o) {
      this.scope.enter(518);
      let f = Si(n, !1);
      !this.match(5) && this.prodParam.hasIn && (f |= 8), this.prodParam.enter(f), this.initFunction(r, n);
      const E = this.state.maybeInArrowParameters;
      return s && (this.state.maybeInArrowParameters = !0, this.setArrowFunctionParameters(r, s, o)), this.state.maybeInArrowParameters = !1, this.parseFunctionBody(r, !0), this.prodParam.exit(), this.scope.exit(), this.state.maybeInArrowParameters = E, this.finishNode(r, "ArrowFunctionExpression");
    }
    setArrowFunctionParameters(r, s, n) {
      this.toAssignableList(s, n, !1), r.params = s;
    }
    parseFunctionBodyAndFinish(r, s, n = !1) {
      return this.parseFunctionBody(r, !1, n), this.finishNode(r, s);
    }
    parseFunctionBody(r, s, n = !1) {
      const o = s && !this.match(5);
      if (this.expressionScope.enter(Yo()), o)
        r.body = this.parseMaybeAssign(), this.checkParams(r, !1, s, !1);
      else {
        const f = this.state.strict, E = this.state.labels;
        this.state.labels = [], this.prodParam.enter(this.prodParam.currentFlags() | 4), r.body = this.parseBlock(!0, !1, (C) => {
          const T = !this.isSimpleParamList(r.params);
          C && T && this.raise(S.IllegalLanguageModeDirective, (r.kind === "method" || r.kind === "constructor") && r.key ? r.key.loc.end : r);
          const N = !f && this.state.strict;
          this.checkParams(r, !this.state.strict && !s && !n && !T, s, N), this.state.strict && r.id && this.checkIdentifier(r.id, 65, N);
        }), this.prodParam.exit(), this.state.labels = E;
      }
      this.expressionScope.exit();
    }
    isSimpleParameter(r) {
      return r.type === "Identifier";
    }
    isSimpleParamList(r) {
      for (let s = 0, n = r.length; s < n; s++)
        if (!this.isSimpleParameter(r[s])) return !1;
      return !0;
    }
    checkParams(r, s, n, o = !0) {
      const f = !s && /* @__PURE__ */ new Set(), E = {
        type: "FormalParameters"
      };
      for (const C of r.params)
        this.checkLVal(C, E, 5, f, o);
    }
    parseExprList(r, s, n, o) {
      const f = [];
      let E = !0;
      for (; !this.eat(r); ) {
        if (E)
          E = !1;
        else if (this.expect(12), this.match(r)) {
          o && this.addTrailingCommaExtraToNode(o), this.next();
          break;
        }
        f.push(this.parseExprListItem(r, s, n));
      }
      return f;
    }
    parseExprListItem(r, s, n, o) {
      let f;
      if (this.match(12))
        s || this.raise(S.UnexpectedToken, this.state.curPosition(), {
          unexpected: ","
        }), f = null;
      else if (this.match(21)) {
        const E = this.state.startLoc;
        f = this.parseParenItem(this.parseSpread(n), E);
      } else if (this.match(17)) {
        this.expectPlugin("partialApplication"), o || this.raise(S.UnexpectedArgumentPlaceholder, this.state.startLoc);
        const E = this.startNode();
        this.next(), f = this.finishNode(E, "ArgumentPlaceholder");
      } else
        f = this.parseMaybeAssignAllowInOrVoidPattern(r, n, this.parseParenItem);
      return f;
    }
    parseIdentifier(r) {
      const s = this.startNode(), n = this.parseIdentifierName(r);
      return this.createIdentifier(s, n);
    }
    createIdentifier(r, s) {
      return r.name = s, r.loc.identifierName = s, this.finishNode(r, "Identifier");
    }
    createIdentifierAt(r, s, n) {
      return r.name = s, r.loc.identifierName = s, this.finishNodeAt(r, "Identifier", n);
    }
    parseIdentifierName(r) {
      let s;
      const {
        startLoc: n,
        type: o
      } = this.state;
      Ke(o) ? s = this.state.value : this.unexpected();
      const f = vt(o);
      return r ? f && this.replaceToken(132) : this.checkReservedWord(s, n, f, !1), this.next(), s;
    }
    checkReservedWord(r, s, n, o) {
      if (r.length > 10 || !Mf(r))
        return;
      if (n && Bf(r)) {
        this.raise(S.UnexpectedKeyword, s, {
          keyword: r
        });
        return;
      }
      if ((this.state.strict ? o ? Uo : Mo : Ro)(r, this.inModule)) {
        this.raise(S.UnexpectedReservedWord, s, {
          reservedWord: r
        });
        return;
      } else if (r === "yield") {
        if (this.prodParam.hasYield) {
          this.raise(S.YieldBindingIdentifier, s);
          return;
        }
      } else if (r === "await") {
        if (this.prodParam.hasAwait) {
          this.raise(S.AwaitBindingIdentifier, s);
          return;
        }
        if (this.scope.inStaticBlock) {
          this.raise(S.AwaitBindingIdentifierInStaticBlock, s);
          return;
        }
        this.expressionScope.recordAsyncArrowParametersError(s);
      } else if (r === "arguments" && this.scope.inClassAndNotInNonArrowFunction) {
        this.raise(S.ArgumentsInClass, s);
        return;
      }
    }
    recordAwaitIfAllowed() {
      const r = this.prodParam.hasAwait;
      return r && !this.scope.inFunction && (this.state.hasTopLevelAwait = !0), r;
    }
    parseAwait(r) {
      const s = this.startNodeAt(r);
      return this.expressionScope.recordParameterInitializerError(S.AwaitExpressionFormalParameter, s), this.eat(55) && this.raise(S.ObsoleteAwaitStar, s), !this.scope.inFunction && !(this.optionFlags & 1) && (this.isAmbiguousPrefixOrIdentifier() ? this.ambiguousScriptDifferentAst = !0 : this.sawUnambiguousESM = !0), this.state.soloAwait || (s.argument = this.parseMaybeUnary(null, !0)), this.finishNode(s, "AwaitExpression");
    }
    isAmbiguousPrefixOrIdentifier() {
      if (this.hasPrecedingLineBreak()) return !0;
      const {
        type: r
      } = this.state;
      return r === 53 || r === 10 || r === 0 || gi(r) || r === 102 && !this.state.containsEsc || r === 138 || r === 56 || this.hasPlugin("v8intrinsic") && r === 54;
    }
    parseYield(r) {
      const s = this.startNodeAt(r);
      this.expressionScope.recordParameterInitializerError(S.YieldInParameter, s);
      let n = !1, o = null;
      if (!this.hasPrecedingLineBreak())
        switch (n = this.eat(55), this.state.type) {
          case 13:
          case 140:
          case 8:
          case 11:
          case 3:
          case 9:
          case 14:
          case 12:
            if (!n) break;
          default:
            o = this.parseMaybeAssign();
        }
      return s.delegate = n, s.argument = o, this.finishNode(s, "YieldExpression");
    }
    parseImportCall(r) {
      if (this.next(), r.source = this.parseMaybeAssignAllowIn(), r.options = null, this.eat(12)) {
        if (this.match(11))
          this.addTrailingCommaExtraToNode(r.source);
        else if (r.options = this.parseMaybeAssignAllowIn(), this.eat(12) && (this.addTrailingCommaExtraToNode(r.options), !this.match(11))) {
          do
            this.parseMaybeAssignAllowIn();
          while (this.eat(12) && !this.match(11));
          this.raise(S.ImportCallArity, r);
        }
      }
      return this.expect(11), this.finishNode(r, "ImportExpression");
    }
    checkPipelineAtInfixOperator(r, s) {
      this.hasPlugin(["pipelineOperator", {
        proposal: "smart"
      }]) && r.type === "SequenceExpression" && this.raise(S.PipelineHeadSequenceExpression, s);
    }
    parseSmartPipelineBodyInStyle(r, s) {
      if (this.isSimpleReference(r)) {
        const n = this.startNodeAt(s);
        return n.callee = r, this.finishNode(n, "PipelineBareFunction");
      } else {
        const n = this.startNodeAt(s);
        return this.checkSmartPipeTopicBodyEarlyErrors(s), n.expression = r, this.finishNode(n, "PipelineTopicExpression");
      }
    }
    isSimpleReference(r) {
      switch (r.type) {
        case "MemberExpression":
          return !r.computed && this.isSimpleReference(r.object);
        case "Identifier":
          return !0;
        default:
          return !1;
      }
    }
    checkSmartPipeTopicBodyEarlyErrors(r) {
      if (this.match(19))
        throw this.raise(S.PipelineBodyNoArrow, this.state.startLoc);
      this.topicReferenceWasUsedInCurrentContext() || this.raise(S.PipelineTopicUnused, r);
    }
    withTopicBindingContext(r) {
      const s = this.state.topicContext;
      this.state.topicContext = {
        maxNumOfResolvableTopics: 1,
        maxTopicIndex: null
      };
      try {
        return r();
      } finally {
        this.state.topicContext = s;
      }
    }
    withSmartMixTopicForbiddingContext(r) {
      if (this.hasPlugin(["pipelineOperator", {
        proposal: "smart"
      }])) {
        const s = this.state.topicContext;
        this.state.topicContext = {
          maxNumOfResolvableTopics: 0,
          maxTopicIndex: null
        };
        try {
          return r();
        } finally {
          this.state.topicContext = s;
        }
      } else
        return r();
    }
    withSoloAwaitPermittingContext(r) {
      const s = this.state.soloAwait;
      this.state.soloAwait = !0;
      try {
        return r();
      } finally {
        this.state.soloAwait = s;
      }
    }
    allowInAnd(r) {
      const s = this.prodParam.currentFlags();
      if (8 & ~s) {
        this.prodParam.enter(s | 8);
        try {
          return r();
        } finally {
          this.prodParam.exit();
        }
      }
      return r();
    }
    disallowInAnd(r) {
      const s = this.prodParam.currentFlags();
      if (8 & s) {
        this.prodParam.enter(s & -9);
        try {
          return r();
        } finally {
          this.prodParam.exit();
        }
      }
      return r();
    }
    registerTopicReference() {
      this.state.topicContext.maxTopicIndex = 0;
    }
    topicReferenceIsAllowedInCurrentContext() {
      return this.state.topicContext.maxNumOfResolvableTopics >= 1;
    }
    topicReferenceWasUsedInCurrentContext() {
      return this.state.topicContext.maxTopicIndex != null && this.state.topicContext.maxTopicIndex >= 0;
    }
    parseFSharpPipelineBody(r) {
      const s = this.state.startLoc;
      this.state.potentialArrowAt = this.state.start;
      const n = this.state.inFSharpPipelineDirectBody;
      this.state.inFSharpPipelineDirectBody = !0;
      const o = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), s, r);
      return this.state.inFSharpPipelineDirectBody = n, o;
    }
    parseModuleExpression() {
      this.expectPlugin("moduleBlocks");
      const r = this.startNode();
      this.next(), this.match(5) || this.unexpected(null, 5);
      const s = this.startNodeAt(this.state.endLoc);
      this.next();
      const n = this.initializeScopes(!0);
      this.enterInitialScopes();
      try {
        r.body = this.parseProgram(s, 8, "module");
      } finally {
        n();
      }
      return this.finishNode(r, "ModuleExpression");
    }
    parseVoidPattern(r) {
      this.expectPlugin("discardBinding");
      const s = this.startNode();
      return r != null && (r.voidPatternLoc = this.state.startLoc), this.next(), this.finishNode(s, "VoidPattern");
    }
    parseMaybeAssignAllowInOrVoidPattern(r, s, n) {
      if (s != null && this.match(88)) {
        const o = this.lookaheadCharCode();
        if (o === 44 || o === (r === 3 ? 93 : r === 8 ? 125 : 41) || o === 61)
          return this.parseMaybeDefault(this.state.startLoc, this.parseVoidPattern(s));
      }
      return this.parseMaybeAssignAllowIn(s, n);
    }
    parsePropertyNamePrefixOperator(r) {
    }
  }
  const un = {
    kind: 1
  }, Pd = {
    kind: 2
  }, Nd = /[\uD800-\uDFFF]/u, pn = /in(?:stanceof)?/y;
  function kd(x, r, s) {
    for (let n = 0; n < x.length; n++) {
      const o = x[n], {
        type: f
      } = o;
      if (typeof f == "number") {
        if (f === 139) {
          const {
            loc: E,
            start: C,
            value: T,
            end: N
          } = o, D = C + 1, V = a(E.start, 1);
          x.splice(n, 1, new Nt({
            type: At(27),
            value: "#",
            start: C,
            end: D,
            startLoc: E.start,
            endLoc: V
          }), new Nt({
            type: At(132),
            value: T,
            start: D,
            end: N,
            startLoc: V,
            endLoc: E.end
          })), n++;
          continue;
        }
        if (gi(f)) {
          const {
            loc: E,
            start: C,
            value: T,
            end: N
          } = o, D = C + 1, V = a(E.start, 1);
          let j;
          r.charCodeAt(C - s) === 96 ? j = new Nt({
            type: At(22),
            value: "`",
            start: C,
            end: D,
            startLoc: E.start,
            endLoc: V
          }) : j = new Nt({
            type: At(8),
            value: "}",
            start: C,
            end: D,
            startLoc: E.start,
            endLoc: V
          });
          let W, H, re, me;
          f === 24 ? (H = N - 1, re = a(E.end, -1), W = T === null ? null : T.slice(1, -1), me = new Nt({
            type: At(22),
            value: "`",
            start: H,
            end: N,
            startLoc: re,
            endLoc: E.end
          })) : (H = N - 2, re = a(E.end, -2), W = T === null ? null : T.slice(1, -2), me = new Nt({
            type: At(23),
            value: "${",
            start: H,
            end: N,
            startLoc: re,
            endLoc: E.end
          })), x.splice(n, 1, j, new Nt({
            type: At(20),
            value: W,
            start: D,
            end: H,
            startLoc: V,
            endLoc: re
          }), me), n += 2;
          continue;
        }
        o.type = At(f);
      }
    }
    return x;
  }
  class Od extends Td {
    parseTopLevel(r, s) {
      return r.program = this.parseProgram(s, 140, this.options.sourceType === "module" ? "module" : "script"), r.comments = this.comments, this.optionFlags & 256 && (r.tokens = kd(this.tokens, this.input, this.startIndex)), this.finishNode(r, "File");
    }
    parseProgram(r, s, n) {
      if (r.sourceType = n, r.interpreter = this.parseInterpreterDirective(), this.parseBlockBody(r, !0, !0, s), this.inModule) {
        if (!(this.optionFlags & 64) && this.scope.undefinedExports.size > 0)
          for (const [f, E] of Array.from(this.scope.undefinedExports))
            this.raise(S.ModuleExportUndefined, E, {
              localName: f
            });
        this.addExtra(r, "topLevelAwait", this.state.hasTopLevelAwait);
      }
      let o;
      return s === 140 ? o = this.finishNode(r, "Program") : o = this.finishNodeAt(r, "Program", a(this.state.startLoc, -1)), o;
    }
    stmtToDirective(r) {
      const s = this.castNodeTo(r, "Directive"), n = this.castNodeTo(r.expression, "DirectiveLiteral"), o = n.value, f = this.input.slice(this.offsetToSourcePos(n.start), this.offsetToSourcePos(n.end)), E = n.value = f.slice(1, -1);
      return this.addExtra(n, "raw", f), this.addExtra(n, "rawValue", E), this.addExtra(n, "expressionValue", o), s.value = n, delete r.expression, s;
    }
    parseInterpreterDirective() {
      if (!this.match(28))
        return null;
      const r = this.startNode();
      return r.value = this.state.value, this.next(), this.finishNode(r, "InterpreterDirective");
    }
    isLet() {
      return this.isContextual(100) ? this.hasFollowingBindingAtom() : !1;
    }
    isUsing() {
      return this.isContextual(107) ? this.nextTokenIsIdentifierOnSameLine() : !1;
    }
    isForUsing() {
      if (!this.isContextual(107))
        return !1;
      const r = this.nextTokenInLineStart(), s = this.codePointAtPos(r);
      if (this.isUnparsedContextual(r, "of")) {
        const n = this.lookaheadCharCodeSince(r + 2);
        if (n !== 61 && n !== 58 && n !== 59)
          return !1;
      }
      return !!(this.chStartsBindingIdentifier(s, r) || this.isUnparsedContextual(r, "void"));
    }
    nextTokenIsIdentifierOnSameLine() {
      const r = this.nextTokenInLineStart(), s = this.codePointAtPos(r);
      return this.chStartsBindingIdentifier(s, r);
    }
    isAwaitUsing() {
      if (!this.isContextual(96))
        return !1;
      let r = this.nextTokenInLineStart();
      if (this.isUnparsedContextual(r, "using")) {
        r = this.nextTokenInLineStartSince(r + 5);
        const s = this.codePointAtPos(r);
        if (this.chStartsBindingIdentifier(s, r))
          return !0;
      }
      return !1;
    }
    chStartsBindingIdentifier(r, s) {
      if (ut(r)) {
        if (pn.lastIndex = s, pn.test(this.input)) {
          const n = this.codePointAtPos(pn.lastIndex);
          if (!Wt(n) && n !== 92)
            return !1;
        }
        return !0;
      } else return r === 92;
    }
    chStartsBindingPattern(r) {
      return r === 91 || r === 123;
    }
    hasFollowingBindingAtom() {
      const r = this.nextTokenStart(), s = this.codePointAtPos(r);
      return this.chStartsBindingPattern(s) || this.chStartsBindingIdentifier(s, r);
    }
    hasInLineFollowingBindingIdentifierOrBrace() {
      const r = this.nextTokenInLineStart(), s = this.codePointAtPos(r);
      return s === 123 || this.chStartsBindingIdentifier(s, r);
    }
    allowsUsing() {
      return (this.scope.inModule || !this.scope.inTopLevel) && !this.scope.inBareCaseStatement;
    }
    parseModuleItem() {
      return this.parseStatementLike(15);
    }
    parseStatementListItem() {
      return this.parseStatementLike(6 | (!this.options.annexB || this.state.strict ? 0 : 8));
    }
    parseStatementOrSloppyAnnexBFunctionDeclaration(r = !1) {
      let s = 0;
      return this.options.annexB && !this.state.strict && (s |= 4, r && (s |= 8)), this.parseStatementLike(s);
    }
    parseStatement() {
      return this.parseStatementLike(0);
    }
    parseStatementLike(r) {
      let s = null;
      return this.match(26) && (s = this.parseDecorators(!0)), this.parseStatementContent(r, s);
    }
    parseStatementContent(r, s) {
      const n = this.state.type, o = this.startNode(), f = !!(r & 2), E = !!(r & 4), C = r & 1;
      switch (n) {
        case 60:
          return this.parseBreakContinueStatement(o, !0);
        case 63:
          return this.parseBreakContinueStatement(o, !1);
        case 64:
          return this.parseDebuggerStatement(o);
        case 90:
          return this.parseDoWhileStatement(o);
        case 91:
          return this.parseForStatement(o);
        case 68:
          if (this.lookaheadCharCode() === 46) break;
          return E || this.raise(this.state.strict ? S.StrictFunction : this.options.annexB ? S.SloppyFunctionAnnexB : S.SloppyFunction, this.state.startLoc), this.parseFunctionStatement(o, !1, !f && E);
        case 80:
          return f || this.unexpected(), this.parseClass(this.maybeTakeDecorators(s, o), !0);
        case 69:
          return this.parseIfStatement(o);
        case 70:
          return this.parseReturnStatement(o);
        case 71:
          return this.parseSwitchStatement(o);
        case 72:
          return this.parseThrowStatement(o);
        case 73:
          return this.parseTryStatement(o);
        case 96:
          if (this.isAwaitUsing())
            return this.allowsUsing() ? f ? this.recordAwaitIfAllowed() || this.raise(S.AwaitUsingNotInAsyncContext, o) : this.raise(S.UnexpectedLexicalDeclaration, o) : this.raise(S.UnexpectedUsingDeclaration, o), this.next(), this.parseVarStatement(o, "await using");
          break;
        case 107:
          if (this.state.containsEsc || !this.hasInLineFollowingBindingIdentifierOrBrace())
            break;
          return this.allowsUsing() ? f || this.raise(S.UnexpectedLexicalDeclaration, this.state.startLoc) : this.raise(S.UnexpectedUsingDeclaration, this.state.startLoc), this.parseVarStatement(o, "using");
        case 100: {
          if (this.state.containsEsc)
            break;
          const D = this.nextTokenStart(), V = this.codePointAtPos(D);
          if (V !== 91 && (!f && this.hasFollowingLineBreak() || !this.chStartsBindingIdentifier(V, D) && V !== 123))
            break;
        }
        case 75:
          f || this.raise(S.UnexpectedLexicalDeclaration, this.state.startLoc);
        case 74: {
          const D = this.state.value;
          return this.parseVarStatement(o, D);
        }
        case 92:
          return this.parseWhileStatement(o);
        case 76:
          return this.parseWithStatement(o);
        case 5:
          return this.parseBlock();
        case 13:
          return this.parseEmptyStatement(o);
        case 83: {
          const D = this.lookaheadCharCode();
          if (D === 40 || D === 46)
            break;
        }
        case 82: {
          !(this.optionFlags & 8) && !C && this.raise(S.UnexpectedImportExport, this.state.startLoc), this.next();
          let D;
          return n === 83 ? D = this.parseImport(o) : D = this.parseExport(o, s), this.assertModuleNodeAllowed(D), D;
        }
        default:
          if (this.isAsyncFunction())
            return f || this.raise(S.AsyncFunctionInSingleStatementContext, this.state.startLoc), this.next(), this.parseFunctionStatement(o, !0, !f && E);
      }
      const T = this.state.value, N = this.parseExpression();
      return ae(n) && N.type === "Identifier" && this.eat(14) ? this.parseLabeledStatement(o, T, N, r) : this.parseExpressionStatement(o, N, s);
    }
    assertModuleNodeAllowed(r) {
      !(this.optionFlags & 8) && !this.inModule && this.raise(S.ImportOutsideModule, r);
    }
    decoratorsEnabledBeforeExport() {
      return this.hasPlugin("decorators-legacy") ? !0 : this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") !== !1;
    }
    maybeTakeDecorators(r, s, n) {
      if (r) {
        var o;
        (o = s.decorators) != null && o.length ? (typeof this.getPluginOption("decorators", "decoratorsBeforeExport") != "boolean" && this.raise(S.DecoratorsBeforeAfterExport, s.decorators[0]), s.decorators.unshift(...r)) : s.decorators = r, this.resetStartLocationFromNode(s, r[0]), n && this.resetStartLocationFromNode(n, s);
      }
      return s;
    }
    canHaveLeadingDecorator() {
      return this.match(80);
    }
    parseDecorators(r) {
      const s = [];
      do
        s.push(this.parseDecorator());
      while (this.match(26));
      if (this.match(82))
        r || this.unexpected(), this.decoratorsEnabledBeforeExport() || this.raise(S.DecoratorExportClass, this.state.startLoc);
      else if (!this.canHaveLeadingDecorator())
        throw this.raise(S.UnexpectedLeadingDecorator, this.state.startLoc);
      return s;
    }
    parseDecorator() {
      this.expectOnePlugin(["decorators", "decorators-legacy"]);
      const r = this.startNode();
      if (this.next(), this.hasPlugin("decorators")) {
        const s = this.state.startLoc;
        let n;
        if (this.match(10)) {
          const o = this.state.startLoc;
          this.next(), n = this.parseExpression(), this.expect(11), n = this.wrapParenthesis(o, n);
          const f = this.state.startLoc;
          r.expression = this.parseMaybeDecoratorArguments(n, o), this.getPluginOption("decorators", "allowCallParenthesized") === !1 && r.expression !== n && this.raise(S.DecoratorArgumentsOutsideParentheses, f);
        } else {
          for (n = this.parseIdentifier(!1); this.eat(16); ) {
            const o = this.startNodeAt(s);
            o.object = n, this.match(139) ? (this.classScope.usePrivateName(this.state.value, this.state.startLoc), o.property = this.parsePrivateName()) : o.property = this.parseIdentifier(!0), o.computed = !1, n = this.finishNode(o, "MemberExpression");
          }
          r.expression = this.parseMaybeDecoratorArguments(n, s);
        }
      } else
        r.expression = this.parseExprSubscripts();
      return this.finishNode(r, "Decorator");
    }
    parseMaybeDecoratorArguments(r, s) {
      if (this.eat(10)) {
        const n = this.startNodeAt(s);
        return n.callee = r, n.arguments = this.parseCallExpressionArguments(), this.toReferencedList(n.arguments), this.finishNode(n, "CallExpression");
      }
      return r;
    }
    parseBreakContinueStatement(r, s) {
      return this.next(), this.isLineTerminator() ? r.label = null : (r.label = this.parseIdentifier(), this.semicolon()), this.verifyBreakContinue(r, s), this.finishNode(r, s ? "BreakStatement" : "ContinueStatement");
    }
    verifyBreakContinue(r, s) {
      let n;
      for (n = 0; n < this.state.labels.length; ++n) {
        const o = this.state.labels[n];
        if ((r.label == null || o.name === r.label.name) && (o.kind != null && (s || o.kind === 1) || r.label && s))
          break;
      }
      if (n === this.state.labels.length) {
        const o = s ? "BreakStatement" : "ContinueStatement";
        this.raise(S.IllegalBreakContinue, r, {
          type: o
        });
      }
    }
    parseDebuggerStatement(r) {
      return this.next(), this.semicolon(), this.finishNode(r, "DebuggerStatement");
    }
    parseHeaderExpression() {
      this.expect(10);
      const r = this.parseExpression();
      return this.expect(11), r;
    }
    parseDoWhileStatement(r) {
      return this.next(), this.state.labels.push(un), r.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.state.labels.pop(), this.expect(92), r.test = this.parseHeaderExpression(), this.eat(13), this.finishNode(r, "DoWhileStatement");
    }
    parseForStatement(r) {
      this.next(), this.state.labels.push(un);
      let s = null;
      if (this.isContextual(96) && this.recordAwaitIfAllowed() && (s = this.state.startLoc, this.next()), this.scope.enter(0), this.expect(10), this.match(13))
        return s !== null && this.unexpected(s), this.parseFor(r, null);
      const n = this.isContextual(100);
      {
        const T = this.isAwaitUsing(), N = T || this.isForUsing(), D = n && this.hasFollowingBindingAtom() || N;
        if (this.match(74) || this.match(75) || D) {
          const V = this.startNode();
          let j;
          T ? (j = "await using", this.recordAwaitIfAllowed() || this.raise(S.AwaitUsingNotInAsyncContext, this.state.startLoc), this.next()) : j = this.state.value, this.next(), this.parseVar(V, !0, j);
          const W = this.finishNode(V, "VariableDeclaration"), H = this.match(58);
          return H && N && this.raise(S.ForInUsing, W), (H || this.isContextual(102)) && W.declarations.length === 1 ? this.parseForIn(r, W, s) : (s !== null && this.unexpected(s), this.parseFor(r, W));
        }
      }
      const o = this.isContextual(95), f = new Ei(), E = this.parseExpression(!0, f), C = this.isContextual(102);
      if (C && (n && this.raise(S.ForOfLet, E), s === null && o && E.type === "Identifier" && this.raise(S.ForOfAsync, E)), C || this.match(58)) {
        this.checkDestructuringPrivate(f), this.toAssignable(E, !0);
        const T = C ? "ForOfStatement" : "ForInStatement";
        return this.checkLVal(E, {
          type: T
        }), this.parseForIn(r, E, s);
      } else
        this.checkExpressionErrors(f, !0);
      return s !== null && this.unexpected(s), this.parseFor(r, E);
    }
    parseFunctionStatement(r, s, n) {
      return this.next(), this.parseFunction(r, 1 | (n ? 2 : 0) | (s ? 8 : 0));
    }
    parseIfStatement(r) {
      return this.next(), r.test = this.parseHeaderExpression(), r.consequent = this.parseStatementOrSloppyAnnexBFunctionDeclaration(), r.alternate = this.eat(66) ? this.parseStatementOrSloppyAnnexBFunctionDeclaration() : null, this.finishNode(r, "IfStatement");
    }
    parseReturnStatement(r) {
      return this.prodParam.hasReturn || this.raise(S.IllegalReturn, this.state.startLoc), this.next(), this.isLineTerminator() ? r.argument = null : (r.argument = this.parseExpression(), this.semicolon()), this.finishNode(r, "ReturnStatement");
    }
    parseSwitchStatement(r) {
      this.next(), r.discriminant = this.parseHeaderExpression();
      const s = r.cases = [];
      this.expect(5), this.state.labels.push(Pd), this.scope.enter(256);
      let n;
      for (let o; !this.match(8); )
        if (this.match(61) || this.match(65)) {
          const f = this.match(61);
          n && this.finishNode(n, "SwitchCase"), s.push(n = this.startNode()), n.consequent = [], this.next(), f ? n.test = this.parseExpression() : (o && this.raise(S.MultipleDefaultsInSwitch, this.state.lastTokStartLoc), o = !0, n.test = null), this.expect(14);
        } else
          n ? n.consequent.push(this.parseStatementListItem()) : this.unexpected();
      return this.scope.exit(), n && this.finishNode(n, "SwitchCase"), this.next(), this.state.labels.pop(), this.finishNode(r, "SwitchStatement");
    }
    parseThrowStatement(r) {
      return this.next(), this.hasPrecedingLineBreak() && this.raise(S.NewlineAfterThrow, this.state.lastTokEndLoc), r.argument = this.parseExpression(), this.semicolon(), this.finishNode(r, "ThrowStatement");
    }
    parseCatchClauseParam() {
      const r = this.parseBindingAtom();
      return this.scope.enter(this.options.annexB && r.type === "Identifier" ? 8 : 0), this.checkLVal(r, {
        type: "CatchClause"
      }, 9), r;
    }
    parseTryStatement(r) {
      if (this.next(), r.block = this.parseBlock(), r.handler = null, this.match(62)) {
        const s = this.startNode();
        this.next(), this.match(10) ? (this.expect(10), s.param = this.parseCatchClauseParam(), this.expect(11)) : (s.param = null, this.scope.enter(0)), s.body = this.withSmartMixTopicForbiddingContext(() => this.parseBlock(!1, !1)), this.scope.exit(), r.handler = this.finishNode(s, "CatchClause");
      }
      return r.finalizer = this.eat(67) ? this.parseBlock() : null, !r.handler && !r.finalizer && this.raise(S.NoCatchOrFinally, r), this.finishNode(r, "TryStatement");
    }
    parseVarStatement(r, s, n = !1) {
      return this.next(), this.parseVar(r, !1, s, n), this.semicolon(), this.finishNode(r, "VariableDeclaration");
    }
    parseWhileStatement(r) {
      return this.next(), r.test = this.parseHeaderExpression(), this.state.labels.push(un), r.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.state.labels.pop(), this.finishNode(r, "WhileStatement");
    }
    parseWithStatement(r) {
      return this.state.strict && this.raise(S.StrictWith, this.state.startLoc), this.next(), r.object = this.parseHeaderExpression(), r.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.finishNode(r, "WithStatement");
    }
    parseEmptyStatement(r) {
      return this.next(), this.finishNode(r, "EmptyStatement");
    }
    parseLabeledStatement(r, s, n, o) {
      for (const E of this.state.labels)
        E.name === s && this.raise(S.LabelRedeclaration, n, {
          labelName: s
        });
      const f = If(this.state.type) ? 1 : this.match(71) ? 2 : null;
      for (let E = this.state.labels.length - 1; E >= 0; E--) {
        const C = this.state.labels[E];
        if (C.statementStart === r.start)
          C.statementStart = this.sourceToOffsetPos(this.state.start), C.kind = f;
        else
          break;
      }
      return this.state.labels.push({
        name: s,
        kind: f,
        statementStart: this.sourceToOffsetPos(this.state.start)
      }), r.body = o & 8 ? this.parseStatementOrSloppyAnnexBFunctionDeclaration(!0) : this.parseStatement(), this.state.labels.pop(), r.label = n, this.finishNode(r, "LabeledStatement");
    }
    parseExpressionStatement(r, s, n) {
      return r.expression = s, this.semicolon(), this.finishNode(r, "ExpressionStatement");
    }
    parseBlock(r = !1, s = !0, n) {
      const o = this.startNode();
      return r && this.state.strictErrors.clear(), this.expect(5), s && this.scope.enter(0), this.parseBlockBody(o, r, !1, 8, n), s && this.scope.exit(), this.finishNode(o, "BlockStatement");
    }
    isValidDirective(r) {
      return r.type === "ExpressionStatement" && r.expression.type === "StringLiteral" && !r.expression.extra.parenthesized;
    }
    parseBlockBody(r, s, n, o, f) {
      const E = r.body = [], C = r.directives = [];
      this.parseBlockOrModuleBlockBody(E, s ? C : void 0, n, o, f);
    }
    parseBlockOrModuleBlockBody(r, s, n, o, f) {
      const E = this.state.strict;
      let C = !1, T = !1;
      for (; !this.match(o); ) {
        const N = n ? this.parseModuleItem() : this.parseStatementListItem();
        if (s && !T) {
          if (this.isValidDirective(N)) {
            const D = this.stmtToDirective(N);
            s.push(D), !C && D.value.value === "use strict" && (C = !0, this.setStrict(!0));
            continue;
          }
          T = !0, this.state.strictErrors.clear();
        }
        r.push(N);
      }
      f?.call(this, C), E || this.setStrict(!1), this.next();
    }
    parseFor(r, s) {
      return r.init = s, this.semicolon(!1), r.test = this.match(13) ? null : this.parseExpression(), this.semicolon(!1), r.update = this.match(11) ? null : this.parseExpression(), this.expect(11), r.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.scope.exit(), this.state.labels.pop(), this.finishNode(r, "ForStatement");
    }
    parseForIn(r, s, n) {
      const o = this.match(58);
      return this.next(), o ? n !== null && this.unexpected(n) : r.await = n !== null, s.type === "VariableDeclaration" && s.declarations[0].init != null && (!o || !this.options.annexB || this.state.strict || s.kind !== "var" || s.declarations[0].id.type !== "Identifier") && this.raise(S.ForInOfLoopInitializer, s, {
        type: o ? "ForInStatement" : "ForOfStatement"
      }), s.type === "AssignmentPattern" && this.raise(S.InvalidLhs, s, {
        ancestor: {
          type: "ForStatement"
        }
      }), r.left = s, r.right = o ? this.parseExpression() : this.parseMaybeAssignAllowIn(), this.expect(11), r.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.scope.exit(), this.state.labels.pop(), this.finishNode(r, o ? "ForInStatement" : "ForOfStatement");
    }
    parseVar(r, s, n, o = !1) {
      const f = r.declarations = [];
      for (r.kind = n; ; ) {
        const E = this.startNode();
        if (this.parseVarId(E, n), E.init = this.eat(29) ? s ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn() : null, E.init === null && !o && (E.id.type !== "Identifier" && !(s && (this.match(58) || this.isContextual(102))) ? this.raise(S.DeclarationMissingInitializer, this.state.lastTokEndLoc, {
          kind: "destructuring"
        }) : (n === "const" || n === "using" || n === "await using") && !(this.match(58) || this.isContextual(102)) && this.raise(S.DeclarationMissingInitializer, this.state.lastTokEndLoc, {
          kind: n
        })), f.push(this.finishNode(E, "VariableDeclarator")), !this.eat(12)) break;
      }
      return r;
    }
    parseVarId(r, s) {
      const n = this.parseBindingAtom();
      s === "using" || s === "await using" ? (n.type === "ArrayPattern" || n.type === "ObjectPattern") && this.raise(S.UsingDeclarationHasBindingPattern, n.loc.start) : n.type === "VoidPattern" && this.raise(S.UnexpectedVoidPattern, n.loc.start), this.checkLVal(n, {
        type: "VariableDeclarator"
      }, s === "var" ? 5 : 8201), r.id = n;
    }
    parseAsyncFunctionExpression(r) {
      return this.parseFunction(r, 8);
    }
    parseFunction(r, s = 0) {
      const n = s & 2, o = !!(s & 1), f = o && !(s & 4), E = !!(s & 8);
      this.initFunction(r, E), this.match(55) && (n && this.raise(S.GeneratorInSingleStatementContext, this.state.startLoc), this.next(), r.generator = !0), o && (r.id = this.parseFunctionId(f));
      const C = this.state.maybeInArrowParameters;
      return this.state.maybeInArrowParameters = !1, this.scope.enter(514), this.prodParam.enter(Si(E, r.generator)), o || (r.id = this.parseFunctionId()), this.parseFunctionParams(r, !1), this.withSmartMixTopicForbiddingContext(() => {
        this.parseFunctionBodyAndFinish(r, o ? "FunctionDeclaration" : "FunctionExpression");
      }), this.prodParam.exit(), this.scope.exit(), o && !n && this.registerFunctionStatementId(r), this.state.maybeInArrowParameters = C, r;
    }
    parseFunctionId(r) {
      return r || ae(this.state.type) ? this.parseIdentifier() : null;
    }
    parseFunctionParams(r, s) {
      this.expect(10), this.expressionScope.enter(hd()), r.params = this.parseBindingList(11, 41, 2 | (s ? 4 : 0)), this.expressionScope.exit();
    }
    registerFunctionStatementId(r) {
      r.id && this.scope.declareName(r.id.name, !this.options.annexB || this.state.strict || r.generator || r.async ? this.scope.treatFunctionsAsVar ? 5 : 8201 : 17, r.id.loc.start);
    }
    parseClass(r, s, n) {
      this.next();
      const o = this.state.strict;
      return this.state.strict = !0, this.parseClassId(r, s, n), this.parseClassSuper(r), r.body = this.parseClassBody(!!r.superClass, o), this.finishNode(r, s ? "ClassDeclaration" : "ClassExpression");
    }
    isClassProperty() {
      return this.match(29) || this.match(13) || this.match(8);
    }
    isClassMethod() {
      return this.match(10);
    }
    nameIsConstructor(r) {
      return r.type === "Identifier" && r.name === "constructor" || r.type === "StringLiteral" && r.value === "constructor";
    }
    isNonstaticConstructor(r) {
      return !r.computed && !r.static && this.nameIsConstructor(r.key);
    }
    parseClassBody(r, s) {
      this.classScope.enter();
      const n = {
        hadConstructor: !1,
        hadSuperClass: r
      };
      let o = [];
      const f = this.startNode();
      if (f.body = [], this.expect(5), this.withSmartMixTopicForbiddingContext(() => {
        for (; !this.match(8); ) {
          if (this.eat(13)) {
            if (o.length > 0)
              throw this.raise(S.DecoratorSemicolon, this.state.lastTokEndLoc);
            continue;
          }
          if (this.match(26)) {
            o.push(this.parseDecorator());
            continue;
          }
          const E = this.startNode();
          o.length && (E.decorators = o, this.resetStartLocationFromNode(E, o[0]), o = []), this.parseClassMember(f, E, n), E.kind === "constructor" && E.decorators && E.decorators.length > 0 && this.raise(S.DecoratorConstructor, E);
        }
      }), this.state.strict = s, this.next(), o.length)
        throw this.raise(S.TrailingDecorator, this.state.startLoc);
      return this.classScope.exit(), this.finishNode(f, "ClassBody");
    }
    parseClassMemberFromModifier(r, s) {
      const n = this.parseIdentifier(!0);
      if (this.isClassMethod()) {
        const o = s;
        return o.kind = "method", o.computed = !1, o.key = n, o.static = !1, this.pushClassMethod(r, o, !1, !1, !1, !1), !0;
      } else if (this.isClassProperty()) {
        const o = s;
        return o.computed = !1, o.key = n, o.static = !1, r.body.push(this.parseClassProperty(o)), !0;
      }
      return this.resetPreviousNodeTrailingComments(n), !1;
    }
    parseClassMember(r, s, n) {
      const o = this.isContextual(106);
      if (o) {
        if (this.parseClassMemberFromModifier(r, s))
          return;
        if (this.eat(5)) {
          this.parseClassStaticBlock(r, s);
          return;
        }
      }
      this.parseClassMemberWithIsStatic(r, s, n, o);
    }
    parseClassMemberWithIsStatic(r, s, n, o) {
      const f = s, E = s, C = s, T = s, N = s, D = f, V = f;
      if (s.static = o, this.parsePropertyNamePrefixOperator(s), this.eat(55)) {
        D.kind = "method";
        const te = this.match(139);
        if (this.parseClassElementName(D), this.parsePostMemberNameModifiers(D), te) {
          this.pushClassPrivateMethod(r, E, !0, !1);
          return;
        }
        this.isNonstaticConstructor(f) && this.raise(S.ConstructorIsGenerator, f.key), this.pushClassMethod(r, f, !0, !1, !1, !1);
        return;
      }
      const j = !this.state.containsEsc && ae(this.state.type), W = this.parseClassElementName(s), H = j ? W.name : null, re = this.isPrivateName(W), me = this.state.startLoc;
      if (this.parsePostMemberNameModifiers(V), this.isClassMethod()) {
        if (D.kind = "method", re) {
          this.pushClassPrivateMethod(r, E, !1, !1);
          return;
        }
        const te = this.isNonstaticConstructor(f);
        let fe = !1;
        te && (f.kind = "constructor", n.hadConstructor && !this.hasPlugin("typescript") && this.raise(S.DuplicateConstructor, W), te && this.hasPlugin("typescript") && s.override && this.raise(S.OverrideOnConstructor, W), n.hadConstructor = !0, fe = n.hadSuperClass), this.pushClassMethod(r, f, !1, !1, te, fe);
      } else if (this.isClassProperty())
        re ? this.pushClassPrivateProperty(r, T) : this.pushClassProperty(r, C);
      else if (H === "async" && !this.isLineTerminator()) {
        this.resetPreviousNodeTrailingComments(W);
        const te = this.eat(55);
        V.optional && this.unexpected(me), D.kind = "method";
        const fe = this.match(139);
        this.parseClassElementName(D), this.parsePostMemberNameModifiers(V), fe ? this.pushClassPrivateMethod(r, E, te, !0) : (this.isNonstaticConstructor(f) && this.raise(S.ConstructorIsAsync, f.key), this.pushClassMethod(r, f, te, !0, !1, !1));
      } else if ((H === "get" || H === "set") && !(this.match(55) && this.isLineTerminator())) {
        this.resetPreviousNodeTrailingComments(W), D.kind = H;
        const te = this.match(139);
        this.parseClassElementName(f), te ? this.pushClassPrivateMethod(r, E, !1, !1) : (this.isNonstaticConstructor(f) && this.raise(S.ConstructorIsAccessor, f.key), this.pushClassMethod(r, f, !1, !1, !1, !1)), this.checkGetterSetterParams(f);
      } else if (H === "accessor" && !this.isLineTerminator()) {
        this.expectPlugin("decoratorAutoAccessors"), this.resetPreviousNodeTrailingComments(W);
        const te = this.match(139);
        this.parseClassElementName(C), this.pushClassAccessorProperty(r, N, te);
      } else this.isLineTerminator() ? re ? this.pushClassPrivateProperty(r, T) : this.pushClassProperty(r, C) : this.unexpected();
    }
    parseClassElementName(r) {
      const {
        type: s,
        value: n
      } = this.state;
      if ((s === 132 || s === 134) && r.static && n === "prototype" && this.raise(S.StaticPrototype, this.state.startLoc), s === 139) {
        n === "constructor" && this.raise(S.ConstructorClassPrivateField, this.state.startLoc);
        const o = this.parsePrivateName();
        return r.key = o, o;
      }
      return this.parsePropertyName(r), r.key;
    }
    parseClassStaticBlock(r, s) {
      var n;
      this.scope.enter(720);
      const o = this.state.labels;
      this.state.labels = [], this.prodParam.enter(0);
      const f = s.body = [];
      this.parseBlockOrModuleBlockBody(f, void 0, !1, 8), this.prodParam.exit(), this.scope.exit(), this.state.labels = o, r.body.push(this.finishNode(s, "StaticBlock")), (n = s.decorators) != null && n.length && this.raise(S.DecoratorStaticBlock, s);
    }
    pushClassProperty(r, s) {
      !s.computed && this.nameIsConstructor(s.key) && this.raise(S.ConstructorClassField, s.key), r.body.push(this.parseClassProperty(s));
    }
    pushClassPrivateProperty(r, s) {
      const n = this.parseClassPrivateProperty(s);
      r.body.push(n), this.classScope.declarePrivateName(this.getPrivateNameSV(n.key), 0, n.key.loc.start);
    }
    pushClassAccessorProperty(r, s, n) {
      !n && !s.computed && this.nameIsConstructor(s.key) && this.raise(S.ConstructorClassField, s.key);
      const o = this.parseClassAccessorProperty(s);
      r.body.push(o), n && this.classScope.declarePrivateName(this.getPrivateNameSV(o.key), 0, o.key.loc.start);
    }
    pushClassMethod(r, s, n, o, f, E) {
      r.body.push(this.parseMethod(s, n, o, f, E, "ClassMethod", !0));
    }
    pushClassPrivateMethod(r, s, n, o) {
      const f = this.parseMethod(s, n, o, !1, !1, "ClassPrivateMethod", !0);
      r.body.push(f);
      const E = f.kind === "get" ? f.static ? 6 : 2 : f.kind === "set" ? f.static ? 5 : 1 : 0;
      this.declareClassPrivateMethodInScope(f, E);
    }
    declareClassPrivateMethodInScope(r, s) {
      this.classScope.declarePrivateName(this.getPrivateNameSV(r.key), s, r.key.loc.start);
    }
    parsePostMemberNameModifiers(r) {
    }
    parseClassPrivateProperty(r) {
      return this.parseInitializer(r), this.semicolon(), this.finishNode(r, "ClassPrivateProperty");
    }
    parseClassProperty(r) {
      return this.parseInitializer(r), this.semicolon(), this.finishNode(r, "ClassProperty");
    }
    parseClassAccessorProperty(r) {
      return this.parseInitializer(r), this.semicolon(), this.finishNode(r, "ClassAccessorProperty");
    }
    parseInitializer(r) {
      this.scope.enter(592), this.expressionScope.enter(Yo()), this.prodParam.enter(0), r.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null, this.expressionScope.exit(), this.prodParam.exit(), this.scope.exit();
    }
    parseClassId(r, s, n, o = 8331) {
      if (ae(this.state.type))
        r.id = this.parseIdentifier(), s && this.declareNameFromIdentifier(r.id, o);
      else if (n || !s)
        r.id = null;
      else
        throw this.raise(S.MissingClassName, this.state.startLoc);
    }
    parseClassSuper(r) {
      r.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
    }
    parseExport(r, s) {
      const n = this.parseMaybeImportPhase(r, !0), o = this.maybeParseExportDefaultSpecifier(r, n), f = !o || this.eat(12), E = f && this.eatExportStar(r), C = E && this.maybeParseExportNamespaceSpecifier(r), T = f && (!C || this.eat(12)), N = o || E;
      if (E && !C) {
        if (o && this.unexpected(), s)
          throw this.raise(S.UnsupportedDecoratorExport, r);
        return this.parseExportFrom(r, !0), this.sawUnambiguousESM = !0, this.finishNode(r, "ExportAllDeclaration");
      }
      const D = this.maybeParseExportNamedSpecifiers(r);
      o && f && !E && !D && this.unexpected(null, 5), C && T && this.unexpected(null, 98);
      let V;
      if (N || D) {
        if (V = !1, s)
          throw this.raise(S.UnsupportedDecoratorExport, r);
        this.parseExportFrom(r, N);
      } else
        V = this.maybeParseExportDeclaration(r);
      if (N || D || V) {
        var j;
        const W = r;
        if (this.checkExport(W, !0, !1, !!W.source), ((j = W.declaration) == null ? void 0 : j.type) === "ClassDeclaration")
          this.maybeTakeDecorators(s, W.declaration, W);
        else if (s)
          throw this.raise(S.UnsupportedDecoratorExport, r);
        return this.sawUnambiguousESM = !0, this.finishNode(W, "ExportNamedDeclaration");
      }
      if (this.eat(65)) {
        const W = r, H = this.parseExportDefaultExpression();
        if (W.declaration = H, H.type === "ClassDeclaration")
          this.maybeTakeDecorators(s, H, W);
        else if (s)
          throw this.raise(S.UnsupportedDecoratorExport, r);
        return this.checkExport(W, !0, !0), this.sawUnambiguousESM = !0, this.finishNode(W, "ExportDefaultDeclaration");
      }
      throw this.unexpected(null, 5);
    }
    eatExportStar(r) {
      return this.eat(55);
    }
    maybeParseExportDefaultSpecifier(r, s) {
      if (s || this.isExportDefaultSpecifier()) {
        this.expectPlugin("exportDefaultFrom", s?.loc.start);
        const n = s || this.parseIdentifier(!0), o = this.startNodeAtNode(n);
        return o.exported = n, r.specifiers = [this.finishNode(o, "ExportDefaultSpecifier")], !0;
      }
      return !1;
    }
    maybeParseExportNamespaceSpecifier(r) {
      if (this.isContextual(93)) {
        var s, n;
        (n = (s = r).specifiers) != null || (s.specifiers = []);
        const o = this.startNodeAt(this.state.lastTokStartLoc);
        return this.next(), o.exported = this.parseModuleExportName(), r.specifiers.push(this.finishNode(o, "ExportNamespaceSpecifier")), !0;
      }
      return !1;
    }
    maybeParseExportNamedSpecifiers(r) {
      if (this.match(5)) {
        const s = r;
        s.specifiers || (s.specifiers = []);
        const n = s.exportKind === "type";
        return s.specifiers.push(...this.parseExportSpecifiers(n)), s.source = null, this.hasPlugin("importAssertions") ? s.assertions = [] : s.attributes = [], s.declaration = null, !0;
      }
      return !1;
    }
    maybeParseExportDeclaration(r) {
      return this.shouldParseExportDeclaration() ? (r.specifiers = [], r.source = null, this.hasPlugin("importAssertions") ? r.assertions = [] : r.attributes = [], r.declaration = this.parseExportDeclaration(r), !0) : !1;
    }
    isAsyncFunction() {
      if (!this.isContextual(95)) return !1;
      const r = this.nextTokenInLineStart();
      return this.isUnparsedContextual(r, "function");
    }
    parseExportDefaultExpression() {
      const r = this.startNode();
      if (this.match(68))
        return this.next(), this.parseFunction(r, 5);
      if (this.isAsyncFunction())
        return this.next(), this.next(), this.parseFunction(r, 13);
      if (this.match(80))
        return this.parseClass(r, !0, !0);
      if (this.match(26))
        return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") === !0 && this.raise(S.DecoratorBeforeExport, this.state.startLoc), this.parseClass(this.maybeTakeDecorators(this.parseDecorators(!1), this.startNode()), !0, !0);
      if (this.match(75) || this.match(74) || this.isLet() || this.isUsing() || this.isAwaitUsing())
        throw this.raise(S.UnsupportedDefaultExport, this.state.startLoc);
      const s = this.parseMaybeAssignAllowIn();
      return this.semicolon(), s;
    }
    parseExportDeclaration(r) {
      return this.match(80) ? this.parseClass(this.startNode(), !0, !1) : this.parseStatementListItem();
    }
    isExportDefaultSpecifier() {
      const {
        type: r
      } = this.state;
      if (ae(r)) {
        if (r === 95 && !this.state.containsEsc || r === 100)
          return !1;
        if ((r === 130 || r === 129) && !this.state.containsEsc) {
          const o = this.nextTokenStart(), f = this.input.charCodeAt(o);
          if (f === 123 || this.chStartsBindingIdentifier(f, o) && !this.input.startsWith("from", o))
            return this.expectOnePlugin(["flow", "typescript"]), !1;
        }
      } else if (!this.match(65))
        return !1;
      const s = this.nextTokenStart(), n = this.isUnparsedContextual(s, "from");
      if (this.input.charCodeAt(s) === 44 || ae(this.state.type) && n)
        return !0;
      if (this.match(65) && n) {
        const o = this.input.charCodeAt(this.nextTokenStartSince(s + 4));
        return o === 34 || o === 39;
      }
      return !1;
    }
    parseExportFrom(r, s) {
      this.eatContextual(98) ? (r.source = this.parseImportSource(), this.checkExport(r), this.maybeParseImportAttributes(r), this.checkJSONModuleImport(r)) : s && this.unexpected(), this.semicolon();
    }
    shouldParseExportDeclaration() {
      const {
        type: r
      } = this.state;
      return r === 26 && (this.expectOnePlugin(["decorators", "decorators-legacy"]), this.hasPlugin("decorators")) ? (this.getPluginOption("decorators", "decoratorsBeforeExport") === !0 && this.raise(S.DecoratorBeforeExport, this.state.startLoc), !0) : this.isUsing() ? (this.raise(S.UsingDeclarationExport, this.state.startLoc), !0) : this.isAwaitUsing() ? (this.raise(S.UsingDeclarationExport, this.state.startLoc), !0) : r === 74 || r === 75 || r === 68 || r === 80 || this.isLet() || this.isAsyncFunction();
    }
    checkExport(r, s, n, o) {
      if (s) {
        var f;
        if (n) {
          if (this.checkDuplicateExports(r, "default"), this.hasPlugin("exportDefaultFrom")) {
            var E;
            const C = r.declaration;
            C.type === "Identifier" && C.name === "from" && C.end - C.start === 4 && !((E = C.extra) != null && E.parenthesized) && this.raise(S.ExportDefaultFromAsIdentifier, C);
          }
        } else if ((f = r.specifiers) != null && f.length)
          for (const C of r.specifiers) {
            const {
              exported: T
            } = C, N = T.type === "Identifier" ? T.name : T.value;
            if (this.checkDuplicateExports(C, N), !o && C.local) {
              const {
                local: D
              } = C;
              D.type !== "Identifier" ? this.raise(S.ExportBindingIsString, C, {
                localName: D.value,
                exportName: N
              }) : (this.checkReservedWord(D.name, D.loc.start, !0, !1), this.scope.checkLocalExport(D));
            }
          }
        else if (r.declaration) {
          const C = r.declaration;
          if (C.type === "FunctionDeclaration" || C.type === "ClassDeclaration") {
            const {
              id: T
            } = C;
            if (!T) throw new Error("Assertion failure");
            this.checkDuplicateExports(r, T.name);
          } else if (C.type === "VariableDeclaration")
            for (const T of C.declarations)
              this.checkDeclaration(T.id);
        }
      }
    }
    checkDeclaration(r) {
      if (r.type === "Identifier")
        this.checkDuplicateExports(r, r.name);
      else if (r.type === "ObjectPattern")
        for (const s of r.properties)
          this.checkDeclaration(s);
      else if (r.type === "ArrayPattern")
        for (const s of r.elements)
          s && this.checkDeclaration(s);
      else r.type === "ObjectProperty" ? this.checkDeclaration(r.value) : r.type === "RestElement" ? this.checkDeclaration(r.argument) : r.type === "AssignmentPattern" && this.checkDeclaration(r.left);
    }
    checkDuplicateExports(r, s) {
      this.exportedIdentifiers.has(s) && (s === "default" ? this.raise(S.DuplicateDefaultExport, r) : this.raise(S.DuplicateExport, r, {
        exportName: s
      })), this.exportedIdentifiers.add(s);
    }
    parseExportSpecifiers(r) {
      const s = [];
      let n = !0;
      for (this.expect(5); !this.eat(8); ) {
        if (n)
          n = !1;
        else if (this.expect(12), this.eat(8)) break;
        const o = this.isContextual(130), f = this.match(134), E = this.startNode();
        E.local = this.parseModuleExportName(), s.push(this.parseExportSpecifier(E, f, r, o));
      }
      return s;
    }
    parseExportSpecifier(r, s, n, o) {
      return this.eatContextual(93) ? r.exported = this.parseModuleExportName() : s ? r.exported = this.cloneStringLiteral(r.local) : r.exported || (r.exported = this.cloneIdentifier(r.local)), this.finishNode(r, "ExportSpecifier");
    }
    parseModuleExportName() {
      if (this.match(134)) {
        const r = this.parseStringLiteral(this.state.value), s = Nd.exec(r.value);
        return s && this.raise(S.ModuleExportNameHasLoneSurrogate, r, {
          surrogateCharCode: s[0].charCodeAt(0)
        }), r;
      }
      return this.parseIdentifier(!0);
    }
    isJSONModuleImport(r) {
      return r.assertions != null ? r.assertions.some(({
        key: s,
        value: n
      }) => n.value === "json" && (s.type === "Identifier" ? s.name === "type" : s.value === "type")) : !1;
    }
    checkImportReflection(r) {
      const {
        specifiers: s
      } = r, n = s.length === 1 ? s[0].type : null;
      if (r.phase === "source")
        n !== "ImportDefaultSpecifier" && this.raise(S.SourcePhaseImportRequiresDefault, s[0].loc.start);
      else if (r.phase === "defer")
        n !== "ImportNamespaceSpecifier" && this.raise(S.DeferImportRequiresNamespace, s[0].loc.start);
      else if (r.module) {
        var o;
        n !== "ImportDefaultSpecifier" && this.raise(S.ImportReflectionNotBinding, s[0].loc.start), ((o = r.assertions) == null ? void 0 : o.length) > 0 && this.raise(S.ImportReflectionHasAssertion, s[0].loc.start);
      }
    }
    checkJSONModuleImport(r) {
      if (this.isJSONModuleImport(r) && r.type !== "ExportAllDeclaration") {
        const {
          specifiers: s
        } = r;
        if (s != null) {
          const n = s.find((o) => {
            let f;
            if (o.type === "ExportSpecifier" ? f = o.local : o.type === "ImportSpecifier" && (f = o.imported), f !== void 0)
              return f.type === "Identifier" ? f.name !== "default" : f.value !== "default";
          });
          n !== void 0 && this.raise(S.ImportJSONBindingNotDefault, n.loc.start);
        }
      }
    }
    isPotentialImportPhase(r) {
      return r ? !1 : this.isContextual(105) || this.isContextual(97) || this.isContextual(127);
    }
    applyImportPhase(r, s, n, o) {
      s || (n === "module" ? (this.expectPlugin("importReflection", o), r.module = !0) : this.hasPlugin("importReflection") && (r.module = !1), n === "source" ? (this.expectPlugin("sourcePhaseImports", o), r.phase = "source") : n === "defer" ? (this.expectPlugin("deferredImportEvaluation", o), r.phase = "defer") : this.hasPlugin("sourcePhaseImports") && (r.phase = null));
    }
    parseMaybeImportPhase(r, s) {
      if (!this.isPotentialImportPhase(s))
        return this.applyImportPhase(r, s, null), null;
      const n = this.startNode(), o = this.parseIdentifierName(!0), {
        type: f
      } = this.state;
      return (Ke(f) ? f !== 98 || this.lookaheadCharCode() === 102 : f !== 12) ? (this.applyImportPhase(r, s, o, n.loc.start), null) : (this.applyImportPhase(r, s, null), this.createIdentifier(n, o));
    }
    isPrecedingIdImportPhase(r) {
      const {
        type: s
      } = this.state;
      return ae(s) ? s !== 98 || this.lookaheadCharCode() === 102 : s !== 12;
    }
    parseImport(r) {
      return this.match(134) ? this.parseImportSourceAndAttributes(r) : this.parseImportSpecifiersAndAfter(r, this.parseMaybeImportPhase(r, !1));
    }
    parseImportSpecifiersAndAfter(r, s) {
      r.specifiers = [];
      const o = !this.maybeParseDefaultImportSpecifier(r, s) || this.eat(12), f = o && this.maybeParseStarImportSpecifier(r);
      return o && !f && this.parseNamedImportSpecifiers(r), this.expectContextual(98), this.parseImportSourceAndAttributes(r);
    }
    parseImportSourceAndAttributes(r) {
      var s;
      return (s = r.specifiers) != null || (r.specifiers = []), r.source = this.parseImportSource(), this.maybeParseImportAttributes(r), this.checkImportReflection(r), this.checkJSONModuleImport(r), this.semicolon(), this.sawUnambiguousESM = !0, this.finishNode(r, "ImportDeclaration");
    }
    parseImportSource() {
      return this.match(134) || this.unexpected(), this.parseExprAtom();
    }
    parseImportSpecifierLocal(r, s, n) {
      s.local = this.parseIdentifier(), r.specifiers.push(this.finishImportSpecifier(s, n));
    }
    finishImportSpecifier(r, s, n = 8201) {
      return this.checkLVal(r.local, {
        type: s
      }, n), this.finishNode(r, s);
    }
    parseImportAttributes() {
      this.expect(5);
      const r = [], s = /* @__PURE__ */ new Set();
      do {
        if (this.match(8))
          break;
        const n = this.startNode(), o = this.state.value;
        if (s.has(o) && this.raise(S.ModuleAttributesWithDuplicateKeys, this.state.startLoc, {
          key: o
        }), s.add(o), this.match(134) ? n.key = this.parseStringLiteral(o) : n.key = this.parseIdentifier(!0), this.expect(14), !this.match(134))
          throw this.raise(S.ModuleAttributeInvalidValue, this.state.startLoc);
        n.value = this.parseStringLiteral(this.state.value), r.push(this.finishNode(n, "ImportAttribute"));
      } while (this.eat(12));
      return this.expect(8), r;
    }
    parseModuleAttributes() {
      const r = [], s = /* @__PURE__ */ new Set();
      do {
        const n = this.startNode();
        if (n.key = this.parseIdentifier(!0), n.key.name !== "type" && this.raise(S.ModuleAttributeDifferentFromType, n.key), s.has(n.key.name) && this.raise(S.ModuleAttributesWithDuplicateKeys, n.key, {
          key: n.key.name
        }), s.add(n.key.name), this.expect(14), !this.match(134))
          throw this.raise(S.ModuleAttributeInvalidValue, this.state.startLoc);
        n.value = this.parseStringLiteral(this.state.value), r.push(this.finishNode(n, "ImportAttribute"));
      } while (this.eat(12));
      return r;
    }
    maybeParseImportAttributes(r) {
      let s;
      var n = !1;
      if (this.match(76)) {
        if (this.hasPrecedingLineBreak() && this.lookaheadCharCode() === 40)
          return;
        this.next(), this.hasPlugin("moduleAttributes") ? (s = this.parseModuleAttributes(), this.addExtra(r, "deprecatedWithLegacySyntax", !0)) : s = this.parseImportAttributes(), n = !0;
      } else this.isContextual(94) && !this.hasPrecedingLineBreak() ? (!this.hasPlugin("deprecatedImportAssert") && !this.hasPlugin("importAssertions") && this.raise(S.ImportAttributesUseAssert, this.state.startLoc), this.hasPlugin("importAssertions") || this.addExtra(r, "deprecatedAssertSyntax", !0), this.next(), s = this.parseImportAttributes()) : s = [];
      !n && this.hasPlugin("importAssertions") ? r.assertions = s : r.attributes = s;
    }
    maybeParseDefaultImportSpecifier(r, s) {
      if (s) {
        const n = this.startNodeAtNode(s);
        return n.local = s, r.specifiers.push(this.finishImportSpecifier(n, "ImportDefaultSpecifier")), !0;
      } else if (Ke(this.state.type))
        return this.parseImportSpecifierLocal(r, this.startNode(), "ImportDefaultSpecifier"), !0;
      return !1;
    }
    maybeParseStarImportSpecifier(r) {
      if (this.match(55)) {
        const s = this.startNode();
        return this.next(), this.expectContextual(93), this.parseImportSpecifierLocal(r, s, "ImportNamespaceSpecifier"), !0;
      }
      return !1;
    }
    parseNamedImportSpecifiers(r) {
      let s = !0;
      for (this.expect(5); !this.eat(8); ) {
        if (s)
          s = !1;
        else {
          if (this.eat(14))
            throw this.raise(S.DestructureNamedImport, this.state.startLoc);
          if (this.expect(12), this.eat(8)) break;
        }
        const n = this.startNode(), o = this.match(134), f = this.isContextual(130);
        n.imported = this.parseModuleExportName();
        const E = this.parseImportSpecifier(n, o, r.importKind === "type" || r.importKind === "typeof", f, void 0);
        r.specifiers.push(E);
      }
    }
    parseImportSpecifier(r, s, n, o, f) {
      if (this.eatContextual(93))
        r.local = this.parseIdentifier();
      else {
        const {
          imported: E
        } = r;
        if (s)
          throw this.raise(S.ImportBindingIsString, r, {
            importName: E.value
          });
        this.checkReservedWord(E.name, r.loc.start, !0, !0), r.local || (r.local = this.cloneIdentifier(E));
      }
      return this.finishImportSpecifier(r, "ImportSpecifier", f);
    }
    isThisParam(r) {
      return r.type === "Identifier" && r.name === "this";
    }
  }
  class il extends Od {
    constructor(r, s, n) {
      const o = M(r);
      super(o, s), this.options = o, this.initializeScopes(), this.plugins = n, this.filename = o.sourceFilename, this.startIndex = o.startIndex;
      let f = 0;
      o.allowAwaitOutsideFunction && (f |= 1), o.allowReturnOutsideFunction && (f |= 2), o.allowImportExportEverywhere && (f |= 8), o.allowSuperOutsideMethod && (f |= 16), o.allowUndeclaredExports && (f |= 64), o.allowNewTargetOutsideFunction && (f |= 4), o.allowYieldOutsideFunction && (f |= 32), o.ranges && (f |= 128), o.tokens && (f |= 256), o.createImportExpressions && (f |= 512), o.createParenthesizedExpressions && (f |= 1024), o.errorRecovery && (f |= 2048), o.attachComment && (f |= 4096), o.annexB && (f |= 8192), this.optionFlags = f;
    }
    getScopeHandler() {
      return sn;
    }
    parse() {
      this.enterInitialScopes();
      const r = this.startNode(), s = this.startNode();
      this.nextToken(), r.errors = null;
      const n = this.parseTopLevel(r, s);
      return n.errors = this.state.errors, n.comments.length = this.state.commentsLen, n;
    }
  }
  function _d(x, r) {
    var s;
    if (((s = r) == null ? void 0 : s.sourceType) === "unambiguous") {
      r = Object.assign({}, r);
      try {
        r.sourceType = "module";
        const n = js(r, x), o = n.parse();
        if (n.sawUnambiguousESM)
          return o;
        if (n.ambiguousScriptDifferentAst)
          try {
            return r.sourceType = "script", js(r, x).parse();
          } catch {
          }
        else
          o.program.sourceType = "script";
        return o;
      } catch (n) {
        try {
          return r.sourceType = "script", js(r, x).parse();
        } catch {
        }
        throw n;
      }
    } else
      return js(r, x).parse();
  }
  function Dd(x, r) {
    const s = js(r, x);
    return s.options.strictMode && (s.state.strict = !0), s.getExpression();
  }
  function Bd(x) {
    const r = {};
    for (const s of Object.keys(x))
      r[s] = At(x[s]);
    return r;
  }
  const Ld = Bd(Xr);
  function js(x, r) {
    let s = il;
    const n = /* @__PURE__ */ new Map();
    if (x != null && x.plugins) {
      for (const o of x.plugins) {
        let f, E;
        typeof o == "string" ? f = o : [f, E] = o, n.has(f) || n.set(f, E || {});
      }
      Cd(n), s = Rd(n);
    }
    return new s(x, r, n);
  }
  const rl = /* @__PURE__ */ new Map();
  function Rd(x) {
    const r = [];
    for (const o of vd)
      x.has(o) && r.push(o);
    const s = r.join("|");
    let n = rl.get(s);
    if (!n) {
      n = il;
      for (const o of r)
        n = sl[o](n);
      rl.set(s, n);
    }
    return n;
  }
  return ms.parse = _d, ms.parseExpression = Dd, ms.tokTypes = Ld, ms;
}
var ss = /* @__PURE__ */ bg();
class wg {
  constructor() {
    this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (t) => this.replacement = t
    };
  }
  /**
   *
   * @param {any} parent
   * @param {string} prop
   * @param {number} index
   * @param {BaseNode} node
   */
  replace(t, i, a, l) {
    t && (a !== null ? t[i][a] = l : t[i] = l);
  }
  /**
   *
   * @param {any} parent
   * @param {string} prop
   * @param {number} index
   */
  remove(t, i, a) {
    t && (a !== null ? t[i].splice(a, 1) : delete t[i]);
  }
}
class Cg extends wg {
  /**
   *
   * @param {SyncHandler} enter
   * @param {SyncHandler} leave
   */
  constructor(t, i) {
    super(), this.enter = t, this.leave = i;
  }
  /**
   *
   * @param {BaseNode} node
   * @param {BaseNode} parent
   * @param {string} [prop]
   * @param {number} [index]
   * @returns {BaseNode}
   */
  visit(t, i, a, l) {
    if (t) {
      if (this.enter) {
        const h = this.should_skip, c = this.should_remove, p = this.replacement;
        this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.enter.call(this.context, t, i, a, l), this.replacement && (t = this.replacement, this.replace(i, a, l, t)), this.should_remove && this.remove(i, a, l);
        const u = this.should_skip, g = this.should_remove;
        if (this.should_skip = h, this.should_remove = c, this.replacement = p, u) return t;
        if (g) return null;
      }
      for (const h in t) {
        const c = t[h];
        if (typeof c == "object")
          if (Array.isArray(c))
            for (let p = 0; p < c.length; p += 1)
              c[p] !== null && typeof c[p].type == "string" && (this.visit(c[p], t, h, p) || p--);
          else c !== null && typeof c.type == "string" && this.visit(c, t, h, null);
      }
      if (this.leave) {
        const h = this.replacement, c = this.should_remove;
        this.replacement = null, this.should_remove = !1, this.leave.call(this.context, t, i, a, l), this.replacement && (t = this.replacement, this.replace(i, a, l, t)), this.should_remove && this.remove(i, a, l);
        const p = this.should_remove;
        if (this.replacement = h, this.should_remove = c, p) return null;
      }
    }
    return t;
  }
}
function vg(e, { enter: t, leave: i }) {
  return new Cg(t, i).visit(e, null);
}
function Ga(e, t, i = !1, a = [], l = /* @__PURE__ */ Object.create(null)) {
  const h = e.type === "Program" ? e.body[0].type === "ExpressionStatement" && e.body[0].expression : e;
  vg(e, {
    enter(c, p) {
      if (p && a.push(p), p && p.type.startsWith("TS") && !Wa.includes(p.type))
        return this.skip();
      if (c.type === "Identifier") {
        const u = !!l[c.name], g = Cu(c, p, a);
        (i || g && !u) && t(c, p, a, g, u);
      } else if (c.type === "ObjectProperty" && // eslint-disable-next-line no-restricted-syntax
      p?.type === "ObjectPattern")
        c.inPattern = !0;
      else if (Ou(c))
        c.scopeIds ? c.scopeIds.forEach((u) => ys(u, l)) : Tu(
          c,
          (u) => Qs(c, u, l)
        );
      else if (c.type === "BlockStatement")
        c.scopeIds ? c.scopeIds.forEach((u) => ys(u, l)) : Ka(
          c,
          (u) => Qs(c, u, l)
        );
      else if (c.type === "SwitchStatement")
        c.scopeIds ? c.scopeIds.forEach((u) => ys(u, l)) : ku(
          c,
          !1,
          (u) => Qs(c, u, l)
        );
      else if (c.type === "CatchClause" && c.param)
        if (c.scopeIds)
          c.scopeIds.forEach((u) => ys(u, l));
        else
          for (const u of ht(c.param))
            Qs(c, u, l);
      else Pu(c) && (c.scopeIds ? c.scopeIds.forEach((u) => ys(u, l)) : Nu(
        c,
        !1,
        (u) => Qs(c, u, l)
      ));
    },
    leave(c, p) {
      if (p && a.pop(), c !== h && c.scopeIds)
        for (const u of c.scopeIds)
          l[u]--, l[u] === 0 && delete l[u];
    }
  });
}
function Cu(e, t, i) {
  if (!t)
    return !0;
  if (e.name === "arguments")
    return !1;
  if (Tg(e, t, i[i.length - 2]))
    return !0;
  switch (t.type) {
    case "AssignmentExpression":
    case "AssignmentPattern":
      return !0;
    case "ObjectProperty":
      return t.key !== e && tr(t, i);
    case "ArrayPattern":
      return tr(t, i);
  }
  return !1;
}
function tr(e, t) {
  if (e && (e.type === "ObjectProperty" || e.type === "ArrayPattern")) {
    let i = t.length;
    for (; i--; ) {
      const a = t[i];
      if (a.type === "AssignmentExpression")
        return !0;
      if (a.type !== "ObjectProperty" && !a.type.endsWith("Pattern"))
        break;
    }
  }
  return !1;
}
function vu(e) {
  let t = e.length;
  for (; t--; ) {
    const i = e[t];
    if (i.type === "NewExpression")
      return !0;
    if (i.type !== "MemberExpression")
      break;
  }
  return !1;
}
function Tu(e, t) {
  for (const i of e.params)
    for (const a of ht(i))
      t(a);
}
function Ka(e, t) {
  const i = e.type === "SwitchCase" ? e.consequent : e.body;
  for (const a of i)
    if (a.type === "VariableDeclaration") {
      if (a.declare) continue;
      for (const l of a.declarations)
        for (const h of ht(l.id))
          t(h);
    } else if (a.type === "FunctionDeclaration" || a.type === "ClassDeclaration") {
      if (a.declare || !a.id) continue;
      t(a.id);
    } else Pu(a) ? Nu(a, !0, t) : a.type === "SwitchStatement" && ku(a, !0, t);
}
function Pu(e) {
  return e.type === "ForOfStatement" || e.type === "ForInStatement" || e.type === "ForStatement";
}
function Nu(e, t, i) {
  const a = e.type === "ForStatement" ? e.init : e.left;
  if (a && a.type === "VariableDeclaration" && (a.kind === "var" ? t : !t))
    for (const l of a.declarations)
      for (const h of ht(l.id))
        i(h);
}
function ku(e, t, i) {
  for (const a of e.cases) {
    for (const l of a.consequent)
      if (l.type === "VariableDeclaration" && (l.kind === "var" ? t : !t))
        for (const h of l.declarations)
          for (const c of ht(h.id))
            i(c);
    Ka(a, i);
  }
}
function ht(e, t = []) {
  switch (e.type) {
    case "Identifier":
      t.push(e);
      break;
    case "MemberExpression":
      let i = e;
      for (; i.type === "MemberExpression"; )
        i = i.object;
      t.push(i);
      break;
    case "ObjectPattern":
      for (const a of e.properties)
        a.type === "RestElement" ? ht(a.argument, t) : ht(a.value, t);
      break;
    case "ArrayPattern":
      e.elements.forEach((a) => {
        a && ht(a, t);
      });
      break;
    case "RestElement":
      ht(e.argument, t);
      break;
    case "AssignmentPattern":
      ht(e.left, t);
      break;
  }
  return t;
}
function ys(e, t) {
  e in t ? t[e]++ : t[e] = 1;
}
function Qs(e, t, i) {
  const { name: a } = t;
  e.scopeIds && e.scopeIds.has(a) || (ys(a, i), (e.scopeIds || (e.scopeIds = /* @__PURE__ */ new Set())).add(a));
}
const Ou = (e) => /Function(?:Expression|Declaration)$|Method$/.test(e.type), ja = (e) => e && (e.type === "ObjectProperty" || e.type === "ObjectMethod") && !e.computed, _u = (e, t) => ja(t) && t.key === e;
function Tg(e, t, i) {
  switch (t.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "OptionalMemberExpression":
      return t.property === e ? !!t.computed : t.object === e;
    case "JSXMemberExpression":
      return t.object === e;
    // no: let NODE = init;
    // yes: let id = NODE;
    case "VariableDeclarator":
      return t.init === e;
    // yes: () => NODE
    // no: (NODE) => {}
    case "ArrowFunctionExpression":
      return t.body === e;
    // no: class { #NODE; }
    // no: class { get #NODE() {} }
    // no: class { #NODE() {} }
    // no: class { fn() { return this.#NODE; } }
    case "PrivateName":
      return !1;
    // no: class { NODE() {} }
    // yes: class { [NODE]() {} }
    // no: class { foo(NODE) {} }
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      return t.key === e ? !!t.computed : !1;
    // yes: { [NODE]: "" }
    // no: { NODE: "" }
    // depends: { NODE }
    // depends: { key: NODE }
    case "ObjectProperty":
      return t.key === e ? !!t.computed : !i || i.type !== "ObjectPattern";
    // no: class { NODE = value; }
    // yes: class { [NODE] = value; }
    // yes: class { key = NODE; }
    case "ClassProperty":
      return t.key === e ? !!t.computed : !0;
    case "ClassPrivateProperty":
      return t.key !== e;
    // no: class NODE {}
    // yes: class Foo extends NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return t.superClass === e;
    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return t.right === e;
    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return t.right === e;
    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return !1;
    // no: try {} catch (NODE) {}
    case "CatchClause":
      return !1;
    // no: function foo(...NODE) {}
    case "RestElement":
      return !1;
    case "BreakStatement":
    case "ContinueStatement":
      return !1;
    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "FunctionDeclaration":
    case "FunctionExpression":
      return !1;
    // no: export NODE from "foo";
    // no: export * as NODE from "foo";
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return !1;
    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      return i?.source ? !1 : t.local === e;
    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return !1;
    // no: import "foo" assert { NODE: "json" }
    case "ImportAttribute":
      return !1;
    // no: <div NODE="foo" />
    case "JSXAttribute":
      return !1;
    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return !1;
    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return !1;
    // yes: type X = { someProperty: NODE }
    // no: type X = { NODE: OtherType }
    case "ObjectTypeProperty":
      return t.key !== e;
    // yes: enum X { Foo = NODE }
    // no: enum X { NODE }
    case "TSEnumMember":
      return t.id !== e;
    // yes: { [NODE]: value }
    // no: { NODE: value }
    case "TSPropertySignature":
      return t.key === e ? !!t.computed : !0;
  }
  return !0;
}
const Wa = [
  "TSAsExpression",
  // foo as number
  "TSTypeAssertion",
  // (<number>foo)
  "TSNonNullExpression",
  // foo!
  "TSInstantiationExpression",
  // foo<string>
  "TSSatisfiesExpression"
  // foo satisfies T
];
function Dr(e) {
  return Wa.includes(e.type) ? Dr(e.expression) : e;
}
const Ge = (e) => e.type === 4 && e.isStatic;
function Qa(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return ws;
    case "Suspense":
    case "suspense":
      return fr;
    case "KeepAlive":
    case "keep-alive":
      return qs;
    case "BaseTransition":
    case "base-transition":
      return Pa;
  }
}
const Pg = /^$|^\d|[^\$\w\xA0-\uFFFF]/, mt = (e) => !Pg.test(e), $a = /[A-Za-z_$\xA0-\uFFFF]/, Ng = /[\.\?\w$\xA0-\uFFFF]/, kg = /\s+[.[]\s*|\s*[.[]\s+/g, Br = (e) => e.type === 4 ? e.content : e.loc.source, Og = (e) => {
  const t = Br(e).trim().replace(kg, (p) => p.trim());
  let i = 0, a = [], l = 0, h = 0, c = null;
  for (let p = 0; p < t.length; p++) {
    const u = t.charAt(p);
    switch (i) {
      case 0:
        if (u === "[")
          a.push(i), i = 1, l++;
        else if (u === "(")
          a.push(i), i = 2, h++;
        else if (!(p === 0 ? $a : Ng).test(u))
          return !1;
        break;
      case 1:
        u === "'" || u === '"' || u === "`" ? (a.push(i), i = 3, c = u) : u === "[" ? l++ : u === "]" && (--l || (i = a.pop()));
        break;
      case 2:
        if (u === "'" || u === '"' || u === "`")
          a.push(i), i = 3, c = u;
        else if (u === "(")
          h++;
        else if (u === ")") {
          if (p === t.length - 1)
            return !1;
          --h || (i = a.pop());
        }
        break;
      case 3:
        u === c && (i = a.pop(), c = null);
        break;
    }
  }
  return !l && !h;
}, Du = (e, t) => {
  try {
    let i = e.ast || ss.parseExpression(Br(e), {
      plugins: t.expressionPlugins ? [...t.expressionPlugins, "typescript"] : ["typescript"]
    });
    return i = Dr(i), i.type === "MemberExpression" || i.type === "OptionalMemberExpression" || i.type === "Identifier" && i.name !== "undefined";
  } catch {
    return !1;
  }
}, Ha = Du, _g = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/, Dg = (e) => _g.test(Br(e)), Bu = (e, t) => {
  try {
    let i = e.ast || ss.parseExpression(Br(e), {
      plugins: t.expressionPlugins ? [...t.expressionPlugins, "typescript"] : ["typescript"]
    });
    return i.type === "Program" && (i = i.body[0], i.type === "ExpressionStatement" && (i = i.expression)), i = Dr(i), i.type === "FunctionExpression" || i.type === "ArrowFunctionExpression";
  } catch {
    return !1;
  }
}, Lu = Bu;
function da(e, t, i = t.length) {
  return Ya(
    {
      offset: e.offset,
      line: e.line,
      column: e.column
    },
    t,
    i
  );
}
function Ya(e, t, i = t.length) {
  let a = 0, l = -1;
  for (let h = 0; h < i; h++)
    t.charCodeAt(h) === 10 && (a++, l = h);
  return e.offset += i, e.line += a, e.column = l === -1 ? e.column + i : i - l, e;
}
function ma(e, t) {
  if (!e)
    throw new Error(t || "unexpected compiler condition");
}
function Be(e, t, i = !1) {
  for (let a = 0; a < e.props.length; a++) {
    const l = e.props[a];
    if (l.type === 7 && (i || l.exp) && (le(t) ? l.name === t : t.test(l.name)))
      return l;
  }
}
function Os(e, t, i = !1, a = !1) {
  for (let l = 0; l < e.props.length; l++) {
    const h = e.props[l];
    if (h.type === 6) {
      if (i) continue;
      if (h.name === t && (h.value || a))
        return h;
    } else if (h.name === "bind" && (h.exp || a) && Ut(h.arg, t))
      return h;
  }
}
function Ut(e, t) {
  return !!(e && Ge(e) && e.content === t);
}
function Ru(e) {
  return e.props.some(
    (t) => t.type === 7 && t.name === "bind" && (!t.arg || // v-bind="obj"
    t.arg.type !== 4 || // v-bind:[_ctx.foo]
    !t.arg.isStatic)
    // v-bind:[foo]
  );
}
function Fi(e) {
  return e.type === 5 || e.type === 2;
}
function Aa(e) {
  return e.type === 7 && e.name === "pre";
}
function Lr(e) {
  return e.type === 7 && e.name === "slot";
}
function _s(e) {
  return e.type === 1 && e.tagType === 3;
}
function ri(e) {
  return e.type === 1 && e.tagType === 2;
}
const Bg = /* @__PURE__ */ new Set([Ns, Ls]);
function Ja(e, t = []) {
  if (e && !le(e) && e.type === 14) {
    const i = e.callee;
    if (!le(i) && Bg.has(i))
      return Ja(
        e.arguments[0],
        t.concat(e)
      );
  }
  return [e, t];
}
function ni(e, t, i) {
  if (e.type !== 13 && Lg(e, t))
    return;
  let a, l = e.type === 13 ? e.props : e.arguments[2], h = [], c;
  if (l && !le(l) && l.type === 14) {
    const p = Ja(l);
    l = p[0], h = p[1], c = h[h.length - 1];
  }
  if (l == null || le(l))
    a = it([t]);
  else if (l.type === 14) {
    const p = l.arguments[0];
    !le(p) && p.type === 15 ? ga(t, p) || p.properties.unshift(t) : l.callee === wr ? a = ve(i.helper(ei), [
      it([t]),
      l
    ]) : l.arguments.unshift(it([t])), !a && (a = l);
  } else l.type === 15 ? (ga(t, l) || l.properties.unshift(t), a = l) : (a = ve(i.helper(ei), [
    it([t]),
    l
  ]), c && c.callee === Ls && (c = h[h.length - 2]));
  e.type === 13 ? c ? c.arguments[0] = a : e.props = a : c ? c.arguments[0] = a : e.arguments[2] = a;
}
function Lg(e, t) {
  var i, a, l;
  if (t.key.type !== 4 || t.key.content !== "key")
    return !1;
  const h = e.arguments[2];
  if (h && !le(h)) {
    const [c] = Ja(h);
    if (c && !le(c) && c.type === 15 && ga(t, c))
      return !0;
  }
  return (i = e.arguments)[2] || (i[2] = "{}"), (a = e.arguments)[3] || (a[3] = "undefined"), (l = e.arguments)[4] || (l[4] = "undefined"), e.arguments[5] = t.value, !0;
}
function ga(e, t) {
  let i = !1;
  if (e.key.type === 4) {
    const a = e.key.content;
    i = t.properties.some(
      (l) => l.key.type === 4 && l.key.content === a
    );
  }
  return i;
}
function ai(e, t) {
  return `_${t}_${e.replace(/[^\w]/g, (i, a) => i === "-" ? "_" : e.charCodeAt(a).toString())}`;
}
function Fe(e, t) {
  if (!e || Object.keys(t).length === 0)
    return !1;
  switch (e.type) {
    case 1:
      for (let i = 0; i < e.props.length; i++) {
        const a = e.props[i];
        if (a.type === 7 && (Fe(a.arg, t) || Fe(a.exp, t)))
          return !0;
      }
      return e.children.some((i) => Fe(i, t));
    case 11:
      return Fe(e.source, t) ? !0 : e.children.some((i) => Fe(i, t));
    case 9:
      return e.branches.some((i) => Fe(i, t));
    case 10:
      return Fe(e.condition, t) ? !0 : e.children.some((i) => Fe(i, t));
    case 4:
      return !e.isStatic && mt(e.content) && !!t[e.content];
    case 8:
      return e.children.some((i) => Ds(i) && Fe(i, t));
    case 5:
    case 12:
      return Fe(e.content, t);
    case 2:
    case 3:
    case 20:
      return !1;
    default:
      return !1;
  }
}
function Mu(e) {
  return e.type === 14 && e.callee === vr ? e.arguments[1].returns : e;
}
const Fu = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function Xa(e) {
  for (let t = 0; t < e.length; t++)
    if (!st(e.charCodeAt(t)))
      return !1;
  return !0;
}
function Rr(e) {
  return e.type === 2 && Xa(e.content) || e.type === 12 && Rr(e.content);
}
function Mr(e) {
  return e.type === 3 || Rr(e);
}
const Uu = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: vi,
  isPreTag: vi,
  isIgnoreNewlineTag: vi,
  isCustomElement: vi,
  onError: Fa,
  onWarn: wu,
  comments: !0,
  prefixIdentifiers: !1
};
let de = Uu, sr = null, wt = "", Ve = null, oe = null, nt = "", St = -1, Yt = -1, Za = 0, Mt = !1, ya = null;
const be = [], ge = new Ag(be, {
  onerr: je,
  ontext(e, t) {
    Ti(Me(e, t), e, t);
  },
  ontextentity(e, t, i) {
    Ti(e, t, i);
  },
  oninterpolation(e, t) {
    if (Mt)
      return Ti(Me(e, t), e, t);
    let i = e + ge.delimiterOpen.length, a = t - ge.delimiterClose.length;
    for (; st(wt.charCodeAt(i)); )
      i++;
    for (; st(wt.charCodeAt(a - 1)); )
      a--;
    let l = Me(i, a);
    l.includes("&") && (l = mg(l)), Sa({
      type: 5,
      content: Vi(l, !1, Ce(i, a)),
      loc: Ce(e, t)
    });
  },
  onopentagname(e, t) {
    const i = Me(e, t);
    Ve = {
      type: 1,
      tag: i,
      ns: de.getNamespace(i, be[0], de.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: Ce(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    tc(e);
  },
  onclosetag(e, t) {
    const i = Me(e, t);
    if (!de.isVoidTag(i)) {
      let a = !1;
      for (let l = 0; l < be.length; l++)
        if (be[l].tag.toLowerCase() === i.toLowerCase()) {
          a = !0, l > 0 && je(24, be[0].loc.start.offset);
          for (let c = 0; c <= l; c++) {
            const p = be.shift();
            Ui(p, t, c < l);
          }
          break;
        }
      a || je(23, Vu(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = Ve.tag;
    Ve.isSelfClosing = !0, tc(e), be[0] && be[0].tag === t && Ui(be.shift(), e);
  },
  onattribname(e, t) {
    oe = {
      type: 6,
      name: Me(e, t),
      nameLoc: Ce(e, t),
      value: void 0,
      loc: Ce(e)
    };
  },
  ondirname(e, t) {
    const i = Me(e, t), a = i === "." || i === ":" ? "bind" : i === "@" ? "on" : i === "#" ? "slot" : i.slice(2);
    if (!Mt && a === "" && je(26, e), Mt || a === "")
      oe = {
        type: 6,
        name: i,
        nameLoc: Ce(e, t),
        value: void 0,
        loc: Ce(e)
      };
    else if (oe = {
      type: 7,
      name: a,
      rawName: i,
      exp: void 0,
      arg: void 0,
      modifiers: i === "." ? [z("prop")] : [],
      loc: Ce(e)
    }, a === "pre") {
      Mt = ge.inVPre = !0, ya = Ve;
      const l = Ve.props;
      for (let h = 0; h < l.length; h++)
        l[h].type === 7 && (l[h] = $g(l[h]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const i = Me(e, t);
    if (Mt && !Aa(oe))
      oe.name += i, es(oe.nameLoc, t);
    else {
      const a = i[0] !== "[";
      oe.arg = Vi(
        a ? i : i.slice(1, -1),
        a,
        Ce(e, t),
        a ? 3 : 0
      );
    }
  },
  ondirmodifier(e, t) {
    const i = Me(e, t);
    if (Mt && !Aa(oe))
      oe.name += "." + i, es(oe.nameLoc, t);
    else if (oe.name === "slot") {
      const a = oe.arg;
      a && (a.content += "." + i, es(a.loc, t));
    } else {
      const a = z(i, !0, Ce(e, t));
      oe.modifiers.push(a);
    }
  },
  onattribdata(e, t) {
    nt += Me(e, t), St < 0 && (St = e), Yt = t;
  },
  onattribentity(e, t, i) {
    nt += e, St < 0 && (St = t), Yt = i;
  },
  onattribnameend(e) {
    const t = oe.loc.start.offset, i = Me(t, e);
    oe.type === 7 && (oe.rawName = i), Ve.props.some(
      (a) => (a.type === 7 ? a.rawName : a.name) === i
    ) && je(2, t);
  },
  onattribend(e, t) {
    if (Ve && oe) {
      if (es(oe.loc, t), e !== 0)
        if (oe.type === 6)
          oe.name === "class" && (nt = Ku(nt).trim()), e === 1 && !nt && je(13, t), oe.value = {
            type: 2,
            content: nt,
            loc: e === 1 ? Ce(St, Yt) : Ce(St - 1, Yt + 1)
          }, ge.inSFCRoot && Ve.tag === "template" && oe.name === "lang" && nt && nt !== "html" && ge.enterRCDATA(er("</template"), 0);
        else {
          let i = 0;
          oe.name === "for" ? i = 3 : oe.name === "slot" ? i = 1 : oe.name === "on" && nt.includes(";") && (i = 2), oe.exp = Vi(
            nt,
            !1,
            Ce(St, Yt),
            0,
            i
          ), oe.name === "for" && (oe.forParseResult = Mg(oe.exp));
        }
      (oe.type !== 7 || oe.name !== "pre") && Ve.props.push(oe);
    }
    nt = "", St = Yt = -1;
  },
  oncomment(e, t) {
    de.comments && Sa({
      type: 3,
      content: Me(e, t),
      loc: Ce(e - 4, t + 3)
    });
  },
  onend() {
    const e = wt.length;
    if (ge.state !== 1)
      switch (ge.state) {
        case 5:
        case 8:
          je(5, e);
          break;
        case 3:
        case 4:
          je(
            25,
            ge.sectionStart
          );
          break;
        case 28:
          ge.currentSequence === _e.CdataEnd ? je(6, e) : je(7, e);
          break;
        case 6:
        case 7:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        // "
        case 20:
        // '
        case 21:
          je(9, e);
          break;
      }
    for (let t = 0; t < be.length; t++)
      Ui(be[t], e - 1), je(24, be[t].loc.start.offset);
  },
  oncdata(e, t) {
    (be[0] ? be[0].ns : de.ns) !== 0 ? Ti(Me(e, t), e, t) : je(1, e - 9);
  },
  onprocessinginstruction(e) {
    (be[0] ? be[0].ns : de.ns) === 0 && je(
      21,
      e - 1
    );
  }
}), ec = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Rg = /^\(|\)$/g;
function Mg(e) {
  const t = e.loc, i = e.content, a = i.match(Fu);
  if (!a) return;
  const [, l, h] = a, c = (A, m, d = !1) => {
    const y = t.start.offset + m, I = y + A.length;
    return Vi(
      A,
      !1,
      Ce(y, I),
      0,
      d ? 1 : 0
      /* Normal */
    );
  }, p = {
    source: c(h.trim(), i.indexOf(h, l.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: !1
  };
  let u = l.trim().replace(Rg, "").trim();
  const g = l.indexOf(u), b = u.match(ec);
  if (b) {
    u = u.replace(ec, "").trim();
    const A = b[1].trim();
    let m;
    if (A && (m = i.indexOf(A, g + u.length), p.key = c(A, m, !0)), b[2]) {
      const d = b[2].trim();
      d && (p.index = c(
        d,
        i.indexOf(
          d,
          p.key ? m + A.length : g + u.length
        ),
        !0
      ));
    }
  }
  return u && (p.value = c(u, g, !0)), p;
}
function Me(e, t) {
  return wt.slice(e, t);
}
function tc(e) {
  ge.inSFCRoot && (Ve.innerLoc = Ce(e + 1, e + 1)), Sa(Ve);
  const { tag: t, ns: i } = Ve;
  i === 0 && de.isPreTag(t) && Za++, de.isVoidTag(t) ? Ui(Ve, e) : (be.unshift(Ve), (i === 1 || i === 2) && (ge.inXML = !0)), Ve = null;
}
function Ti(e, t, i) {
  const a = be[0] || sr, l = a.children[a.children.length - 1];
  l && l.type === 2 ? (l.content += e, es(l.loc, i)) : a.children.push({
    type: 2,
    content: e,
    loc: Ce(t, i)
  });
}
function Ui(e, t, i = !1) {
  i ? es(e.loc, Vu(t, 60)) : es(e.loc, Fg(t, 62) + 1), ge.inSFCRoot && (e.children.length ? e.innerLoc.end = bt({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = bt({}, e.innerLoc.start), e.innerLoc.source = Me(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: a, ns: l, children: h } = e;
  if (Mt || (a === "slot" ? e.tagType = 2 : Vg(e) ? e.tagType = 3 : Gg(e) && (e.tagType = 1)), ge.inRCDATA || (e.children = Gu(h)), l === 0 && de.isIgnoreNewlineTag(a)) {
    const c = h[0];
    c && c.type === 2 && (c.content = c.content.replace(/^\r?\n/, ""));
  }
  l === 0 && de.isPreTag(a) && Za--, ya === e && (Mt = ge.inVPre = !1, ya = null), ge.inXML && (be[0] ? be[0].ns : de.ns) === 0 && (ge.inXML = !1);
}
function Fg(e, t) {
  let i = e;
  for (; wt.charCodeAt(i) !== t && i < wt.length - 1; ) i++;
  return i;
}
function Vu(e, t) {
  let i = e;
  for (; wt.charCodeAt(i) !== t && i >= 0; ) i--;
  return i;
}
const Ug = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function Vg({ tag: e, props: t }) {
  if (e === "template") {
    for (let i = 0; i < t.length; i++)
      if (t[i].type === 7 && Ug.has(t[i].name))
        return !0;
  }
  return !1;
}
function Gg({ tag: e, props: t }) {
  if (de.isCustomElement(e))
    return !1;
  if (e === "component" || Kg(e.charCodeAt(0)) || Qa(e) || de.isBuiltInComponent && de.isBuiltInComponent(e) || de.isNativeTag && !de.isNativeTag(e))
    return !0;
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (a.type === 6 && a.name === "is" && a.value && a.value.content.startsWith("vue:"))
      return !0;
  }
  return !1;
}
function Kg(e) {
  return e > 64 && e < 91;
}
const jg = /\r\n/g;
function Gu(e) {
  const t = de.whitespace !== "preserve";
  let i = !1;
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (l.type === 2)
      if (Za)
        l.content = l.content.replace(jg, `
`);
      else if (Xa(l.content)) {
        const h = e[a - 1] && e[a - 1].type, c = e[a + 1] && e[a + 1].type;
        !h || !c || t && (h === 3 && (c === 3 || c === 1) || h === 1 && (c === 3 || c === 1 && Wg(l.content))) ? (i = !0, e[a] = null) : l.content = " ";
      } else t && (l.content = Ku(l.content));
  }
  return i ? e.filter(Boolean) : e;
}
function Wg(e) {
  for (let t = 0; t < e.length; t++) {
    const i = e.charCodeAt(t);
    if (i === 10 || i === 13)
      return !0;
  }
  return !1;
}
function Ku(e) {
  let t = "", i = !1;
  for (let a = 0; a < e.length; a++)
    st(e.charCodeAt(a)) ? i || (t += " ", i = !0) : (t += e[a], i = !1);
  return t;
}
function Sa(e) {
  (be[0] || sr).children.push(e);
}
function Ce(e, t) {
  return {
    start: ge.getPos(e),
    // @ts-expect-error allow late attachment
    end: t == null ? t : ge.getPos(t),
    // @ts-expect-error allow late attachment
    source: t == null ? t : Me(e, t)
  };
}
function Qg(e) {
  return Ce(e.start.offset, e.end.offset);
}
function es(e, t) {
  e.end = ge.getPos(t), e.source = Me(e.start.offset, t);
}
function $g(e) {
  const t = {
    type: 6,
    name: e.rawName,
    nameLoc: Ce(
      e.loc.start.offset,
      e.loc.start.offset + e.rawName.length
    ),
    value: void 0,
    loc: e.loc
  };
  if (e.exp) {
    const i = e.exp.loc;
    i.end.offset < e.loc.end.offset && (i.start.offset--, i.start.column--, i.end.offset++, i.end.column++), t.value = {
      type: 2,
      content: e.exp.content,
      loc: i
    };
  }
  return t;
}
function Vi(e, t = !1, i, a = 0, l = 0) {
  const h = z(e, t, i, a);
  if (!t && de.prefixIdentifiers && l !== 3 && e.trim()) {
    if (mt(e))
      return h.ast = null, h;
    try {
      const c = de.expressionPlugins, p = {
        plugins: c ? [...c, "typescript"] : ["typescript"]
      };
      l === 2 ? h.ast = ss.parse(` ${e} `, p).program : l === 1 ? h.ast = ss.parseExpression(`(${e})=>{}`, p) : h.ast = ss.parseExpression(`(${e})`, p);
    } catch (c) {
      h.ast = !1, je(46, i.start.offset, c.message);
    }
  }
  return h;
}
function je(e, t, i) {
  de.onError(
    he(e, Ce(t, t), void 0, i)
  );
}
function Hg() {
  ge.reset(), Ve = null, oe = null, nt = "", St = -1, Yt = -1, be.length = 0;
}
function qa(e, t) {
  if (Hg(), wt = e, de = bt({}, Uu), t) {
    let l;
    for (l in t)
      t[l] != null && (de[l] = t[l]);
  }
  de.decodeEntities && console.warn(
    "[@vue/compiler-core] decodeEntities option is passed but will be ignored in non-browser builds."
  ), ge.mode = de.parseMode === "html" ? 1 : de.parseMode === "sfc" ? 2 : 0, ge.inXML = de.ns === 1 || de.ns === 2;
  const i = t && t.delimiters;
  i && (ge.delimiterOpen = er(i[0]), ge.delimiterClose = er(i[1]));
  const a = sr = Tr([], e);
  return ge.parse(wt), a.loc = Ce(0, e.length), a.children = Gu(a.children), sr = null, a;
}
function Yg(e, t) {
  Gi(
    e,
    void 0,
    t,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    !!ju(e)
  );
}
function ju(e) {
  const t = e.children.filter((i) => i.type !== 3);
  return t.length === 1 && t[0].type === 1 && !ri(t[0]) ? t[0] : null;
}
function Gi(e, t, i, a = !1, l = !1) {
  const { children: h } = e, c = [];
  for (let b = 0; b < h.length; b++) {
    const A = h[b];
    if (A.type === 1 && A.tagType === 0) {
      const m = a ? 0 : qe(A, i);
      if (m > 0) {
        if (m >= 2) {
          A.codegenNode.patchFlag = -1, c.push(A);
          continue;
        }
      } else {
        const d = A.codegenNode;
        if (d.type === 13) {
          const y = d.patchFlag;
          if ((y === void 0 || y === 512 || y === 1) && Qu(A, i) >= 2) {
            const I = $u(A);
            I && (d.props = i.hoist(I));
          }
          d.dynamicProps && (d.dynamicProps = i.hoist(d.dynamicProps));
        }
      }
    } else if (A.type === 12 && (a ? 0 : qe(A, i)) >= 2) {
      A.codegenNode.type === 14 && A.codegenNode.arguments.length > 0 && A.codegenNode.arguments.push(
        `-1 /* ${Js[-1]} */`
      ), c.push(A);
      continue;
    }
    if (A.type === 1) {
      const m = A.tagType === 1;
      m && i.scopes.vSlot++, Gi(A, e, i, !1, l), m && i.scopes.vSlot--;
    } else if (A.type === 11)
      Gi(A, e, i, A.children.length === 1, !0);
    else if (A.type === 9)
      for (let m = 0; m < A.branches.length; m++)
        Gi(
          A.branches[m],
          e,
          i,
          A.branches[m].children.length === 1,
          l
        );
  }
  let p = !1;
  if (c.length === h.length && e.type === 1) {
    if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && $e(e.codegenNode.children))
      e.codegenNode.children = u(
        Ft(e.codegenNode.children)
      ), p = !0;
    else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !$e(e.codegenNode.children) && e.codegenNode.children.type === 15) {
      const b = g(e.codegenNode, "default");
      b && (b.returns = u(
        Ft(b.returns)
      ), p = !0);
    } else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !$e(t.codegenNode.children) && t.codegenNode.children.type === 15) {
      const b = Be(e, "slot", !0), A = b && b.arg && g(t.codegenNode, b.arg);
      A && (A.returns = u(
        Ft(A.returns)
      ), p = !0);
    }
  }
  if (!p)
    for (const b of c)
      b.codegenNode = i.cache(b.codegenNode);
  function u(b) {
    const A = i.cache(b);
    return A.needArraySpread = !0, A;
  }
  function g(b, A) {
    if (b.children && !$e(b.children) && b.children.type === 15) {
      const m = b.children.properties.find(
        (d) => d.key === A || d.key.content === A
      );
      return m && m.value;
    }
  }
  c.length && i.transformHoist && i.transformHoist(h, i, e);
}
function qe(e, t) {
  const { constantCache: i } = t;
  switch (e.type) {
    case 1:
      if (e.tagType !== 0)
        return 0;
      const a = i.get(e);
      if (a !== void 0)
        return a;
      const l = e.codegenNode;
      if (l.type !== 13 || l.isBlock && e.tag !== "svg" && e.tag !== "foreignObject" && e.tag !== "math")
        return 0;
      if (l.patchFlag === void 0) {
        let c = 3;
        const p = Qu(e, t);
        if (p === 0)
          return i.set(e, 0), 0;
        p < c && (c = p);
        for (let u = 0; u < e.children.length; u++) {
          const g = qe(e.children[u], t);
          if (g === 0)
            return i.set(e, 0), 0;
          g < c && (c = g);
        }
        if (c > 1)
          for (let u = 0; u < e.props.length; u++) {
            const g = e.props[u];
            if (g.type === 7 && g.name === "bind" && g.exp) {
              const b = qe(g.exp, t);
              if (b === 0)
                return i.set(e, 0), 0;
              b < c && (c = b);
            }
          }
        if (l.isBlock) {
          for (let u = 0; u < e.props.length; u++)
            if (e.props[u].type === 7)
              return i.set(e, 0), 0;
          t.removeHelper(Vt), t.removeHelper(
            os(t.inSSR, l.isComponent)
          ), l.isBlock = !1, t.helper(as(t.inSSR, l.isComponent));
        }
        return i.set(e, c), c;
      } else
        return i.set(e, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return qe(e.content, t);
    case 4:
      return e.constType;
    case 8:
      let h = 3;
      for (let c = 0; c < e.children.length; c++) {
        const p = e.children[c];
        if (le(p) || cs(p))
          continue;
        const u = qe(p, t);
        if (u === 0)
          return 0;
        u < h && (h = u);
      }
      return h;
    case 20:
      return 2;
    default:
      return 0;
  }
}
const Jg = /* @__PURE__ */ new Set([
  Er,
  br,
  Ns,
  Ls
]);
function Wu(e, t) {
  if (e.type === 14 && !le(e.callee) && Jg.has(e.callee)) {
    const i = e.arguments[0];
    if (i.type === 4)
      return qe(i, t);
    if (i.type === 14)
      return Wu(i, t);
  }
  return 0;
}
function Qu(e, t) {
  let i = 3;
  const a = $u(e);
  if (a && a.type === 15) {
    const { properties: l } = a;
    for (let h = 0; h < l.length; h++) {
      const { key: c, value: p } = l[h], u = qe(c, t);
      if (u === 0)
        return u;
      u < i && (i = u);
      let g;
      if (p.type === 4 ? g = qe(p, t) : p.type === 14 ? g = Wu(p, t) : g = 0, g === 0)
        return g;
      g < i && (i = g);
    }
  }
  return i;
}
function $u(e) {
  const t = e.codegenNode;
  if (t.type === 13)
    return t.props;
}
function Hu(e, {
  filename: t = "",
  prefixIdentifiers: i = !1,
  hoistStatic: a = !1,
  hmr: l = !1,
  cacheHandlers: h = !1,
  nodeTransforms: c = [],
  directiveTransforms: p = {},
  transformHoist: u = null,
  isBuiltInComponent: g = fn,
  isCustomElement: b = fn,
  expressionPlugins: A = [],
  scopeId: m = null,
  slotted: d = !0,
  ssr: y = !1,
  inSSR: I = !1,
  ssrCssVars: w = "",
  bindingMetadata: v = Um,
  inline: S = !1,
  isTS: P = !1,
  onError: M = Fa,
  onWarn: R = wu,
  compatConfig: L
}) {
  const F = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), k = {
    // options
    filename: t,
    selfName: F && rs(He(F[1])),
    prefixIdentifiers: i,
    hoistStatic: a,
    hmr: l,
    cacheHandlers: h,
    nodeTransforms: c,
    directiveTransforms: p,
    transformHoist: u,
    isBuiltInComponent: g,
    isCustomElement: b,
    expressionPlugins: A,
    scopeId: m,
    slotted: d,
    ssr: y,
    inSSR: I,
    ssrCssVars: w,
    bindingMetadata: v,
    inline: S,
    isTS: P,
    onError: M,
    onWarn: R,
    compatConfig: L,
    // state
    root: e,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    vForMemoKeyedNodes: /* @__PURE__ */ new WeakSet(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: e,
    childIndex: 0,
    inVOnce: !1,
    // methods
    helper(_) {
      const U = k.helpers.get(_) || 0;
      return k.helpers.set(_, U + 1), _;
    },
    removeHelper(_) {
      const U = k.helpers.get(_);
      if (U) {
        const J = U - 1;
        J ? k.helpers.set(_, J) : k.helpers.delete(_);
      }
    },
    helperString(_) {
      return `_${Ze[k.helper(_)]}`;
    },
    replaceNode(_) {
      {
        if (!k.currentNode)
          throw new Error("Node being replaced is already removed.");
        if (!k.parent)
          throw new Error("Cannot replace root node.");
      }
      k.parent.children[k.childIndex] = k.currentNode = _;
    },
    removeNode(_) {
      if (!k.parent)
        throw new Error("Cannot remove root node.");
      const U = k.parent.children, J = _ ? U.indexOf(_) : k.currentNode ? k.childIndex : -1;
      if (J < 0)
        throw new Error("node being removed is not a child of current parent");
      !_ || _ === k.currentNode ? (k.currentNode = null, k.onNodeRemoved()) : k.childIndex > J && (k.childIndex--, k.onNodeRemoved()), k.parent.children.splice(J, 1);
    },
    onNodeRemoved: fn,
    addIdentifiers(_) {
      le(_) ? O(_) : _.identifiers ? _.identifiers.forEach(O) : _.type === 4 && O(_.content);
    },
    removeIdentifiers(_) {
      le(_) ? B(_) : _.identifiers ? _.identifiers.forEach(B) : _.type === 4 && B(_.content);
    },
    hoist(_) {
      le(_) && (_ = z(_)), k.hoists.push(_);
      const U = z(
        `_hoisted_${k.hoists.length}`,
        !1,
        _.loc,
        2
      );
      return U.hoisted = _, U;
    },
    cache(_, U = !1, J = !1) {
      const $ = nu(
        k.cached.length,
        _,
        U,
        J
      );
      return k.cached.push($), $;
    }
  };
  function O(_) {
    const { identifiers: U } = k;
    U[_] === void 0 && (U[_] = 0), U[_]++;
  }
  function B(_) {
    k.identifiers[_]--;
  }
  return k;
}
function Yu(e, t) {
  const i = Hu(e, t);
  ui(e, i), t.hoistStatic && Yg(e, i), t.ssr || Xg(e, i), e.helpers = /* @__PURE__ */ new Set([...i.helpers.keys()]), e.components = [...i.components], e.directives = [...i.directives], e.imports = i.imports, e.hoists = i.hoists, e.temps = i.temps, e.cached = i.cached, e.transformed = !0;
}
function Xg(e, t) {
  const { helper: i } = t, { children: a } = e;
  if (a.length === 1) {
    const l = ju(e);
    if (l && l.codegenNode) {
      const h = l.codegenNode;
      h.type === 13 && Pr(h, t), e.codegenNode = h;
    } else
      e.codegenNode = a[0];
  } else if (a.length > 1) {
    let l = 64;
    a.filter((h) => h.type !== 3).length === 1 && (l |= 2048), e.codegenNode = ks(
      t,
      i(Ps),
      void 0,
      e.children,
      l,
      void 0,
      void 0,
      !0,
      void 0,
      !1
    );
  }
}
function Zg(e, t) {
  let i = 0;
  const a = () => {
    i--;
  };
  for (; i < e.children.length; i++) {
    const l = e.children[i];
    le(l) || (t.grandParent = t.parent, t.parent = e, t.childIndex = i, t.onNodeRemoved = a, ui(l, t));
  }
}
function ui(e, t) {
  t.currentNode = e;
  const { nodeTransforms: i } = t, a = [];
  for (let h = 0; h < i.length; h++) {
    const c = i[h](e, t);
    if (c && ($e(c) ? a.push(...c) : a.push(c)), t.currentNode)
      e = t.currentNode;
    else
      return;
  }
  switch (e.type) {
    case 3:
      t.ssr || t.helper(Bs);
      break;
    case 5:
      t.ssr || t.helper(hi);
      break;
    // for container types, further traverse downwards
    case 9:
      for (let h = 0; h < e.branches.length; h++)
        ui(e.branches[h], t);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      Zg(e, t);
      break;
  }
  t.currentNode = e;
  let l = a.length;
  for (; l--; )
    a[l]();
}
function za(e, t) {
  const i = le(e) ? (a) => a === e : (a) => e.test(a);
  return (a, l) => {
    if (a.type === 1) {
      const { props: h } = a;
      if (a.tagType === 3 && h.some(Lr))
        return;
      const c = [];
      for (let p = 0; p < h.length; p++) {
        const u = h[p];
        if (u.type === 7 && i(u.name)) {
          h.splice(p, 1), p--;
          const g = t(a, u, l);
          g && c.push(g);
        }
      }
      return c;
    }
  };
}
var $s = {}, An = {}, Pi = {}, Ni = {}, sc;
function qg() {
  if (sc) return Ni;
  sc = 1;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return Ni.encode = function(t) {
    if (0 <= t && t < e.length)
      return e[t];
    throw new TypeError("Must be between 0 and 63: " + t);
  }, Ni.decode = function(t) {
    var i = 65, a = 90, l = 97, h = 122, c = 48, p = 57, u = 43, g = 47, b = 26, A = 52;
    return i <= t && t <= a ? t - i : l <= t && t <= h ? t - l + b : c <= t && t <= p ? t - c + A : t == u ? 62 : t == g ? 63 : -1;
  }, Ni;
}
var ic;
function Ju() {
  if (ic) return Pi;
  ic = 1;
  var e = /* @__PURE__ */ qg(), t = 5, i = 1 << t, a = i - 1, l = i;
  function h(p) {
    return p < 0 ? (-p << 1) + 1 : (p << 1) + 0;
  }
  function c(p) {
    var u = (p & 1) === 1, g = p >> 1;
    return u ? -g : g;
  }
  return Pi.encode = function(u) {
    var g = "", b, A = h(u);
    do
      b = A & a, A >>>= t, A > 0 && (b |= l), g += e.encode(b);
    while (A > 0);
    return g;
  }, Pi.decode = function(u, g, b) {
    var A = u.length, m = 0, d = 0, y, I;
    do {
      if (g >= A)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (I = e.decode(u.charCodeAt(g++)), I === -1)
        throw new Error("Invalid base64 digit: " + u.charAt(g - 1));
      y = !!(I & l), I &= a, m = m + (I << d), d += t;
    } while (y);
    b.value = c(m), b.rest = g;
  }, Pi;
}
var gn = {}, rc;
function pi() {
  return rc || (rc = 1, (function(e) {
    function t(k, O, B) {
      if (O in k)
        return k[O];
      if (arguments.length === 3)
        return B;
      throw new Error('"' + O + '" is a required argument.');
    }
    e.getArg = t;
    var i = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, a = /^data:.+\,.+$/;
    function l(k) {
      var O = k.match(i);
      return O ? {
        scheme: O[1],
        auth: O[2],
        host: O[3],
        port: O[4],
        path: O[5]
      } : null;
    }
    e.urlParse = l;
    function h(k) {
      var O = "";
      return k.scheme && (O += k.scheme + ":"), O += "//", k.auth && (O += k.auth + "@"), k.host && (O += k.host), k.port && (O += ":" + k.port), k.path && (O += k.path), O;
    }
    e.urlGenerate = h;
    var c = 32;
    function p(k) {
      var O = [];
      return function(B) {
        for (var _ = 0; _ < O.length; _++)
          if (O[_].input === B) {
            var U = O[0];
            return O[0] = O[_], O[_] = U, O[0].result;
          }
        var J = k(B);
        return O.unshift({
          input: B,
          result: J
        }), O.length > c && O.pop(), J;
      };
    }
    var u = p(function(O) {
      var B = O, _ = l(O);
      if (_) {
        if (!_.path)
          return O;
        B = _.path;
      }
      for (var U = e.isAbsolute(B), J = [], $ = 0, G = 0; ; )
        if ($ = G, G = B.indexOf("/", $), G === -1) {
          J.push(B.slice($));
          break;
        } else
          for (J.push(B.slice($, G)); G < B.length && B[G] === "/"; )
            G++;
      for (var pe, ee = 0, G = J.length - 1; G >= 0; G--)
        pe = J[G], pe === "." ? J.splice(G, 1) : pe === ".." ? ee++ : ee > 0 && (pe === "" ? (J.splice(G + 1, ee), ee = 0) : (J.splice(G, 2), ee--));
      return B = J.join("/"), B === "" && (B = U ? "/" : "."), _ ? (_.path = B, h(_)) : B;
    });
    e.normalize = u;
    function g(k, O) {
      k === "" && (k = "."), O === "" && (O = ".");
      var B = l(O), _ = l(k);
      if (_ && (k = _.path || "/"), B && !B.scheme)
        return _ && (B.scheme = _.scheme), h(B);
      if (B || O.match(a))
        return O;
      if (_ && !_.host && !_.path)
        return _.host = O, h(_);
      var U = O.charAt(0) === "/" ? O : u(k.replace(/\/+$/, "") + "/" + O);
      return _ ? (_.path = U, h(_)) : U;
    }
    e.join = g, e.isAbsolute = function(k) {
      return k.charAt(0) === "/" || i.test(k);
    };
    function b(k, O) {
      k === "" && (k = "."), k = k.replace(/\/$/, "");
      for (var B = 0; O.indexOf(k + "/") !== 0; ) {
        var _ = k.lastIndexOf("/");
        if (_ < 0 || (k = k.slice(0, _), k.match(/^([^\/]+:\/)?\/*$/)))
          return O;
        ++B;
      }
      return Array(B + 1).join("../") + O.substr(k.length + 1);
    }
    e.relative = b;
    var A = (function() {
      var k = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in k);
    })();
    function m(k) {
      return k;
    }
    function d(k) {
      return I(k) ? "$" + k : k;
    }
    e.toSetString = A ? m : d;
    function y(k) {
      return I(k) ? k.slice(1) : k;
    }
    e.fromSetString = A ? m : y;
    function I(k) {
      if (!k)
        return !1;
      var O = k.length;
      if (O < 9 || k.charCodeAt(O - 1) !== 95 || k.charCodeAt(O - 2) !== 95 || k.charCodeAt(O - 3) !== 111 || k.charCodeAt(O - 4) !== 116 || k.charCodeAt(O - 5) !== 111 || k.charCodeAt(O - 6) !== 114 || k.charCodeAt(O - 7) !== 112 || k.charCodeAt(O - 8) !== 95 || k.charCodeAt(O - 9) !== 95)
        return !1;
      for (var B = O - 10; B >= 0; B--)
        if (k.charCodeAt(B) !== 36)
          return !1;
      return !0;
    }
    function w(k, O, B) {
      var _ = M(k.source, O.source);
      return _ !== 0 || (_ = k.originalLine - O.originalLine, _ !== 0) || (_ = k.originalColumn - O.originalColumn, _ !== 0 || B) || (_ = k.generatedColumn - O.generatedColumn, _ !== 0) || (_ = k.generatedLine - O.generatedLine, _ !== 0) ? _ : M(k.name, O.name);
    }
    e.compareByOriginalPositions = w;
    function v(k, O, B) {
      var _;
      return _ = k.originalLine - O.originalLine, _ !== 0 || (_ = k.originalColumn - O.originalColumn, _ !== 0 || B) || (_ = k.generatedColumn - O.generatedColumn, _ !== 0) || (_ = k.generatedLine - O.generatedLine, _ !== 0) ? _ : M(k.name, O.name);
    }
    e.compareByOriginalPositionsNoSource = v;
    function S(k, O, B) {
      var _ = k.generatedLine - O.generatedLine;
      return _ !== 0 || (_ = k.generatedColumn - O.generatedColumn, _ !== 0 || B) || (_ = M(k.source, O.source), _ !== 0) || (_ = k.originalLine - O.originalLine, _ !== 0) || (_ = k.originalColumn - O.originalColumn, _ !== 0) ? _ : M(k.name, O.name);
    }
    e.compareByGeneratedPositionsDeflated = S;
    function P(k, O, B) {
      var _ = k.generatedColumn - O.generatedColumn;
      return _ !== 0 || B || (_ = M(k.source, O.source), _ !== 0) || (_ = k.originalLine - O.originalLine, _ !== 0) || (_ = k.originalColumn - O.originalColumn, _ !== 0) ? _ : M(k.name, O.name);
    }
    e.compareByGeneratedPositionsDeflatedNoLine = P;
    function M(k, O) {
      return k === O ? 0 : k === null ? 1 : O === null ? -1 : k > O ? 1 : -1;
    }
    function R(k, O) {
      var B = k.generatedLine - O.generatedLine;
      return B !== 0 || (B = k.generatedColumn - O.generatedColumn, B !== 0) || (B = M(k.source, O.source), B !== 0) || (B = k.originalLine - O.originalLine, B !== 0) || (B = k.originalColumn - O.originalColumn, B !== 0) ? B : M(k.name, O.name);
    }
    e.compareByGeneratedPositionsInflated = R;
    function L(k) {
      return JSON.parse(k.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = L;
    function F(k, O, B) {
      if (O = O || "", k && (k[k.length - 1] !== "/" && O[0] !== "/" && (k += "/"), O = k + O), B) {
        var _ = l(B);
        if (!_)
          throw new Error("sourceMapURL could not be parsed");
        if (_.path) {
          var U = _.path.lastIndexOf("/");
          U >= 0 && (_.path = _.path.substring(0, U + 1));
        }
        O = g(h(_), O);
      }
      return u(O);
    }
    e.computeSourceURL = F;
  })(gn)), gn;
}
var yn = {}, nc;
function Xu() {
  if (nc) return yn;
  nc = 1;
  var e = /* @__PURE__ */ pi(), t = Object.prototype.hasOwnProperty, i = typeof Map < "u";
  function a() {
    this._array = [], this._set = i ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return a.fromArray = function(h, c) {
    for (var p = new a(), u = 0, g = h.length; u < g; u++)
      p.add(h[u], c);
    return p;
  }, a.prototype.size = function() {
    return i ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, a.prototype.add = function(h, c) {
    var p = i ? h : e.toSetString(h), u = i ? this.has(h) : t.call(this._set, p), g = this._array.length;
    (!u || c) && this._array.push(h), u || (i ? this._set.set(h, g) : this._set[p] = g);
  }, a.prototype.has = function(h) {
    if (i)
      return this._set.has(h);
    var c = e.toSetString(h);
    return t.call(this._set, c);
  }, a.prototype.indexOf = function(h) {
    if (i) {
      var c = this._set.get(h);
      if (c >= 0)
        return c;
    } else {
      var p = e.toSetString(h);
      if (t.call(this._set, p))
        return this._set[p];
    }
    throw new Error('"' + h + '" is not in the set.');
  }, a.prototype.at = function(h) {
    if (h >= 0 && h < this._array.length)
      return this._array[h];
    throw new Error("No element indexed by " + h);
  }, a.prototype.toArray = function() {
    return this._array.slice();
  }, yn.ArraySet = a, yn;
}
var Sn = {}, ac;
function zg() {
  if (ac) return Sn;
  ac = 1;
  var e = /* @__PURE__ */ pi();
  function t(a, l) {
    var h = a.generatedLine, c = l.generatedLine, p = a.generatedColumn, u = l.generatedColumn;
    return c > h || c == h && u >= p || e.compareByGeneratedPositionsInflated(a, l) <= 0;
  }
  function i() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return i.prototype.unsortedForEach = function(l, h) {
    this._array.forEach(l, h);
  }, i.prototype.add = function(l) {
    t(this._last, l) ? (this._last = l, this._array.push(l)) : (this._sorted = !1, this._array.push(l));
  }, i.prototype.toArray = function() {
    return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, Sn.MappingList = i, Sn;
}
var oc;
function Zu() {
  if (oc) return An;
  oc = 1;
  var e = /* @__PURE__ */ Ju(), t = /* @__PURE__ */ pi(), i = Xu().ArraySet, a = zg().MappingList;
  function l(h) {
    h || (h = {}), this._file = t.getArg(h, "file", null), this._sourceRoot = t.getArg(h, "sourceRoot", null), this._skipValidation = t.getArg(h, "skipValidation", !1), this._ignoreInvalidMapping = t.getArg(h, "ignoreInvalidMapping", !1), this._sources = new i(), this._names = new i(), this._mappings = new a(), this._sourcesContents = null;
  }
  return l.prototype._version = 3, l.fromSourceMap = function(c, p) {
    var u = c.sourceRoot, g = new l(Object.assign(p || {}, {
      file: c.file,
      sourceRoot: u
    }));
    return c.eachMapping(function(b) {
      var A = {
        generated: {
          line: b.generatedLine,
          column: b.generatedColumn
        }
      };
      b.source != null && (A.source = b.source, u != null && (A.source = t.relative(u, A.source)), A.original = {
        line: b.originalLine,
        column: b.originalColumn
      }, b.name != null && (A.name = b.name)), g.addMapping(A);
    }), c.sources.forEach(function(b) {
      var A = b;
      u !== null && (A = t.relative(u, b)), g._sources.has(A) || g._sources.add(A);
      var m = c.sourceContentFor(b);
      m != null && g.setSourceContent(b, m);
    }), g;
  }, l.prototype.addMapping = function(c) {
    var p = t.getArg(c, "generated"), u = t.getArg(c, "original", null), g = t.getArg(c, "source", null), b = t.getArg(c, "name", null);
    !this._skipValidation && this._validateMapping(p, u, g, b) === !1 || (g != null && (g = String(g), this._sources.has(g) || this._sources.add(g)), b != null && (b = String(b), this._names.has(b) || this._names.add(b)), this._mappings.add({
      generatedLine: p.line,
      generatedColumn: p.column,
      originalLine: u != null && u.line,
      originalColumn: u != null && u.column,
      source: g,
      name: b
    }));
  }, l.prototype.setSourceContent = function(c, p) {
    var u = c;
    this._sourceRoot != null && (u = t.relative(this._sourceRoot, u)), p != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(u)] = p) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(u)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, l.prototype.applySourceMap = function(c, p, u) {
    var g = p;
    if (p == null) {
      if (c.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      g = c.file;
    }
    var b = this._sourceRoot;
    b != null && (g = t.relative(b, g));
    var A = new i(), m = new i();
    this._mappings.unsortedForEach(function(d) {
      if (d.source === g && d.originalLine != null) {
        var y = c.originalPositionFor({
          line: d.originalLine,
          column: d.originalColumn
        });
        y.source != null && (d.source = y.source, u != null && (d.source = t.join(u, d.source)), b != null && (d.source = t.relative(b, d.source)), d.originalLine = y.line, d.originalColumn = y.column, y.name != null && (d.name = y.name));
      }
      var I = d.source;
      I != null && !A.has(I) && A.add(I);
      var w = d.name;
      w != null && !m.has(w) && m.add(w);
    }, this), this._sources = A, this._names = m, c.sources.forEach(function(d) {
      var y = c.sourceContentFor(d);
      y != null && (u != null && (d = t.join(u, d)), b != null && (d = t.relative(b, d)), this.setSourceContent(d, y));
    }, this);
  }, l.prototype._validateMapping = function(c, p, u, g) {
    if (p && typeof p.line != "number" && typeof p.column != "number") {
      var b = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
      if (this._ignoreInvalidMapping)
        return typeof console < "u" && console.warn && console.warn(b), !1;
      throw new Error(b);
    }
    if (!(c && "line" in c && "column" in c && c.line > 0 && c.column >= 0 && !p && !u && !g)) {
      if (c && "line" in c && "column" in c && p && "line" in p && "column" in p && c.line > 0 && c.column >= 0 && p.line > 0 && p.column >= 0 && u)
        return;
      var b = "Invalid mapping: " + JSON.stringify({
        generated: c,
        source: u,
        original: p,
        name: g
      });
      if (this._ignoreInvalidMapping)
        return typeof console < "u" && console.warn && console.warn(b), !1;
      throw new Error(b);
    }
  }, l.prototype._serializeMappings = function() {
    for (var c = 0, p = 1, u = 0, g = 0, b = 0, A = 0, m = "", d, y, I, w, v = this._mappings.toArray(), S = 0, P = v.length; S < P; S++) {
      if (y = v[S], d = "", y.generatedLine !== p)
        for (c = 0; y.generatedLine !== p; )
          d += ";", p++;
      else if (S > 0) {
        if (!t.compareByGeneratedPositionsInflated(y, v[S - 1]))
          continue;
        d += ",";
      }
      d += e.encode(y.generatedColumn - c), c = y.generatedColumn, y.source != null && (w = this._sources.indexOf(y.source), d += e.encode(w - A), A = w, d += e.encode(y.originalLine - 1 - g), g = y.originalLine - 1, d += e.encode(y.originalColumn - u), u = y.originalColumn, y.name != null && (I = this._names.indexOf(y.name), d += e.encode(I - b), b = I)), m += d;
    }
    return m;
  }, l.prototype._generateSourcesContent = function(c, p) {
    return c.map(function(u) {
      if (!this._sourcesContents)
        return null;
      p != null && (u = t.relative(p, u));
      var g = t.toSetString(u);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, g) ? this._sourcesContents[g] : null;
    }, this);
  }, l.prototype.toJSON = function() {
    var c = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (c.file = this._file), this._sourceRoot != null && (c.sourceRoot = this._sourceRoot), this._sourcesContents && (c.sourcesContent = this._generateSourcesContent(c.sources, c.sourceRoot)), c;
  }, l.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, An.SourceMapGenerator = l, An;
}
var Hs = {}, xn = {}, lc;
function ey() {
  return lc || (lc = 1, (function(e) {
    e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
    function t(i, a, l, h, c, p) {
      var u = Math.floor((a - i) / 2) + i, g = c(l, h[u], !0);
      return g === 0 ? u : g > 0 ? a - u > 1 ? t(u, a, l, h, c, p) : p == e.LEAST_UPPER_BOUND ? a < h.length ? a : -1 : u : u - i > 1 ? t(i, u, l, h, c, p) : p == e.LEAST_UPPER_BOUND ? u : i < 0 ? -1 : i;
    }
    e.search = function(a, l, h, c) {
      if (l.length === 0)
        return -1;
      var p = t(
        -1,
        l.length,
        a,
        l,
        h,
        c || e.GREATEST_LOWER_BOUND
      );
      if (p < 0)
        return -1;
      for (; p - 1 >= 0 && h(l[p], l[p - 1], !0) === 0; )
        --p;
      return p;
    };
  })(xn)), xn;
}
var In = {}, cc;
function ty() {
  if (cc) return In;
  cc = 1;
  function e(a) {
    function l(p, u, g) {
      var b = p[u];
      p[u] = p[g], p[g] = b;
    }
    function h(p, u) {
      return Math.round(p + Math.random() * (u - p));
    }
    function c(p, u, g, b) {
      if (g < b) {
        var A = h(g, b), m = g - 1;
        l(p, A, b);
        for (var d = p[b], y = g; y < b; y++)
          u(p[y], d, !1) <= 0 && (m += 1, l(p, m, y));
        l(p, m + 1, y);
        var I = m + 1;
        c(p, u, g, I - 1), c(p, u, I + 1, b);
      }
    }
    return c;
  }
  function t(a) {
    let l = e.toString();
    return new Function(`return ${l}`)()(a);
  }
  let i = /* @__PURE__ */ new WeakMap();
  return In.quickSort = function(a, l, h = 0) {
    let c = i.get(l);
    c === void 0 && (c = t(l), i.set(l, c)), c(a, l, h, a.length - 1);
  }, In;
}
var hc;
function sy() {
  if (hc) return Hs;
  hc = 1;
  var e = /* @__PURE__ */ pi(), t = /* @__PURE__ */ ey(), i = Xu().ArraySet, a = /* @__PURE__ */ Ju(), l = ty().quickSort;
  function h(A, m) {
    var d = A;
    return typeof A == "string" && (d = e.parseSourceMapInput(A)), d.sections != null ? new b(d, m) : new c(d, m);
  }
  h.fromSourceMap = function(A, m) {
    return c.fromSourceMap(A, m);
  }, h.prototype._version = 3, h.prototype.__generatedMappings = null, Object.defineProperty(h.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), h.prototype.__originalMappings = null, Object.defineProperty(h.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), h.prototype._charIsMappingSeparator = function(m, d) {
    var y = m.charAt(d);
    return y === ";" || y === ",";
  }, h.prototype._parseMappings = function(m, d) {
    throw new Error("Subclasses must implement _parseMappings");
  }, h.GENERATED_ORDER = 1, h.ORIGINAL_ORDER = 2, h.GREATEST_LOWER_BOUND = 1, h.LEAST_UPPER_BOUND = 2, h.prototype.eachMapping = function(m, d, y) {
    var I = d || null, w = y || h.GENERATED_ORDER, v;
    switch (w) {
      case h.GENERATED_ORDER:
        v = this._generatedMappings;
        break;
      case h.ORIGINAL_ORDER:
        v = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    for (var S = this.sourceRoot, P = m.bind(I), M = this._names, R = this._sources, L = this._sourceMapURL, F = 0, k = v.length; F < k; F++) {
      var O = v[F], B = O.source === null ? null : R.at(O.source);
      B !== null && (B = e.computeSourceURL(S, B, L)), P({
        source: B,
        generatedLine: O.generatedLine,
        generatedColumn: O.generatedColumn,
        originalLine: O.originalLine,
        originalColumn: O.originalColumn,
        name: O.name === null ? null : M.at(O.name)
      });
    }
  }, h.prototype.allGeneratedPositionsFor = function(m) {
    var d = e.getArg(m, "line"), y = {
      source: e.getArg(m, "source"),
      originalLine: d,
      originalColumn: e.getArg(m, "column", 0)
    };
    if (y.source = this._findSourceIndex(y.source), y.source < 0)
      return [];
    var I = [], w = this._findMapping(
      y,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      t.LEAST_UPPER_BOUND
    );
    if (w >= 0) {
      var v = this._originalMappings[w];
      if (m.column === void 0)
        for (var S = v.originalLine; v && v.originalLine === S; )
          I.push({
            line: e.getArg(v, "generatedLine", null),
            column: e.getArg(v, "generatedColumn", null),
            lastColumn: e.getArg(v, "lastGeneratedColumn", null)
          }), v = this._originalMappings[++w];
      else
        for (var P = v.originalColumn; v && v.originalLine === d && v.originalColumn == P; )
          I.push({
            line: e.getArg(v, "generatedLine", null),
            column: e.getArg(v, "generatedColumn", null),
            lastColumn: e.getArg(v, "lastGeneratedColumn", null)
          }), v = this._originalMappings[++w];
    }
    return I;
  }, Hs.SourceMapConsumer = h;
  function c(A, m) {
    var d = A;
    typeof A == "string" && (d = e.parseSourceMapInput(A));
    var y = e.getArg(d, "version"), I = e.getArg(d, "sources"), w = e.getArg(d, "names", []), v = e.getArg(d, "sourceRoot", null), S = e.getArg(d, "sourcesContent", null), P = e.getArg(d, "mappings"), M = e.getArg(d, "file", null);
    if (y != this._version)
      throw new Error("Unsupported version: " + y);
    v && (v = e.normalize(v)), I = I.map(String).map(e.normalize).map(function(R) {
      return v && e.isAbsolute(v) && e.isAbsolute(R) ? e.relative(v, R) : R;
    }), this._names = i.fromArray(w.map(String), !0), this._sources = i.fromArray(I, !0), this._absoluteSources = this._sources.toArray().map(function(R) {
      return e.computeSourceURL(v, R, m);
    }), this.sourceRoot = v, this.sourcesContent = S, this._mappings = P, this._sourceMapURL = m, this.file = M;
  }
  c.prototype = Object.create(h.prototype), c.prototype.consumer = h, c.prototype._findSourceIndex = function(A) {
    var m = A;
    if (this.sourceRoot != null && (m = e.relative(this.sourceRoot, m)), this._sources.has(m))
      return this._sources.indexOf(m);
    var d;
    for (d = 0; d < this._absoluteSources.length; ++d)
      if (this._absoluteSources[d] == A)
        return d;
    return -1;
  }, c.fromSourceMap = function(m, d) {
    var y = Object.create(c.prototype), I = y._names = i.fromArray(m._names.toArray(), !0), w = y._sources = i.fromArray(m._sources.toArray(), !0);
    y.sourceRoot = m._sourceRoot, y.sourcesContent = m._generateSourcesContent(
      y._sources.toArray(),
      y.sourceRoot
    ), y.file = m._file, y._sourceMapURL = d, y._absoluteSources = y._sources.toArray().map(function(k) {
      return e.computeSourceURL(y.sourceRoot, k, d);
    });
    for (var v = m._mappings.toArray().slice(), S = y.__generatedMappings = [], P = y.__originalMappings = [], M = 0, R = v.length; M < R; M++) {
      var L = v[M], F = new p();
      F.generatedLine = L.generatedLine, F.generatedColumn = L.generatedColumn, L.source && (F.source = w.indexOf(L.source), F.originalLine = L.originalLine, F.originalColumn = L.originalColumn, L.name && (F.name = I.indexOf(L.name)), P.push(F)), S.push(F);
    }
    return l(y.__originalMappings, e.compareByOriginalPositions), y;
  }, c.prototype._version = 3, Object.defineProperty(c.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function p() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  const u = e.compareByGeneratedPositionsDeflatedNoLine;
  function g(A, m) {
    let d = A.length, y = A.length - m;
    if (!(y <= 1))
      if (y == 2) {
        let I = A[m], w = A[m + 1];
        u(I, w) > 0 && (A[m] = w, A[m + 1] = I);
      } else if (y < 20)
        for (let I = m; I < d; I++)
          for (let w = I; w > m; w--) {
            let v = A[w - 1], S = A[w];
            if (u(v, S) <= 0)
              break;
            A[w - 1] = S, A[w] = v;
          }
      else
        l(A, u, m);
  }
  c.prototype._parseMappings = function(m, d) {
    var y = 1, I = 0, w = 0, v = 0, S = 0, P = 0, M = m.length, R = 0, L = {}, F = [], k = [], O, B, _, U;
    let J = 0;
    for (; R < M; )
      if (m.charAt(R) === ";")
        y++, R++, I = 0, g(k, J), J = k.length;
      else if (m.charAt(R) === ",")
        R++;
      else {
        for (O = new p(), O.generatedLine = y, _ = R; _ < M && !this._charIsMappingSeparator(m, _); _++)
          ;
        for (m.slice(R, _), B = []; R < _; )
          a.decode(m, R, L), U = L.value, R = L.rest, B.push(U);
        if (B.length === 2)
          throw new Error("Found a source, but no line and column");
        if (B.length === 3)
          throw new Error("Found a source and line, but no column");
        if (O.generatedColumn = I + B[0], I = O.generatedColumn, B.length > 1 && (O.source = S + B[1], S += B[1], O.originalLine = w + B[2], w = O.originalLine, O.originalLine += 1, O.originalColumn = v + B[3], v = O.originalColumn, B.length > 4 && (O.name = P + B[4], P += B[4])), k.push(O), typeof O.originalLine == "number") {
          let G = O.source;
          for (; F.length <= G; )
            F.push(null);
          F[G] === null && (F[G] = []), F[G].push(O);
        }
      }
    g(k, J), this.__generatedMappings = k;
    for (var $ = 0; $ < F.length; $++)
      F[$] != null && l(F[$], e.compareByOriginalPositionsNoSource);
    this.__originalMappings = [].concat(...F);
  }, c.prototype._findMapping = function(m, d, y, I, w, v) {
    if (m[y] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + m[y]);
    if (m[I] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + m[I]);
    return t.search(m, d, w, v);
  }, c.prototype.computeColumnSpans = function() {
    for (var m = 0; m < this._generatedMappings.length; ++m) {
      var d = this._generatedMappings[m];
      if (m + 1 < this._generatedMappings.length) {
        var y = this._generatedMappings[m + 1];
        if (d.generatedLine === y.generatedLine) {
          d.lastGeneratedColumn = y.generatedColumn - 1;
          continue;
        }
      }
      d.lastGeneratedColumn = 1 / 0;
    }
  }, c.prototype.originalPositionFor = function(m) {
    var d = {
      generatedLine: e.getArg(m, "line"),
      generatedColumn: e.getArg(m, "column")
    }, y = this._findMapping(
      d,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      e.compareByGeneratedPositionsDeflated,
      e.getArg(m, "bias", h.GREATEST_LOWER_BOUND)
    );
    if (y >= 0) {
      var I = this._generatedMappings[y];
      if (I.generatedLine === d.generatedLine) {
        var w = e.getArg(I, "source", null);
        w !== null && (w = this._sources.at(w), w = e.computeSourceURL(this.sourceRoot, w, this._sourceMapURL));
        var v = e.getArg(I, "name", null);
        return v !== null && (v = this._names.at(v)), {
          source: w,
          line: e.getArg(I, "originalLine", null),
          column: e.getArg(I, "originalColumn", null),
          name: v
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, c.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(m) {
      return m == null;
    }) : !1;
  }, c.prototype.sourceContentFor = function(m, d) {
    if (!this.sourcesContent)
      return null;
    var y = this._findSourceIndex(m);
    if (y >= 0)
      return this.sourcesContent[y];
    var I = m;
    this.sourceRoot != null && (I = e.relative(this.sourceRoot, I));
    var w;
    if (this.sourceRoot != null && (w = e.urlParse(this.sourceRoot))) {
      var v = I.replace(/^file:\/\//, "");
      if (w.scheme == "file" && this._sources.has(v))
        return this.sourcesContent[this._sources.indexOf(v)];
      if ((!w.path || w.path == "/") && this._sources.has("/" + I))
        return this.sourcesContent[this._sources.indexOf("/" + I)];
    }
    if (d)
      return null;
    throw new Error('"' + I + '" is not in the SourceMap.');
  }, c.prototype.generatedPositionFor = function(m) {
    var d = e.getArg(m, "source");
    if (d = this._findSourceIndex(d), d < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var y = {
      source: d,
      originalLine: e.getArg(m, "line"),
      originalColumn: e.getArg(m, "column")
    }, I = this._findMapping(
      y,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      e.getArg(m, "bias", h.GREATEST_LOWER_BOUND)
    );
    if (I >= 0) {
      var w = this._originalMappings[I];
      if (w.source === y.source)
        return {
          line: e.getArg(w, "generatedLine", null),
          column: e.getArg(w, "generatedColumn", null),
          lastColumn: e.getArg(w, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, Hs.BasicSourceMapConsumer = c;
  function b(A, m) {
    var d = A;
    typeof A == "string" && (d = e.parseSourceMapInput(A));
    var y = e.getArg(d, "version"), I = e.getArg(d, "sections");
    if (y != this._version)
      throw new Error("Unsupported version: " + y);
    this._sources = new i(), this._names = new i();
    var w = {
      line: -1,
      column: 0
    };
    this._sections = I.map(function(v) {
      if (v.url)
        throw new Error("Support for url field in sections not implemented.");
      var S = e.getArg(v, "offset"), P = e.getArg(S, "line"), M = e.getArg(S, "column");
      if (P < w.line || P === w.line && M < w.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return w = S, {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: P + 1,
          generatedColumn: M + 1
        },
        consumer: new h(e.getArg(v, "map"), m)
      };
    });
  }
  return b.prototype = Object.create(h.prototype), b.prototype.constructor = h, b.prototype._version = 3, Object.defineProperty(b.prototype, "sources", {
    get: function() {
      for (var A = [], m = 0; m < this._sections.length; m++)
        for (var d = 0; d < this._sections[m].consumer.sources.length; d++)
          A.push(this._sections[m].consumer.sources[d]);
      return A;
    }
  }), b.prototype.originalPositionFor = function(m) {
    var d = {
      generatedLine: e.getArg(m, "line"),
      generatedColumn: e.getArg(m, "column")
    }, y = t.search(
      d,
      this._sections,
      function(w, v) {
        var S = w.generatedLine - v.generatedOffset.generatedLine;
        return S || w.generatedColumn - v.generatedOffset.generatedColumn;
      }
    ), I = this._sections[y];
    return I ? I.consumer.originalPositionFor({
      line: d.generatedLine - (I.generatedOffset.generatedLine - 1),
      column: d.generatedColumn - (I.generatedOffset.generatedLine === d.generatedLine ? I.generatedOffset.generatedColumn - 1 : 0),
      bias: m.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, b.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(m) {
      return m.consumer.hasContentsOfAllSources();
    });
  }, b.prototype.sourceContentFor = function(m, d) {
    for (var y = 0; y < this._sections.length; y++) {
      var I = this._sections[y], w = I.consumer.sourceContentFor(m, !0);
      if (w || w === "")
        return w;
    }
    if (d)
      return null;
    throw new Error('"' + m + '" is not in the SourceMap.');
  }, b.prototype.generatedPositionFor = function(m) {
    for (var d = 0; d < this._sections.length; d++) {
      var y = this._sections[d];
      if (y.consumer._findSourceIndex(e.getArg(m, "source")) !== -1) {
        var I = y.consumer.generatedPositionFor(m);
        if (I) {
          var w = {
            line: I.line + (y.generatedOffset.generatedLine - 1),
            column: I.column + (y.generatedOffset.generatedLine === I.line ? y.generatedOffset.generatedColumn - 1 : 0)
          };
          return w;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, b.prototype._parseMappings = function(m, d) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var y = 0; y < this._sections.length; y++)
      for (var I = this._sections[y], w = I.consumer._generatedMappings, v = 0; v < w.length; v++) {
        var S = w[v], P = I.consumer._sources.at(S.source);
        P !== null && (P = e.computeSourceURL(I.consumer.sourceRoot, P, this._sourceMapURL)), this._sources.add(P), P = this._sources.indexOf(P);
        var M = null;
        S.name && (M = I.consumer._names.at(S.name), this._names.add(M), M = this._names.indexOf(M));
        var R = {
          source: P,
          generatedLine: S.generatedLine + (I.generatedOffset.generatedLine - 1),
          generatedColumn: S.generatedColumn + (I.generatedOffset.generatedLine === S.generatedLine ? I.generatedOffset.generatedColumn - 1 : 0),
          originalLine: S.originalLine,
          originalColumn: S.originalColumn,
          name: M
        };
        this.__generatedMappings.push(R), typeof R.originalLine == "number" && this.__originalMappings.push(R);
      }
    l(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), l(this.__originalMappings, e.compareByOriginalPositions);
  }, Hs.IndexedSourceMapConsumer = b, Hs;
}
var En = {}, uc;
function iy() {
  if (uc) return En;
  uc = 1;
  var e = Zu().SourceMapGenerator, t = /* @__PURE__ */ pi(), i = /(\r?\n)/, a = 10, l = "$$$isSourceNode$$$";
  function h(c, p, u, g, b) {
    this.children = [], this.sourceContents = {}, this.line = c ?? null, this.column = p ?? null, this.source = u ?? null, this.name = b ?? null, this[l] = !0, g != null && this.add(g);
  }
  return h.fromStringWithSourceMap = function(p, u, g) {
    var b = new h(), A = p.split(i), m = 0, d = function() {
      var S = M(), P = M() || "";
      return S + P;
      function M() {
        return m < A.length ? A[m++] : void 0;
      }
    }, y = 1, I = 0, w = null;
    return u.eachMapping(function(S) {
      if (w !== null)
        if (y < S.generatedLine)
          v(w, d()), y++, I = 0;
        else {
          var P = A[m] || "", M = P.substr(0, S.generatedColumn - I);
          A[m] = P.substr(S.generatedColumn - I), I = S.generatedColumn, v(w, M), w = S;
          return;
        }
      for (; y < S.generatedLine; )
        b.add(d()), y++;
      if (I < S.generatedColumn) {
        var P = A[m] || "";
        b.add(P.substr(0, S.generatedColumn)), A[m] = P.substr(S.generatedColumn), I = S.generatedColumn;
      }
      w = S;
    }, this), m < A.length && (w && v(w, d()), b.add(A.splice(m).join(""))), u.sources.forEach(function(S) {
      var P = u.sourceContentFor(S);
      P != null && (g != null && (S = t.join(g, S)), b.setSourceContent(S, P));
    }), b;
    function v(S, P) {
      if (S === null || S.source === void 0)
        b.add(P);
      else {
        var M = g ? t.join(g, S.source) : S.source;
        b.add(new h(
          S.originalLine,
          S.originalColumn,
          M,
          P,
          S.name
        ));
      }
    }
  }, h.prototype.add = function(p) {
    if (Array.isArray(p))
      p.forEach(function(u) {
        this.add(u);
      }, this);
    else if (p[l] || typeof p == "string")
      p && this.children.push(p);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + p
      );
    return this;
  }, h.prototype.prepend = function(p) {
    if (Array.isArray(p))
      for (var u = p.length - 1; u >= 0; u--)
        this.prepend(p[u]);
    else if (p[l] || typeof p == "string")
      this.children.unshift(p);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + p
      );
    return this;
  }, h.prototype.walk = function(p) {
    for (var u, g = 0, b = this.children.length; g < b; g++)
      u = this.children[g], u[l] ? u.walk(p) : u !== "" && p(u, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, h.prototype.join = function(p) {
    var u, g, b = this.children.length;
    if (b > 0) {
      for (u = [], g = 0; g < b - 1; g++)
        u.push(this.children[g]), u.push(p);
      u.push(this.children[g]), this.children = u;
    }
    return this;
  }, h.prototype.replaceRight = function(p, u) {
    var g = this.children[this.children.length - 1];
    return g[l] ? g.replaceRight(p, u) : typeof g == "string" ? this.children[this.children.length - 1] = g.replace(p, u) : this.children.push("".replace(p, u)), this;
  }, h.prototype.setSourceContent = function(p, u) {
    this.sourceContents[t.toSetString(p)] = u;
  }, h.prototype.walkSourceContents = function(p) {
    for (var u = 0, g = this.children.length; u < g; u++)
      this.children[u][l] && this.children[u].walkSourceContents(p);
    for (var b = Object.keys(this.sourceContents), u = 0, g = b.length; u < g; u++)
      p(t.fromSetString(b[u]), this.sourceContents[b[u]]);
  }, h.prototype.toString = function() {
    var p = "";
    return this.walk(function(u) {
      p += u;
    }), p;
  }, h.prototype.toStringWithSourceMap = function(p) {
    var u = {
      code: "",
      line: 1,
      column: 0
    }, g = new e(p), b = !1, A = null, m = null, d = null, y = null;
    return this.walk(function(I, w) {
      u.code += I, w.source !== null && w.line !== null && w.column !== null ? ((A !== w.source || m !== w.line || d !== w.column || y !== w.name) && g.addMapping({
        source: w.source,
        original: {
          line: w.line,
          column: w.column
        },
        generated: {
          line: u.line,
          column: u.column
        },
        name: w.name
      }), A = w.source, m = w.line, d = w.column, y = w.name, b = !0) : b && (g.addMapping({
        generated: {
          line: u.line,
          column: u.column
        }
      }), A = null, b = !1);
      for (var v = 0, S = I.length; v < S; v++)
        I.charCodeAt(v) === a ? (u.line++, u.column = 0, v + 1 === S ? (A = null, b = !1) : b && g.addMapping({
          source: w.source,
          original: {
            line: w.line,
            column: w.column
          },
          generated: {
            line: u.line,
            column: u.column
          },
          name: w.name
        })) : u.column++;
    }), this.walkSourceContents(function(I, w) {
      g.setSourceContent(I, w);
    }), { code: u.code, map: g };
  }, En.SourceNode = h, En;
}
var pc;
function Fr() {
  return pc || (pc = 1, $s.SourceMapGenerator = Zu().SourceMapGenerator, $s.SourceMapConsumer = sy().SourceMapConsumer, $s.SourceNode = iy().SourceNode), $s;
}
var qu = /* @__PURE__ */ Fr();
const Ur = "/*@__PURE__*/", Ki = (e) => `${Ze[e]}: _${Ze[e]}`;
function fc(e, {
  mode: t = "function",
  prefixIdentifiers: i = t === "module",
  sourceMap: a = !1,
  filename: l = "template.vue.html",
  scopeId: h = null,
  optimizeImports: c = !1,
  runtimeGlobalName: p = "Vue",
  runtimeModuleName: u = "vue",
  ssrRuntimeModuleName: g = "vue/server-renderer",
  ssr: b = !1,
  isTS: A = !1,
  inSSR: m = !1
}) {
  const d = {
    mode: t,
    prefixIdentifiers: i,
    sourceMap: a,
    filename: l,
    scopeId: h,
    optimizeImports: c,
    runtimeGlobalName: p,
    runtimeModuleName: u,
    ssrRuntimeModuleName: g,
    ssr: b,
    isTS: A,
    inSSR: m,
    source: e.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(w) {
      return `_${Ze[w]}`;
    },
    push(w, v = -2, S) {
      if (d.code += w, d.map) {
        if (S) {
          let P;
          if (S.type === 4 && !S.isStatic) {
            const M = S.content.replace(/^_ctx\./, "");
            M !== S.content && mt(M) && (P = M);
          }
          S.loc.source && I(S.loc.start, P);
        }
        v === -3 ? Ya(d, w) : (d.offset += w.length, v === -2 ? d.column += w.length : (v === -1 && (v = w.length - 1), d.line++, d.column = w.length - v)), S && S.loc !== Pe && S.loc.source && I(S.loc.end);
      }
    },
    indent() {
      y(++d.indentLevel);
    },
    deindent(w = !1) {
      w ? --d.indentLevel : y(--d.indentLevel);
    },
    newline() {
      y(d.indentLevel);
    }
  };
  function y(w) {
    d.push(
      `
` + "  ".repeat(w),
      0
      /* Start */
    );
  }
  function I(w, v = null) {
    const { _names: S, _mappings: P } = d.map;
    v !== null && !S.has(v) && S.add(v), P.add({
      originalLine: w.line,
      originalColumn: w.column - 1,
      // source-map column is 0 based
      generatedLine: d.line,
      generatedColumn: d.column - 1,
      source: l,
      name: v
    });
  }
  return a && (d.map = new qu.SourceMapGenerator(), d.map.setSourceContent(l, d.source), d.map._sources.add(l)), d;
}
function zu(e, t = {}) {
  const i = fc(e, t);
  t.onContextCreated && t.onContextCreated(i);
  const {
    mode: a,
    push: l,
    prefixIdentifiers: h,
    indent: c,
    deindent: p,
    newline: u,
    scopeId: g,
    ssr: b
  } = i, A = Array.from(e.helpers), m = A.length > 0, d = !h && a !== "module", y = g != null && a === "module", I = !!t.inline, w = I ? fc(e, t) : i;
  a === "module" ? ny(e, w, y, I) : ry(e, w);
  const v = b ? "ssrRender" : "render", S = b ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
  t.bindingMetadata && !t.inline && S.push("$props", "$setup", "$data", "$options");
  const P = t.isTS ? S.map((M) => `${M}: any`).join(",") : S.join(", ");
  if (l(I ? `(${P}) => {` : `function ${v}(${P}) {`), c(), d && (l("with (_ctx) {"), c(), m && (l(
    `const { ${A.map(Ki).join(", ")} } = _Vue
`,
    -1
    /* End */
  ), u())), e.components.length && (dc(e.components, "component", i), (e.directives.length || e.temps > 0) && u()), e.directives.length && (dc(e.directives, "directive", i), e.temps > 0 && u()), e.temps > 0) {
    l("let ");
    for (let M = 0; M < e.temps; M++)
      l(`${M > 0 ? ", " : ""}_temp${M}`);
  }
  return (e.components.length || e.directives.length || e.temps) && (l(
    `
`,
    0
    /* Start */
  ), u()), b || l("return "), e.codegenNode ? Se(e.codegenNode, i) : l("null"), d && (p(), l("}")), p(), l("}"), {
    ast: e,
    code: i.code,
    preamble: I ? w.code : "",
    map: i.map ? i.map.toJSON() : void 0
  };
}
function ry(e, t) {
  const {
    ssr: i,
    prefixIdentifiers: a,
    push: l,
    newline: h,
    runtimeModuleName: c,
    runtimeGlobalName: p,
    ssrRuntimeModuleName: u
  } = t, g = i ? `require(${JSON.stringify(c)})` : p, b = Array.from(e.helpers);
  if (b.length > 0) {
    if (a)
      l(
        `const { ${b.map(Ki).join(", ")} } = ${g}
`,
        -1
        /* End */
      );
    else if (l(
      `const _Vue = ${g}
`,
      -1
      /* End */
    ), e.hoists.length) {
      const A = [
        dr,
        mr,
        Bs,
        Ar,
        gr
      ].filter((m) => b.includes(m)).map(Ki).join(", ");
      l(
        `const { ${A} } = _Vue
`,
        -1
        /* End */
      );
    }
  }
  e.ssrHelpers && e.ssrHelpers.length && l(
    `const { ${e.ssrHelpers.map(Ki).join(", ")} } = require("${u}")
`,
    -1
    /* End */
  ), ep(e.hoists, t), h(), l("return ");
}
function ny(e, t, i, a) {
  const {
    push: l,
    newline: h,
    optimizeImports: c,
    runtimeModuleName: p,
    ssrRuntimeModuleName: u
  } = t;
  if (e.helpers.size) {
    const g = Array.from(e.helpers);
    c ? (l(
      `import { ${g.map((b) => Ze[b]).join(", ")} } from ${JSON.stringify(p)}
`,
      -1
      /* End */
    ), l(
      `
// Binding optimization for webpack code-split
const ${g.map((b) => `_${Ze[b]} = ${Ze[b]}`).join(", ")}
`,
      -1
      /* End */
    )) : l(
      `import { ${g.map((b) => `${Ze[b]} as _${Ze[b]}`).join(", ")} } from ${JSON.stringify(p)}
`,
      -1
      /* End */
    );
  }
  e.ssrHelpers && e.ssrHelpers.length && l(
    `import { ${e.ssrHelpers.map((g) => `${Ze[g]} as _${Ze[g]}`).join(", ")} } from "${u}"
`,
    -1
    /* End */
  ), e.imports.length && (ay(e.imports, t), h()), ep(e.hoists, t), h(), a || l("export ");
}
function dc(e, t, { helper: i, push: a, newline: l, isTS: h }) {
  const c = i(
    t === "component" ? zs : Sr
  );
  for (let p = 0; p < e.length; p++) {
    let u = e[p];
    const g = u.endsWith("__self");
    g && (u = u.slice(0, -6)), a(
      `const ${ai(u, t)} = ${c}(${JSON.stringify(u)}${g ? ", true" : ""})${h ? "!" : ""}`
    ), p < e.length - 1 && l();
  }
}
function ep(e, t) {
  if (!e.length)
    return;
  t.pure = !0;
  const { push: i, newline: a } = t;
  a();
  for (let l = 0; l < e.length; l++) {
    const h = e[l];
    h && (i(`const _hoisted_${l + 1} = `), Se(h, t), a());
  }
  t.pure = !1;
}
function ay(e, t) {
  e.length && e.forEach((i) => {
    t.push("import "), Se(i.exp, t), t.push(` from '${i.path}'`), t.newline();
  });
}
function oy(e) {
  return le(e) || e.type === 4 || e.type === 2 || e.type === 5 || e.type === 8;
}
function Vr(e, t) {
  const i = e.length > 3 || e.some((a) => $e(a) || !oy(a));
  t.push("["), i && t.indent(), Rs(e, t, i), i && t.deindent(), t.push("]");
}
function Rs(e, t, i = !1, a = !0) {
  const { push: l, newline: h } = t;
  for (let c = 0; c < e.length; c++) {
    const p = e[c];
    le(p) ? l(
      p,
      -3
      /* Unknown */
    ) : $e(p) ? Vr(p, t) : Se(p, t), c < e.length - 1 && (i ? (a && l(","), h()) : a && l(", "));
  }
}
function Se(e, t) {
  if (le(e)) {
    t.push(
      e,
      -3
      /* Unknown */
    );
    return;
  }
  if (cs(e)) {
    t.push(t.helper(e));
    return;
  }
  switch (e.type) {
    case 1:
    case 9:
    case 11:
      ma(
        e.codegenNode != null,
        "Codegen node is missing for element/if/for node. Apply appropriate transforms first."
      ), Se(e.codegenNode, t);
      break;
    case 2:
      ly(e, t);
      break;
    case 4:
      tp(e, t);
      break;
    case 5:
      cy(e, t);
      break;
    case 12:
      Se(e.codegenNode, t);
      break;
    case 8:
      sp(e, t);
      break;
    case 3:
      uy(e, t);
      break;
    case 13:
      py(e, t);
      break;
    case 14:
      dy(e, t);
      break;
    case 15:
      my(e, t);
      break;
    case 17:
      Ay(e, t);
      break;
    case 18:
      gy(e, t);
      break;
    case 19:
      yy(e, t);
      break;
    case 20:
      Sy(e, t);
      break;
    case 21:
      Rs(e.body, t, !0, !1);
      break;
    // SSR only types
    case 22:
      xy(e, t);
      break;
    case 23:
      ip(e, t);
      break;
    case 24:
      Iy(e, t);
      break;
    case 25:
      Ey(e, t);
      break;
    case 26:
      by(e, t);
      break;
    /* v8 ignore start */
    case 10:
      break;
    default:
      return ma(!1, `unhandled codegen node type: ${e.type}`), e;
  }
}
function ly(e, t) {
  t.push(JSON.stringify(e.content), -3, e);
}
function tp(e, t) {
  const { content: i, isStatic: a } = e;
  t.push(
    a ? JSON.stringify(i) : i,
    -3,
    e
  );
}
function cy(e, t) {
  const { push: i, helper: a, pure: l } = t;
  l && i(Ur), i(`${a(hi)}(`), Se(e.content, t), i(")");
}
function sp(e, t) {
  for (let i = 0; i < e.children.length; i++) {
    const a = e.children[i];
    le(a) ? t.push(
      a,
      -3
      /* Unknown */
    ) : Se(a, t);
  }
}
function hy(e, t) {
  const { push: i } = t;
  if (e.type === 8)
    i("["), sp(e, t), i("]");
  else if (e.isStatic) {
    const a = mt(e.content) ? e.content : JSON.stringify(e.content);
    i(a, -2, e);
  } else
    i(`[${e.content}]`, -3, e);
}
function uy(e, t) {
  const { push: i, helper: a, pure: l } = t;
  l && i(Ur), i(
    `${a(Bs)}(${JSON.stringify(e.content)})`,
    -3,
    e
  );
}
function py(e, t) {
  const { push: i, helper: a, pure: l } = t, {
    tag: h,
    props: c,
    children: p,
    patchFlag: u,
    dynamicProps: g,
    directives: b,
    isBlock: A,
    disableTracking: m,
    isComponent: d
  } = e;
  let y;
  if (u)
    if (u < 0)
      y = u + ` /* ${Js[u]} */`;
    else {
      const w = Object.keys(Js).map(Number).filter((v) => v > 0 && u & v).map((v) => Js[v]).join(", ");
      y = u + ` /* ${w} */`;
    }
  b && i(a(xr) + "("), A && i(`(${a(Vt)}(${m ? "true" : ""}), `), l && i(Ur);
  const I = A ? os(t.inSSR, d) : as(t.inSSR, d);
  i(a(I) + "(", -2, e), Rs(
    fy([h, c, p, y, g]),
    t
  ), i(")"), A && i(")"), b && (i(", "), Se(b, t), i(")"));
}
function fy(e) {
  let t = e.length;
  for (; t-- && e[t] == null; )
    ;
  return e.slice(0, t + 1).map((i) => i || "null");
}
function dy(e, t) {
  const { push: i, helper: a, pure: l } = t, h = le(e.callee) ? e.callee : a(e.callee);
  l && i(Ur), i(h + "(", -2, e), Rs(e.arguments, t), i(")");
}
function my(e, t) {
  const { push: i, indent: a, deindent: l, newline: h } = t, { properties: c } = e;
  if (!c.length) {
    i("{}", -2, e);
    return;
  }
  const p = c.length > 1 || c.some((u) => u.value.type !== 4);
  i(p ? "{" : "{ "), p && a();
  for (let u = 0; u < c.length; u++) {
    const { key: g, value: b } = c[u];
    hy(g, t), i(": "), Se(b, t), u < c.length - 1 && (i(","), h());
  }
  p && l(), i(p ? "}" : " }");
}
function Ay(e, t) {
  Vr(e.elements, t);
}
function gy(e, t) {
  const { push: i, indent: a, deindent: l } = t, { params: h, returns: c, body: p, newline: u, isSlot: g } = e;
  g && i(`_${Ze[Cr]}(`), i("(", -2, e), $e(h) ? Rs(h, t) : h && Se(h, t), i(") => "), (u || p) && (i("{"), a()), c ? (u && i("return "), $e(c) ? Vr(c, t) : Se(c, t)) : p && Se(p, t), (u || p) && (l(), i("}")), g && i(")");
}
function yy(e, t) {
  const { test: i, consequent: a, alternate: l, newline: h } = e, { push: c, indent: p, deindent: u, newline: g } = t;
  if (i.type === 4) {
    const A = !mt(i.content);
    A && c("("), tp(i, t), A && c(")");
  } else
    c("("), Se(i, t), c(")");
  h && p(), t.indentLevel++, h || c(" "), c("? "), Se(a, t), t.indentLevel--, h && g(), h || c(" "), c(": ");
  const b = l.type === 19;
  b || t.indentLevel++, Se(l, t), b || t.indentLevel--, h && u(
    !0
    /* without newline */
  );
}
function Sy(e, t) {
  const { push: i, helper: a, indent: l, deindent: h, newline: c } = t, { needPauseTracking: p, needArraySpread: u } = e;
  u && i("[...("), i(`_cache[${e.index}] || (`), p && (l(), i(`${a(ti)}(-1`), e.inVOnce && i(", true"), i("),"), c(), i("(")), i(`_cache[${e.index}] = `), Se(e.value, t), p && (i(`).cacheIndex = ${e.index},`), c(), i(`${a(ti)}(1),`), c(), i(`_cache[${e.index}]`), h()), i(")"), u && i(")]");
}
function xy(e, t) {
  const { push: i, indent: a, deindent: l } = t;
  i("`");
  const h = e.elements.length, c = h > 3;
  for (let p = 0; p < h; p++) {
    const u = e.elements[p];
    le(u) ? i(
      u.replace(/(`|\$|\\)/g, "\\$1"),
      -3
      /* Unknown */
    ) : (i("${"), c && a(), Se(u, t), c && l(), i("}"));
  }
  i("`");
}
function ip(e, t) {
  const { push: i, indent: a, deindent: l } = t, { test: h, consequent: c, alternate: p } = e;
  i("if ("), Se(h, t), i(") {"), a(), Se(c, t), l(), i("}"), p && (i(" else "), p.type === 23 ? ip(p, t) : (i("{"), a(), Se(p, t), l(), i("}")));
}
function Iy(e, t) {
  Se(e.left, t), t.push(" = "), Se(e.right, t);
}
function Ey(e, t) {
  t.push("("), Rs(e.expressions, t), t.push(")");
}
function by({ returns: e }, t) {
  t.push("return "), $e(e) ? Vr(e, t) : Se(e, t);
}
const wy = /* @__PURE__ */ Le("true,false,null,this"), rp = (e, t) => {
  if (e.type === 5)
    e.content = Ye(
      e.content,
      t
    );
  else if (e.type === 1) {
    const i = Be(e, "memo");
    for (let a = 0; a < e.props.length; a++) {
      const l = e.props[a];
      if (l.type === 7 && l.name !== "for") {
        const h = l.exp, c = l.arg;
        h && h.type === 4 && !(l.name === "on" && c) && // key has been processed in transformFor(vMemo + vFor)
        !(i && t.vForMemoKeyedNodes.has(e) && c && c.type === 4 && c.content === "key") && (l.exp = Ye(
          h,
          t,
          // slot args must be processed as function params
          l.name === "slot"
        )), c && c.type === 4 && !c.isStatic && (l.arg = Ye(c, t));
      }
    }
  }
};
function Ye(e, t, i = !1, a = !1, l = Object.create(t.identifiers)) {
  if (!t.prefixIdentifiers || !e.content.trim())
    return e;
  const { inline: h, bindingMetadata: c } = t, p = (I, w, v) => {
    const S = Gm(c, I) && c[I];
    if (h) {
      const P = w && w.type === "AssignmentExpression" && w.left === v, M = w && w.type === "UpdateExpression" && w.argument === v, R = w && tr(w, A), L = w && vu(A), F = (k) => {
        const O = `${t.helperString(si)}(${k})`;
        return L ? `(${O})` : O;
      };
      if (mc(S) || S === "setup-reactive-const" || l[I])
        return I;
      if (S === "setup-ref")
        return `${I}.value`;
      if (S === "setup-maybe-ref")
        return P || M || R ? `${I}.value` : F(I);
      if (S === "setup-let")
        if (P) {
          const { right: k, operator: O } = w, B = u.slice(k.start - 1, k.end - 1), _ = eo(
            Ye(
              z(B, !1),
              t,
              !1,
              !1,
              m
            )
          );
          return `${t.helperString(ii)}(${I})${t.isTS ? ` //@ts-ignore
` : ""} ? ${I}.value ${O} ${_} : ${I}`;
        } else if (M) {
          v.start = w.start, v.end = w.end;
          const { prefix: k, operator: O } = w, B = k ? O : "", _ = k ? "" : O;
          return `${t.helperString(ii)}(${I})${t.isTS ? ` //@ts-ignore
` : ""} ? ${B}${I}.value${_} : ${B}${I}${_}`;
        } else return R ? I : F(I);
      else {
        if (S === "props")
          return Wl(I);
        if (S === "props-aliased")
          return Wl(c.__propsAliases[I]);
      }
    } else {
      if (S && S.startsWith("setup") || S === "literal-const")
        return `$setup.${I}`;
      if (S === "props-aliased")
        return `$props['${c.__propsAliases[I]}']`;
      if (S)
        return `$${S}.${I}`;
    }
    return `_ctx.${I}`;
  }, u = e.content;
  let g = e.ast;
  if (g === !1)
    return e;
  if (g === null || !g && mt(u)) {
    const I = t.identifiers[u], w = Yh(u), v = wy(u);
    return !i && !I && !v && (!w || c[u]) ? (mc(c[u]) && (e.constType = 1), e.content = p(u)) : I || (v ? e.constType = 3 : e.constType = 2), e;
  }
  if (!g) {
    const I = a ? ` ${u} ` : `(${u})${i ? "=>{}" : ""}`;
    try {
      g = ss.parseExpression(I, {
        sourceType: "module",
        plugins: t.expressionPlugins
      });
    } catch (w) {
      return t.onError(
        he(
          46,
          e.loc,
          void 0,
          w.message
        )
      ), e;
    }
  }
  const b = [], A = [], m = Object.create(t.identifiers);
  Ga(
    g,
    (I, w, v, S, P) => {
      if (_u(I, w))
        return;
      const M = S && Cy(I);
      M && !P ? (ja(w) && w.shorthand && (I.prefix = `${I.name}: `), I.name = p(I.name, w, I), b.push(I)) : (!(M && P) && (!w || w.type !== "CallExpression" && w.type !== "NewExpression" && w.type !== "MemberExpression") && (I.isConstant = !0), b.push(I));
    },
    !0,
    // invoke on ALL identifiers
    A,
    m
  );
  const d = [];
  b.sort((I, w) => I.start - w.start), b.forEach((I, w) => {
    const v = I.start - 1, S = I.end - 1, P = b[w - 1], M = u.slice(P ? P.end - 1 : 0, v);
    (M.length || I.prefix) && d.push(M + (I.prefix || ""));
    const R = u.slice(v, S);
    d.push(
      z(
        I.name,
        !1,
        {
          start: da(e.loc.start, R, v),
          end: da(e.loc.start, R, S),
          source: R
        },
        I.isConstant ? 3 : 0
      )
    ), w === b.length - 1 && S < u.length && d.push(u.slice(S));
  });
  let y;
  return d.length ? (y = Qe(d, e.loc), y.ast = g) : (y = e, y.constType = 3), y.identifiers = Object.keys(m), y;
}
function Cy(e) {
  return !(Yh(e.name) || e.name === "require");
}
function eo(e) {
  return le(e) ? e : e.type === 4 ? e.content : e.children.map(eo).join("");
}
function mc(e) {
  return e === "setup-const" || e === "literal-const";
}
const vy = za(
  /^(?:if|else|else-if)$/,
  (e, t, i) => np(e, t, i, (a, l, h) => {
    const c = i.parent.children;
    let p = c.indexOf(a), u = 0;
    for (; p-- >= 0; ) {
      const g = c[p];
      g && g.type === 9 && (u += g.branches.length);
    }
    return () => {
      if (h)
        a.codegenNode = gc(
          l,
          u,
          i
        );
      else {
        const g = Py(a.codegenNode);
        g.alternate = gc(
          l,
          u + a.branches.length - 1,
          i
        );
      }
    };
  })
);
function np(e, t, i, a) {
  if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
    const l = t.exp ? t.exp.loc : e.loc;
    i.onError(
      he(28, t.loc)
    ), t.exp = z("true", !1, l);
  }
  if (i.prefixIdentifiers && t.exp && (t.exp = Ye(t.exp, i)), t.name === "if") {
    const l = Ac(e, t), h = {
      type: 9,
      loc: Qg(e.loc),
      branches: [l]
    };
    if (i.replaceNode(h), a)
      return a(h, l, !0);
  } else {
    const l = i.parent.children, h = [];
    let c = l.indexOf(e);
    for (; c-- >= -1; ) {
      const p = l[c];
      if (p && Mr(p)) {
        i.removeNode(p), p.type === 3 && h.unshift(p);
        continue;
      }
      if (p && p.type === 9) {
        (t.name === "else-if" || t.name === "else") && p.branches[p.branches.length - 1].condition === void 0 && i.onError(
          he(30, e.loc)
        ), i.removeNode();
        const u = Ac(e, t);
        h.length && // #3619 ignore comments if the v-if is direct child of <transition>
        !(i.parent && i.parent.type === 1 && (i.parent.tag === "transition" || i.parent.tag === "Transition")) && (u.children = [...h, ...u.children]);
        {
          const b = u.userKey;
          b && p.branches.forEach(({ userKey: A }) => {
            Ty(A, b) && i.onError(
              he(
                29,
                u.userKey.loc
              )
            );
          });
        }
        p.branches.push(u);
        const g = a && a(p, u, !1);
        ui(u, i), g && g(), i.currentNode = null;
      } else
        i.onError(
          he(30, e.loc)
        );
      break;
    }
  }
}
function Ac(e, t) {
  const i = e.tagType === 3;
  return {
    type: 10,
    loc: e.loc,
    condition: t.name === "else" ? void 0 : t.exp,
    children: i && !Be(e, "for") ? e.children : [e],
    userKey: Os(e, "key"),
    isTemplateIf: i
  };
}
function gc(e, t, i) {
  return e.condition ? Zi(
    e.condition,
    yc(e, t, i),
    // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    ve(i.helper(Bs), [
      '"v-if"',
      "true"
    ])
  ) : yc(e, t, i);
}
function yc(e, t, i) {
  const { helper: a } = i, l = Ee(
    "key",
    z(
      `${t}`,
      !1,
      Pe,
      2
    )
  ), { children: h } = e, c = h[0];
  if (h.length !== 1 || c.type !== 1)
    if (h.length === 1 && c.type === 11) {
      const u = c.codegenNode;
      return ni(u, l, i), u;
    } else {
      let u = 64;
      return !e.isTemplateIf && h.filter((g) => g.type !== 3).length === 1 && (u |= 2048), ks(
        i,
        a(Ps),
        it([l]),
        h,
        u,
        void 0,
        void 0,
        !0,
        !1,
        !1,
        e.loc
      );
    }
  else {
    const u = c.codegenNode, g = Mu(u);
    return g.type === 13 && Pr(g, i), ni(g, l, i), u;
  }
}
function Ty(e, t) {
  if (!e || e.type !== t.type)
    return !1;
  if (e.type === 6) {
    if (e.value.content !== t.value.content)
      return !1;
  } else {
    const i = e.exp, a = t.exp;
    if (i.type !== a.type || i.type !== 4 || i.isStatic !== a.isStatic || i.content !== a.content)
      return !1;
  }
  return !0;
}
function Py(e) {
  for (; ; )
    if (e.type === 19)
      if (e.alternate.type === 19)
        e = e.alternate;
      else
        return e;
    else e.type === 20 && (e = e.value);
}
const Ny = za(
  "for",
  (e, t, i) => {
    const { helper: a, removeHelper: l } = i;
    return ap(e, t, i, (h) => {
      const c = ve(a(Ir), [
        h.source
      ]), p = _s(e), u = Be(e, "memo"), g = Os(e, "key", !1, !0), b = g && g.type === 7;
      let A = g && (g.type === 6 ? g.value ? z(g.value.content, !0) : void 0 : g.exp);
      const m = A ? Ee("key", A) : null;
      p && u && (u.exp = Ye(
        u.exp,
        i
      )), (p || u) && m && b && (A = g.exp = m.value = Ye(
        m.value,
        i
      ), u && i.vForMemoKeyedNodes.add(e));
      const d = h.source.type === 4 && h.source.constType > 0, y = d ? 64 : g ? 128 : 256;
      return h.codegenNode = ks(
        i,
        a(Ps),
        void 0,
        c,
        y,
        void 0,
        void 0,
        !0,
        !d,
        !1,
        e.loc
      ), () => {
        var I;
        let w;
        const { children: v } = h;
        p && e.children.some((M) => {
          if (M.type === 1) {
            const R = Os(M, "key");
            if (R)
              return i.onError(
                he(
                  33,
                  R.loc
                )
              ), !0;
          }
        });
        const S = v.length !== 1 || v[0].type !== 1, P = ri(e) ? e : p && e.children.length === 1 && ri(e.children[0]) ? e.children[0] : null;
        if (P)
          w = P.codegenNode, p && m && ni(w, m, i);
        else if (S)
          w = ks(
            i,
            a(Ps),
            m ? it([m]) : void 0,
            e.children,
            64,
            void 0,
            void 0,
            !0,
            void 0,
            !1
          );
        else {
          w = v[0].codegenNode, p && m && ni(w, m, i);
          const M = !d || w.isBlockRequired === !0;
          w.isBlock !== M && (w.isBlock ? (l(Vt), l(
            os(i.inSSR, w.isComponent)
          )) : l(
            as(i.inSSR, w.isComponent)
          )), w.isBlock = M, w.isBlock ? (a(Vt), a(os(i.inSSR, w.isComponent))) : (a(as(i.inSSR, w.isComponent)), w.needsPatch && (w.patchFlag = ((I = w.patchFlag) != null ? I : 0) | 512));
        }
        if (u) {
          const M = ns(
            ir(h.parseResult, [
              z("_cached")
            ])
          );
          M.body = au([
            Qe(["const _memo = (", u.exp, ")"]),
            Qe([
              "if (_cached && _cached.el",
              ...A ? [" && _cached.key === ", A] : [],
              ` && ${i.helperString(
                Da
              )}(_cached, _memo)) return _cached`
            ]),
            Qe(["const _item = ", w]),
            z("_item.memo = _memo"),
            z("return _item")
          ]), c.arguments.push(
            M,
            z("_cache"),
            z(String(i.cached.length))
          ), i.cached.push(null);
        } else
          c.arguments.push(
            ns(
              ir(h.parseResult),
              w,
              !0
            )
          );
      };
    });
  }
);
function ap(e, t, i, a) {
  if (!t.exp) {
    i.onError(
      he(31, t.loc)
    );
    return;
  }
  const l = t.forParseResult;
  if (!l) {
    i.onError(
      he(32, t.loc)
    );
    return;
  }
  to(l, i);
  const { addIdentifiers: h, removeIdentifiers: c, scopes: p } = i, { source: u, value: g, key: b, index: A } = l, m = {
    type: 11,
    loc: t.loc,
    source: u,
    valueAlias: g,
    keyAlias: b,
    objectIndexAlias: A,
    parseResult: l,
    children: _s(e) ? e.children : [e]
  };
  i.replaceNode(m), p.vFor++, i.prefixIdentifiers && (g && h(g), b && h(b), A && h(A));
  const d = a && a(m);
  return () => {
    p.vFor--, i.prefixIdentifiers && (g && c(g), b && c(b), A && c(A)), d && d();
  };
}
function to(e, t) {
  e.finalized || (t.prefixIdentifiers && (e.source = Ye(
    e.source,
    t
  ), e.key && (e.key = Ye(
    e.key,
    t,
    !0
  )), e.index && (e.index = Ye(
    e.index,
    t,
    !0
  )), e.value && (e.value = Ye(
    e.value,
    t,
    !0
  ))), e.finalized = !0);
}
function ir({ value: e, key: t, index: i }, a = []) {
  return ky([e, t, i, ...a]);
}
function ky(e) {
  let t = e.length;
  for (; t-- && !e[t]; )
    ;
  return e.slice(0, t + 1).map((i, a) => i || z("_".repeat(a + 1), !1));
}
const Sc = z("undefined", !1), op = (e, t) => {
  if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
    const i = Be(e, "slot");
    if (i) {
      const a = i.exp;
      return t.prefixIdentifiers && a && t.addIdentifiers(a), t.scopes.vSlot++, () => {
        t.prefixIdentifiers && a && t.removeIdentifiers(a), t.scopes.vSlot--;
      };
    }
  }
}, lp = (e, t) => {
  let i;
  if (_s(e) && e.props.some(Lr) && (i = Be(e, "for"))) {
    const a = i.forParseResult;
    if (a) {
      to(a, t);
      const { value: l, key: h, index: c } = a, { addIdentifiers: p, removeIdentifiers: u } = t;
      return l && p(l), h && p(h), c && p(c), () => {
        l && u(l), h && u(h), c && u(c);
      };
    }
  }
}, Oy = (e, t, i, a) => ns(
  e,
  i,
  !1,
  !0,
  i.length ? i[0].loc : a
);
function cp(e, t, i = Oy) {
  t.helper(Cr);
  const { children: a, loc: l } = e, h = [], c = [];
  let p = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
  !t.ssr && t.prefixIdentifiers && (p = e.props.some(
    (w) => Lr(w) && (Fe(w.arg, t.identifiers) || Fe(w.exp, t.identifiers))
  ) || a.some((w) => Fe(w, t.identifiers)));
  const u = Be(e, "slot", !0);
  if (u) {
    const { arg: w, exp: v } = u;
    w && !Ge(w) && (p = !0), h.push(
      Ee(
        w || z("default", !0),
        i(v, void 0, a, l)
      )
    );
  }
  let g = !1, b = !1;
  const A = [], m = /* @__PURE__ */ new Set();
  let d = 0;
  for (let w = 0; w < a.length; w++) {
    const v = a[w];
    let S;
    if (!_s(v) || !(S = Be(v, "slot", !0))) {
      v.type !== 3 && A.push(v);
      continue;
    }
    if (u) {
      t.onError(
        he(37, S.loc)
      );
      break;
    }
    g = !0;
    const { children: P, loc: M } = v, {
      arg: R = z("default", !0),
      exp: L,
      loc: F
    } = S;
    let k;
    Ge(R) ? k = R ? R.content : "default" : p = !0;
    const O = Be(v, "for"), B = i(L, O, P, M);
    let _, U;
    if (_ = Be(v, "if"))
      p = !0, c.push(
        Zi(
          _.exp,
          ki(R, B, d++),
          Sc
        )
      );
    else if (U = Be(
      v,
      /^else(?:-if)?$/,
      !0
      /* allowEmpty */
    )) {
      let J = w, $;
      for (; J-- && ($ = a[J], !!Mr($)); )
        ;
      if ($ && _s($) && Be($, /^(?:else-)?if$/)) {
        let G = c[c.length - 1];
        for (; G.alternate.type === 19; )
          G = G.alternate;
        G.alternate = U.exp ? Zi(
          U.exp,
          ki(
            R,
            B,
            d++
          ),
          Sc
        ) : ki(R, B, d++);
      } else
        t.onError(
          he(30, U.loc)
        );
    } else if (O) {
      p = !0;
      const J = O.forParseResult;
      J ? (to(J, t), c.push(
        ve(t.helper(Ir), [
          J.source,
          ns(
            ir(J),
            ki(R, B),
            !0
          )
        ])
      )) : t.onError(
        he(
          32,
          O.loc
        )
      );
    } else {
      if (k) {
        if (m.has(k)) {
          t.onError(
            he(
              38,
              F
            )
          );
          continue;
        }
        m.add(k), k === "default" && (b = !0);
      }
      h.push(Ee(R, B));
    }
  }
  if (!u) {
    const w = (v, S) => {
      const P = i(v, void 0, S, l);
      return Ee("default", P);
    };
    g ? A.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    !A.every(Rr) && (b ? t.onError(
      he(
        39,
        A[0].loc
      )
    ) : h.push(
      w(void 0, A)
    )) : h.push(w(void 0, a));
  }
  const y = p ? 2 : ji(e.children) ? 3 : 1;
  let I = it(
    h.concat(
      Ee(
        "_",
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        z(
          y + ` /* ${qm[y]} */`,
          !1
        )
      )
    ),
    l
  );
  return c.length && (I = ve(t.helper(_a), [
    I,
    Ft(c)
  ])), {
    slots: I,
    hasDynamicSlots: p
  };
}
function ki(e, t, i) {
  const a = [
    Ee("name", e),
    Ee("fn", t)
  ];
  return i != null && a.push(
    Ee("key", z(String(i), !0))
  ), it(a);
}
function ji(e) {
  for (let t = 0; t < e.length; t++) {
    const i = e[t];
    switch (i.type) {
      case 1:
        if (i.tagType === 2 || ji(i.children))
          return !0;
        break;
      case 9:
        if (ji(i.branches)) return !0;
        break;
      case 10:
      case 11:
        if (ji(i.children)) return !0;
        break;
    }
  }
  return !1;
}
const hp = /* @__PURE__ */ new WeakMap(), up = (e, t) => function() {
  if (e = t.currentNode, !(e.type === 1 && (e.tagType === 0 || e.tagType === 1)))
    return;
  const { tag: a, props: l } = e, h = e.tagType === 1;
  let c = h ? pp(e, t) : `"${a}"`;
  const p = Ds(c) && c.callee === yr;
  let u, g, b = 0, A, m, d, y = !1, I = !1, w = (
    // dynamic component may resolve to plain elements
    p || c === ws || c === fr || !h && // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    (a === "svg" || a === "foreignObject" || a === "math")
  );
  if (l.length > 0) {
    const S = so(
      e,
      t,
      void 0,
      h,
      p
    );
    u = S.props, b = S.patchFlag, m = S.dynamicPropNames, y = S.needsPatch, I = S.isBlockRequired;
    const P = S.directives;
    d = P && P.length ? Ft(
      P.map((M) => fp(M, t))
    ) : void 0, S.shouldUseBlock && (w = !0);
  }
  if (e.children.length > 0)
    if (c === qs && (w = !0, b |= 1024, e.children.length > 1 && t.onError(
      he(47, {
        start: e.children[0].loc.start,
        end: e.children[e.children.length - 1].loc.end,
        source: ""
      })
    )), h && // Teleport is not a real component and has dedicated runtime handling
    c !== ws && // explained above.
    c !== qs) {
      const { slots: P, hasDynamicSlots: M } = cp(e, t);
      g = P, M && (b |= 1024);
    } else if (e.children.length === 1 && c !== ws) {
      const P = e.children[0], M = P.type, R = M === 5 || M === 8;
      R && qe(P, t) === 0 && (b |= 1), R || M === 2 ? g = P : g = e.children;
    } else
      g = e.children;
  m && m.length && (A = Dy(m));
  const v = e.codegenNode = ks(
    t,
    c,
    u,
    g,
    b === 0 ? void 0 : b,
    A,
    d,
    !!w,
    !1,
    h,
    e.loc
  );
  y = y && (b === 0 || b === 32), y && (v.needsPatch = !0), I && (v.isBlockRequired = !0);
};
function pp(e, t, i = !1) {
  let { tag: a } = e;
  const l = Ia(a), h = Os(
    e,
    "is",
    !1,
    !0
    /* allow empty */
  );
  if (h)
    if (l) {
      let p;
      if (h.type === 6 ? p = h.value && z(h.value.content, !0) : (p = h.exp, p || (p = z("is", !1, h.arg.loc), p = h.exp = Ye(p, t))), p)
        return ve(t.helper(yr), [
          p
        ]);
    } else h.type === 6 && h.value.content.startsWith("vue:") && (a = h.value.content.slice(4));
  const c = Qa(a) || t.isBuiltInComponent(a);
  if (c)
    return i || t.helper(c), c;
  {
    const p = xa(a, t);
    if (p)
      return p;
    const u = a.indexOf(".");
    if (u > 0) {
      const g = xa(a.slice(0, u), t);
      if (g)
        return g + a.slice(u);
    }
  }
  return t.selfName && rs(He(a)) === t.selfName ? (t.helper(zs), t.components.add(a + "__self"), ai(a, "component")) : (t.helper(zs), t.components.add(a), ai(a, "component"));
}
function xa(e, t) {
  const i = t.bindingMetadata;
  if (!i || i.__isScriptSetup === !1)
    return;
  const a = He(e), l = rs(a), h = (g) => {
    if (i[e] === g)
      return e;
    if (i[a] === g)
      return a;
    if (i[l] === g)
      return l;
  }, c = h("setup-const") || h("setup-reactive-const") || h("literal-const");
  if (c)
    return t.inline ? (
      // in inline mode, const setup bindings (e.g. imports) can be used as-is
      c
    ) : `$setup[${JSON.stringify(c)}]`;
  const p = h("setup-let") || h("setup-ref") || h("setup-maybe-ref");
  if (p)
    return t.inline ? (
      // setup scope bindings that may be refs need to be unrefed
      `${t.helperString(si)}(${p})`
    ) : `$setup[${JSON.stringify(p)}]`;
  const u = h("props");
  if (u)
    return `${t.helperString(si)}(${t.inline ? "__props" : "$props"}[${JSON.stringify(u)}])`;
}
function so(e, t, i = e.props, a, l, h = !1) {
  const { tag: c, loc: p, children: u } = e;
  let g = [];
  const b = [], A = [], m = u.length > 0;
  let d = !1, y = !1, I = 0, w = !1, v = !1, S = !1, P = !1, M = !1, R = !1;
  const L = [], F = (U) => {
    g.length && (b.push(
      it(xc(g), p)
    ), g = []), U && b.push(U);
  }, k = () => {
    t.scopes.vFor > 0 && g.push(
      Ee(
        z("ref_for", !0),
        z("true")
      )
    );
  }, O = ({ key: U, value: J }) => {
    if (Ge(U)) {
      const $ = U.content, G = Qh($);
      if (G && (!a || l) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      $.toLowerCase() !== "onclick" && // omit v-model handlers
      $ !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !jl($) && (P = !0), G && jl($) && (R = !0), $ === "ref" && (w = !0), G && J.type === 14 && (J = J.arguments[0]), J.type === 20 || (J.type === 4 || J.type === 8) && qe(J, t) > 0)
        return;
      $ === "class" ? v = !0 : $ === "style" ? S = !0 : $ !== "ref" && $ !== "key" && !L.includes($) && L.push($), a && ($ === "class" || $ === "style") && !L.includes($) && L.push($);
    } else
      M = !0;
  };
  for (let U = 0; U < i.length; U++) {
    const J = i[U];
    if (J.type === 6) {
      const { loc: $, name: G, nameLoc: pe, value: ee } = J;
      let ye = !0;
      if (G === "ref" && (w = !0, k(), ee && t.inline)) {
        const Z = t.bindingMetadata[ee.content];
        (Z === "setup-let" || Z === "setup-ref" || Z === "setup-maybe-ref") && (ye = !1, g.push(
          Ee(
            z("ref_key", !0),
            z(ee.content, !0, ee.loc)
          )
        ));
      }
      if (G === "is" && (Ia(c) || ee && ee.content.startsWith("vue:")))
        continue;
      g.push(
        Ee(
          z(G, !0, pe),
          z(
            ee ? ee.content : "",
            ye,
            ee ? ee.loc : $
          )
        )
      );
    } else {
      const { name: $, arg: G, exp: pe, loc: ee, modifiers: ye } = J, Z = $ === "bind", ue = $ === "on";
      if ($ === "slot") {
        a || t.onError(
          he(40, ee)
        );
        continue;
      }
      if ($ === "once" || $ === "memo" || $ === "is" || Z && Ut(G, "is") && Ia(c) || ue && h)
        continue;
      if (Z && Ut(G, "key") && (d = !0), ue && m && G && Ge(G) && He(G.content) === "vue:beforeUpdate" && (d = !0, y = !0), Z && Ut(G, "ref") && k(), !G && (Z || ue)) {
        M = !0, pe ? Z ? (k(), F(), b.push(pe)) : F({
          type: 14,
          loc: ee,
          callee: t.helper(wr),
          arguments: a ? [pe] : [pe, "true"]
        }) : t.onError(
          he(
            Z ? 34 : 35,
            ee
          )
        );
        continue;
      }
      Z && ye.some((Ne) => Ne.content === "prop") && (I |= 32);
      const lt = t.directiveTransforms[$];
      if (lt) {
        const { props: Ne, needRuntime: q } = lt(J, e, t);
        !h && Ne.forEach(O), ue && G && !Ge(G) ? F(it(Ne, p)) : g.push(...Ne), q && (A.push(J), cs(q) && hp.set(J, q));
      } else Hh($) || (A.push(J), m && (d = !0, y = !0));
    }
  }
  let B;
  b.length ? (F(), b.length > 1 ? B = ve(
    t.helper(ei),
    b,
    p
  ) : B = b[0]) : g.length && (B = it(
    xc(g),
    p
  )), M ? I |= 16 : (v && !a && (I |= 2), S && !a && (I |= 4), L.length && (I |= 8), P && (I |= 32));
  const _ = (I === 0 || I === 32) && (w || R || A.length > 0);
  if (!d && _ && (I |= 512), !t.inSSR && B)
    switch (B.type) {
      case 15:
        let U = -1, J = -1, $ = !1;
        for (let ee = 0; ee < B.properties.length; ee++) {
          const ye = B.properties[ee].key;
          Ge(ye) ? ye.content === "class" ? U = ee : ye.content === "style" && (J = ee) : ye.isHandlerKey || ($ = !0);
        }
        const G = B.properties[U], pe = B.properties[J];
        $ ? B = ve(
          t.helper(Ns),
          [B]
        ) : (G && !Ge(G.value) && (G.value = ve(
          t.helper(Er),
          [G.value]
        )), pe && // the static style is compiled into an object,
        // so use `hasStyleBinding` to ensure that it is a dynamic style binding
        (S || pe.value.type === 4 && pe.value.content.trim()[0] === "[" || // v-bind:style and style both exist,
        // v-bind:style with static literal object
        pe.value.type === 17) && (pe.value = ve(
          t.helper(br),
          [pe.value]
        )));
        break;
      case 14:
        break;
      default:
        B = ve(
          t.helper(Ns),
          [
            ve(t.helper(Ls), [
              B
            ])
          ]
        );
        break;
    }
  return {
    props: B,
    directives: A,
    patchFlag: I,
    dynamicPropNames: L,
    shouldUseBlock: d,
    needsPatch: _,
    isBlockRequired: y
  };
}
function xc(e) {
  const t = /* @__PURE__ */ new Map(), i = [];
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (l.key.type === 8 || !l.key.isStatic) {
      i.push(l);
      continue;
    }
    const h = l.key.content, c = t.get(h);
    c ? (h === "style" || h === "class" || Qh(h)) && _y(c, l) : (t.set(h, l), i.push(l));
  }
  return i;
}
function _y(e, t) {
  e.value.type === 17 ? e.value.elements.push(t.value) : e.value = Ft(
    [e.value, t.value],
    e.loc
  );
}
function fp(e, t) {
  const i = [], a = hp.get(e);
  if (a)
    i.push(t.helperString(a));
  else {
    const h = xa("v-" + e.name, t);
    h ? i.push(h) : (t.helper(Sr), t.directives.add(e.name), i.push(ai(e.name, "directive")));
  }
  const { loc: l } = e;
  if (e.exp && i.push(e.exp), e.arg && (e.exp || i.push("void 0"), i.push(e.arg)), Object.keys(e.modifiers).length) {
    e.arg || (e.exp || i.push("void 0"), i.push("void 0"));
    const h = z("true", !1, l);
    i.push(
      it(
        e.modifiers.map(
          (c) => Ee(c, h)
        ),
        l
      )
    );
  }
  return Ft(i, e.loc);
}
function Dy(e) {
  let t = "[";
  for (let i = 0, a = e.length; i < a; i++)
    t += JSON.stringify(e[i]), i < a - 1 && (t += ", ");
  return t + "]";
}
function Ia(e) {
  return e === "component" || e === "Component";
}
const By = (e, t) => {
  if (ri(e)) {
    const { children: i, loc: a } = e, { slotName: l, slotProps: h } = dp(e, t), c = [
      t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
      l,
      "{}",
      "undefined",
      "true"
    ];
    let p = 2;
    h && (c[2] = h, p = 3), i.length && (c[3] = ns([], i, !1, !1, a), p = 4), t.scopeId && !t.slotted && (p = 5), c.splice(p), e.codegenNode = ve(
      t.helper(Oa),
      c,
      a
    );
  }
};
function dp(e, t) {
  let i = '"default"', a;
  const l = [];
  for (let h = 0; h < e.props.length; h++) {
    const c = e.props[h];
    if (c.type === 6)
      c.value && (c.name === "name" ? i = JSON.stringify(c.value.content) : (c.name = He(c.name), l.push(c)));
    else if (c.name === "bind" && Ut(c.arg, "name")) {
      if (c.exp)
        i = c.exp;
      else if (c.arg && c.arg.type === 4) {
        const p = He(c.arg.content);
        i = c.exp = z(p, !1, c.arg.loc), i = c.exp = Ye(c.exp, t);
      }
    } else
      c.name === "bind" && c.arg && Ge(c.arg) && (c.arg.content = He(c.arg.content)), l.push(c);
  }
  if (l.length > 0) {
    const { props: h, directives: c } = so(
      e,
      t,
      l,
      !1,
      !1
    );
    a = h, c.length && t.onError(
      he(
        36,
        c[0].loc
      )
    );
  }
  return {
    slotName: i,
    slotProps: a
  };
}
const io = (e, t, i, a) => {
  const { loc: l, modifiers: h, arg: c } = e;
  !e.exp && !h.length && i.onError(he(35, l));
  let p;
  if (c.type === 4)
    if (c.isStatic) {
      let A = c.content;
      A.startsWith("vnode") && i.onError(he(52, c.loc)), A.startsWith("vue:") && (A = `vnode-${A.slice(4)}`);
      const m = t.tagType !== 0 || A.startsWith("vnode") || !/[A-Z]/.test(A) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        Jm(He(A))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${A}`
      );
      p = z(m, !0, c.loc);
    } else
      p = Qe([
        `${i.helperString(Xi)}(`,
        c,
        ")"
      ]);
  else
    p = c, p.children.unshift(`${i.helperString(Xi)}(`), p.children.push(")");
  let u = e.exp;
  u && !u.content.trim() && (u = void 0);
  let g = i.cacheHandlers && !u && !i.inVOnce;
  if (u) {
    const A = Ha(u, i), m = !(A || Lu(u, i)), d = u.content.includes(";");
    i.prefixIdentifiers && (m && i.addIdentifiers("$event"), u = e.exp = Ye(
      u,
      i,
      !1,
      d
    ), m && i.removeIdentifiers("$event"), g = i.cacheHandlers && // unnecessary to cache inside v-once
    !i.inVOnce && // runtime constants don't need to be cached
    // (this is analyzed by compileScript in SFC <script setup>)
    !(u.type === 4 && u.constType > 0) && // #1541 bail if this is a member exp handler passed to a component -
    // we need to use the original function to preserve arity,
    // e.g. <transition> relies on checking cb.length to determine
    // transition end handling. Inline function is ok since its arity
    // is preserved even when cached.
    !(A && t.tagType === 1) && // bail if the function references closure variables (v-for, v-slot)
    // it must be passed fresh to avoid stale values.
    !Fe(u, i.identifiers), g && A && (u.type === 4 ? u.content = `${u.content} && ${u.content}(...args)` : u.children = [...u.children, " && ", ...u.children, "(...args)"])), (m || g && A) && (u = Qe([
      `${m ? i.isTS ? "($event: any)" : "$event" : `${i.isTS ? `
//@ts-ignore
` : ""}(...args)`} => ${d ? "{" : "("}`,
      u,
      d ? "}" : ")"
    ]));
  }
  let b = {
    props: [
      Ee(
        p,
        u || z("() => {}", !1, l)
      )
    ]
  };
  return a && (b = a(b)), g && (b.props[0].value = i.cache(b.props[0].value)), b.props.forEach((A) => A.key.isHandlerKey = !0), b;
}, mp = (e, t, i) => {
  const { modifiers: a, loc: l } = e, h = e.arg;
  let { exp: c } = e;
  return c && c.type === 4 && !c.content.trim() ? (i.onError(
    he(34, l)
  ), {
    props: [
      Ee(h, z("", !0, l))
    ]
  }) : (h.type !== 4 ? (h.children.unshift("("), h.children.push(') || ""')) : h.isStatic || (h.content = h.content ? `${h.content} || ""` : '""'), a.some((p) => p.content === "camel") && (h.type === 4 ? h.isStatic ? h.content = He(h.content) : h.content = `${i.helperString(Ji)}(${h.content})` : (h.children.unshift(`${i.helperString(Ji)}(`), h.children.push(")"))), i.inSSR || (a.some((p) => p.content === "prop") && Ic(h, "."), a.some((p) => p.content === "attr") && Ic(h, "^")), {
    props: [Ee(h, c)]
  });
}, Ic = (e, t) => {
  e.type === 4 ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, Ly = (e, t) => {
  if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10)
    return () => {
      const i = e.children;
      let a, l = !1;
      for (let h = 0; h < i.length; h++) {
        const c = i[h];
        if (Fi(c)) {
          l = !0;
          for (let p = h + 1; p < i.length; p++) {
            const u = i[p];
            if (Fi(u))
              a || (a = i[h] = Qe(
                [c],
                c.loc
              )), a.children.push(" + ", u), i.splice(p, 1), p--;
            else {
              a = void 0;
              break;
            }
          }
        }
      }
      if (!(!l || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      i.length === 1 && (e.type === 0 || e.type === 1 && e.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !e.props.find(
        (h) => h.type === 7 && !t.directiveTransforms[h.name]
      ))))
        for (let h = 0; h < i.length; h++) {
          const c = i[h];
          if (Fi(c) || c.type === 8) {
            const p = [];
            (c.type !== 2 || c.content !== " ") && p.push(c), !t.ssr && qe(c, t) === 0 && p.push(
              `1 /* ${Js[1]} */`
            ), i[h] = {
              type: 12,
              content: c,
              loc: c.loc,
              codegenNode: ve(
                t.helper(Ar),
                p
              )
            };
          }
        }
    };
}, Ec = /* @__PURE__ */ new WeakSet(), Ry = (e, t) => {
  if (e.type === 1 && Be(e, "once", !0))
    return Ec.has(e) || t.inVOnce || t.inSSR ? void 0 : (Ec.add(e), t.inVOnce = !0, t.helper(ti), () => {
      t.inVOnce = !1;
      const i = t.currentNode;
      i.codegenNode && (i.codegenNode = t.cache(
        i.codegenNode,
        !0,
        !0
      ));
    });
}, ro = (e, t, i) => {
  const { exp: a, arg: l } = e;
  if (!a)
    return i.onError(
      he(41, e.loc)
    ), As();
  const h = a.loc.source.trim(), c = a.type === 4 ? a.content : h, p = i.bindingMetadata[h];
  if (p === "props" || p === "props-aliased")
    return i.onError(he(44, a.loc)), As();
  if (p === "literal-const" || p === "setup-const")
    return i.onError(he(45, a.loc)), As();
  const u = i.inline && (p === "setup-let" || p === "setup-ref" || p === "setup-maybe-ref");
  if (!c.trim() || !Ha(a, i) && !u)
    return i.onError(
      he(42, a.loc)
    ), As();
  if (i.prefixIdentifiers && mt(c) && i.identifiers[c])
    return i.onError(
      he(43, a.loc)
    ), As();
  const g = l || z("modelValue", !0), b = l ? Ge(l) ? `onUpdate:${He(l.content)}` : Qe(['"onUpdate:" + ', l]) : "onUpdate:modelValue";
  let A;
  const m = i.isTS ? "($event: any)" : "$event";
  if (u)
    if (p === "setup-ref")
      A = Qe([
        `${m} => ((`,
        z(h, !1, a.loc),
        ").value = $event)"
      ]);
    else {
      const y = p === "setup-let" ? `${h} = $event` : "null";
      A = Qe([
        `${m} => (${i.helperString(ii)}(${h}) ? (`,
        z(h, !1, a.loc),
        `).value = $event : ${y})`
      ]);
    }
  else
    A = Qe([
      `${m} => ((`,
      a,
      ") = $event)"
    ]);
  const d = [
    // modelValue: foo
    Ee(g, e.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    Ee(b, A)
  ];
  if (i.prefixIdentifiers && !i.inVOnce && i.cacheHandlers && !Fe(a, i.identifiers) && (d[1].value = i.cache(d[1].value)), e.modifiers.length && t.tagType === 1) {
    const y = e.modifiers.map((w) => w.content).map((w) => (mt(w) ? w : JSON.stringify(w)) + ": true").join(", "), I = l ? Ge(l) ? `${l.content}Modifiers` : Qe([l, ' + "Modifiers"']) : "modelModifiers";
    d.push(
      Ee(
        I,
        z(
          `{ ${y} }`,
          !1,
          e.loc,
          2
        )
      )
    );
  }
  return As(d);
};
function As(e = []) {
  return { props: e };
}
const bc = /* @__PURE__ */ new WeakSet(), My = (e, t) => {
  if (e.type === 1) {
    const i = Be(e, "memo");
    return !i || bc.has(e) || t.inSSR ? void 0 : (bc.add(e), () => {
      const a = e.codegenNode || t.currentNode.codegenNode;
      a && a.type === 13 && (e.tagType !== 1 && Pr(a, t), e.codegenNode = ve(t.helper(vr), [
        i.exp,
        ns(void 0, a),
        "_cache",
        String(t.cached.length)
      ]), t.cached.push(null));
    });
  }
}, Ap = (e, t) => {
  if (e.type === 1) {
    for (const i of e.props)
      if (i.type === 7 && i.name === "bind" && !i.exp && i.arg) {
        const a = i.arg;
        if (a.type !== 4 || !a.isStatic)
          t.onError(
            he(
              53,
              a.loc
            )
          ), i.exp = z("", !0, a.loc);
        else {
          const l = He(a.content);
          ($a.test(l[0]) || // allow hyphen first char for https://github.com/vuejs/language-tools/pull/3424
          l[0] === "-") && (i.exp = z(l, !1, a.loc));
        }
      }
  }
};
function no(e) {
  return [
    [
      Ap,
      Ry,
      vy,
      My,
      Ny,
      ...e ? [
        // order is important
        lp,
        rp
      ] : [],
      By,
      up,
      op,
      Ly
    ],
    {
      on: io,
      bind: mp,
      model: ro
    }
  ];
}
function gp(e, t = {}) {
  const i = t.onError || Fa, a = t.mode === "module", l = t.prefixIdentifiers === !0 || a;
  !l && t.cacheHandlers && i(he(50)), t.scopeId && !a && i(he(51));
  const h = bt({}, t, {
    prefixIdentifiers: l
  }), c = le(e) ? qa(e, h) : e, [p, u] = no(l);
  if (t.isTS) {
    const { expressionPlugins: g } = t;
    (!g || !g.includes("typescript")) && (t.expressionPlugins = [...g || [], "typescript"]);
  }
  return Yu(
    c,
    bt({}, h, {
      nodeTransforms: [
        ...p,
        ...t.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: bt(
        {},
        u,
        t.directiveTransforms || {}
        // user transforms
      )
    })
  ), zu(c, h);
}
const Fy = {
  DATA: "data",
  PROPS: "props",
  PROPS_ALIASED: "props-aliased",
  SETUP_LET: "setup-let",
  SETUP_CONST: "setup-const",
  SETUP_REACTIVE_CONST: "setup-reactive-const",
  SETUP_MAYBE_REF: "setup-maybe-ref",
  SETUP_REF: "setup-ref",
  OPTIONS: "options",
  LITERAL_CONST: "literal-const"
}, yp = () => ({ props: [] }), ao = /* @__PURE__ */ Symbol("vModelRadio"), oo = /* @__PURE__ */ Symbol(
  "vModelCheckbox"
), lo = /* @__PURE__ */ Symbol("vModelText"), co = /* @__PURE__ */ Symbol(
  "vModelSelect"
), rr = /* @__PURE__ */ Symbol(
  "vModelDynamic"
), ho = /* @__PURE__ */ Symbol(
  "vOnModifiersGuard"
), uo = /* @__PURE__ */ Symbol(
  "vOnKeysGuard"
), po = /* @__PURE__ */ Symbol("vShow"), Gr = /* @__PURE__ */ Symbol("Transition"), fo = /* @__PURE__ */ Symbol(
  "TransitionGroup"
);
Ba({
  [ao]: "vModelRadio",
  [oo]: "vModelCheckbox",
  [lo]: "vModelText",
  [co]: "vModelSelect",
  [rr]: "vModelDynamic",
  [ho]: "withModifiers",
  [uo]: "withKeys",
  [po]: "vShow",
  [Gr]: "Transition",
  [fo]: "TransitionGroup"
});
const oi = {
  parseMode: "html",
  isVoidTag: qh,
  isNativeTag: (e) => cA(e) || hA(e) || uA(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: void 0,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return Gr;
    if (e === "TransitionGroup" || e === "transition-group")
      return fo;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(e, t, i) {
    let a = t ? t.ns : i;
    if (t && a === 2)
      if (t.tag === "annotation-xml") {
        if (e === "svg")
          return 1;
        t.props.some(
          (l) => l.type === 6 && l.name === "encoding" && l.value != null && (l.value.content === "text/html" || l.value.content === "application/xhtml+xml")
        ) && (a = 0);
      } else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (a = 0);
    else t && a === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (a = 0);
    if (a === 0) {
      if (e === "svg")
        return 1;
      if (e === "math")
        return 2;
    }
    return a;
  }
}, Sp = (e) => {
  e.type === 1 && e.props.forEach((t, i) => {
    t.type === 6 && t.name === "style" && t.value && (e.props[i] = {
      type: 7,
      name: "bind",
      arg: z("style", !0, t.loc),
      exp: Uy(t.value.content, t.loc),
      modifiers: [],
      loc: t.loc
    });
  });
}, Uy = (e, t) => {
  const i = Xh(e);
  return z(
    JSON.stringify(i),
    !1,
    t,
    3
  );
};
function ot(e, t) {
  return he(
    e,
    t,
    mo
  );
}
const Vy = {
  X_V_HTML_NO_EXPRESSION: 54,
  54: "X_V_HTML_NO_EXPRESSION",
  X_V_HTML_WITH_CHILDREN: 55,
  55: "X_V_HTML_WITH_CHILDREN",
  X_V_TEXT_NO_EXPRESSION: 56,
  56: "X_V_TEXT_NO_EXPRESSION",
  X_V_TEXT_WITH_CHILDREN: 57,
  57: "X_V_TEXT_WITH_CHILDREN",
  X_V_MODEL_ON_INVALID_ELEMENT: 58,
  58: "X_V_MODEL_ON_INVALID_ELEMENT",
  X_V_MODEL_ARG_ON_ELEMENT: 59,
  59: "X_V_MODEL_ARG_ON_ELEMENT",
  X_V_MODEL_ON_FILE_INPUT_ELEMENT: 60,
  60: "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
  X_V_MODEL_UNNECESSARY_VALUE: 61,
  61: "X_V_MODEL_UNNECESSARY_VALUE",
  X_V_SHOW_NO_EXPRESSION: 62,
  62: "X_V_SHOW_NO_EXPRESSION",
  X_TRANSITION_INVALID_CHILDREN: 63,
  63: "X_TRANSITION_INVALID_CHILDREN",
  X_IGNORED_SIDE_EFFECT_TAG: 64,
  64: "X_IGNORED_SIDE_EFFECT_TAG",
  __EXTEND_POINT__: 65,
  65: "__EXTEND_POINT__"
}, mo = {
  54: "v-html is missing expression.",
  55: "v-html will override element children.",
  56: "v-text is missing expression.",
  57: "v-text will override element children.",
  58: "v-model can only be used on <input>, <textarea> and <select> elements.",
  59: "v-model argument is not supported on plain elements.",
  60: "v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.",
  61: "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.",
  62: "v-show is missing expression.",
  63: "<Transition> expects exactly one child element or component.",
  64: "Tags with side effect (<script> and <style>) are ignored in client component templates."
}, Gy = (e, t, i) => {
  const { exp: a, loc: l } = e;
  return a || i.onError(
    ot(54, l)
  ), t.children.length && (i.onError(
    ot(55, l)
  ), t.children.length = 0), {
    props: [
      Ee(
        z("innerHTML", !0, l),
        a || z("", !0)
      )
    ]
  };
}, Ky = (e, t, i) => {
  const { exp: a, loc: l } = e;
  return a || i.onError(
    ot(56, l)
  ), t.children.length && (i.onError(
    ot(57, l)
  ), t.children.length = 0), {
    props: [
      Ee(
        z("textContent", !0),
        a ? qe(a, i) > 0 ? a : ve(
          i.helperString(hi),
          [a],
          l
        ) : z("", !0)
      )
    ]
  };
}, jy = (e, t, i) => {
  const a = ro(e, t, i);
  if (!a.props.length || t.tagType === 1)
    return a;
  e.arg && i.onError(
    ot(
      59,
      e.arg.loc
    )
  );
  function l() {
    const p = Be(t, "bind");
    p && Ut(p.arg, "value") && i.onError(
      ot(
        61,
        p.loc
      )
    );
  }
  const { tag: h } = t, c = i.isCustomElement(h);
  if (h === "input" || h === "textarea" || h === "select" || c) {
    let p = lo, u = !1;
    if (h === "input" || c) {
      const g = Os(t, "type");
      if (g) {
        if (g.type === 7)
          p = rr;
        else if (g.value)
          switch (g.value.content) {
            case "radio":
              p = ao;
              break;
            case "checkbox":
              p = oo;
              break;
            case "file":
              u = !0, i.onError(
                ot(
                  60,
                  e.loc
                )
              );
              break;
            default:
              l();
              break;
          }
      } else Ru(t) ? p = rr : l();
    } else h === "select" ? p = co : l();
    u || (a.needRuntime = i.helper(p));
  } else
    i.onError(
      ot(
        58,
        e.loc
      )
    );
  return a.props = a.props.filter(
    (p) => !(p.key.type === 4 && p.key.content === "modelValue")
  ), a;
}, Wy = /* @__PURE__ */ Le("passive,once,capture"), Qy = /* @__PURE__ */ Le(
  // event propagation management
  "stop,prevent,self,ctrl,shift,alt,meta,exact,middle"
), $y = /* @__PURE__ */ Le("left,right"), xp = /* @__PURE__ */ Le("onkeyup,onkeydown,onkeypress"), Hy = (e, t, i, a) => {
  const l = [], h = [], c = [];
  for (let p = 0; p < t.length; p++) {
    const u = t[p].content;
    Wy(u) ? c.push(u) : $y(u) ? Ge(e) ? xp(e.content.toLowerCase()) ? l.push(u) : h.push(u) : (l.push(u), h.push(u)) : Qy(u) ? h.push(u) : l.push(u);
  }
  return {
    keyModifiers: l,
    nonKeyModifiers: h,
    eventOptionModifiers: c
  };
}, wc = (e, t) => Ge(e) && e.content.toLowerCase() === "onclick" ? z(t, !0) : e.type !== 4 ? Qe([
  "(",
  e,
  `) === "onClick" ? "${t}" : (`,
  e,
  ")"
]) : e, Yy = (e, t, i) => io(e, t, i, (a) => {
  const { modifiers: l } = e;
  if (!l.length) return a;
  let { key: h, value: c } = a.props[0];
  const { keyModifiers: p, nonKeyModifiers: u, eventOptionModifiers: g } = Hy(h, l, i, e.loc);
  if (u.includes("right") && (h = wc(h, "onContextmenu")), u.includes("middle") && (h = wc(h, "onMouseup")), u.length && (c = ve(i.helper(ho), [
    c,
    JSON.stringify(u)
  ])), p.length && // if event name is dynamic, always wrap with keys guard
  (!Ge(h) || xp(h.content.toLowerCase())) && (c = ve(i.helper(uo), [
    c,
    JSON.stringify(p)
  ])), g.length) {
    const b = g.map(rs).join("");
    h = Ge(h) ? z(`${h.content}${b}`, !0) : Qe(["(", h, `) + "${b}"`]);
  }
  return {
    props: [Ee(h, c)]
  };
}), Jy = (e, t, i) => {
  const { exp: a, loc: l } = e;
  return a || i.onError(
    ot(62, l)
  ), {
    props: [],
    needRuntime: i.helper(po)
  };
}, Xy = (e, t) => {
  if (e.type === 1 && e.tagType === 1 && t.isBuiltInComponent(e.tag) === Gr)
    return () => {
      if (!e.children.length)
        return;
      Ip(e) && t.onError(
        ot(
          63,
          {
            start: e.children[0].loc.start,
            end: e.children[e.children.length - 1].loc.end,
            source: ""
          }
        )
      );
      const a = e.children[0];
      if (a.type === 1)
        for (const l of a.props)
          l.type === 7 && l.name === "show" && e.props.push({
            type: 6,
            name: "persisted",
            nameLoc: e.loc,
            value: void 0,
            loc: e.loc
          });
    };
};
function Ip(e) {
  const t = e.children = e.children.filter(
    (a) => !Mr(a)
  ), i = t[0];
  return t.length !== 1 || i.type === 11 || i.type === 9 && i.branches.some(Ip);
}
const Zy = /__VUE_EXP_START__(.*?)__VUE_EXP_END__/g, qy = (e, t, i) => {
  if (t.scopes.vSlot > 0)
    return;
  const a = i.type === 1 && i.codegenNode && i.codegenNode.type === 13 && i.codegenNode.children && !$e(i.codegenNode.children) && i.codegenNode.children.type === 20;
  let l = 0, h = 0;
  const c = [], p = (g) => {
    if (l >= 20 || h >= 5) {
      const b = ve(t.helper(gr), [
        JSON.stringify(
          c.map((m) => Ao(m, t)).join("")
        ).replace(Zy, '" + $1 + "'),
        // the 2nd argument indicates the number of DOM nodes this static vnode
        // will insert / hydrate
        String(c.length)
      ]), A = c.length - 1;
      if (a)
        e.splice(
          g - c.length,
          c.length,
          // @ts-expect-error
          b
        );
      else if (c[0].codegenNode.value = b, c.length > 1) {
        e.splice(g - c.length + 1, A);
        const m = t.cached.indexOf(
          c[c.length - 1].codegenNode
        );
        if (m > -1) {
          for (let d = m; d < t.cached.length; d++) {
            const y = t.cached[d];
            y && (y.index -= A);
          }
          t.cached.splice(m - A + 1, A);
        }
      }
      return A;
    }
    return 0;
  };
  let u = 0;
  for (; u < e.length; u++) {
    const g = e[u];
    if (a || zy(g)) {
      const A = s1(g);
      if (A) {
        l += A[0], h += A[1], c.push(g);
        continue;
      }
    }
    u -= p(u), l = 0, h = 0, c.length = 0;
  }
  p(u);
}, zy = (e) => {
  if ((e.type === 1 && e.tagType === 0 || e.type === 12) && e.codegenNode && e.codegenNode.type === 20)
    return e.codegenNode;
}, e1 = /^(?:data|aria)-/, Cc = (e, t) => (t === 0 ? mA(e) : t === 1 ? AA(e) : t === 2 ? gA(e) : !1) || e1.test(e), t1 = /* @__PURE__ */ Le(
  "caption,thead,tr,th,tbody,td,tfoot,colgroup,col"
);
function s1(e) {
  if (e.type === 1 && t1(e.tag) || e.type === 1 && Be(e, "once", !0))
    return !1;
  if (e.type === 12)
    return [1, 0];
  let t = 1, i = e.props.length > 0 ? 1 : 0, a = !1;
  const l = () => (a = !0, !1);
  function h(c) {
    const p = c.tag === "option" && c.ns === 0;
    for (let u = 0; u < c.props.length; u++) {
      const g = c.props[u];
      if (g.type === 6 && !Cc(g.name, c.ns) || g.type === 7 && g.name === "bind" && (g.arg && (g.arg.type === 8 || g.arg.isStatic && !Cc(g.arg.content, c.ns)) || g.exp && (g.exp.type === 8 || g.exp.constType < 3) || p && Ut(g.arg, "value") && g.exp && !g.exp.isStatic))
        return l();
    }
    for (let u = 0; u < c.children.length; u++) {
      t++;
      const g = c.children[u];
      if (g.type === 1 && (g.props.length > 0 && i++, h(g), a))
        return !1;
    }
    return !0;
  }
  return h(e) ? [t, i] : !1;
}
function Ao(e, t) {
  if (le(e))
    return e;
  if (cs(e))
    return "";
  switch (e.type) {
    case 1:
      return i1(e, t);
    case 2:
      return qt(e.content);
    case 3:
      return `<!--${qt(e.content)}-->`;
    case 5:
      return qt(pr(is(e.content)));
    case 8:
      return qt(is(e));
    case 12:
      return Ao(e.content, t);
    default:
      return "";
  }
}
function i1(e, t) {
  let i = `<${e.tag}`, a = "";
  for (let l = 0; l < e.props.length; l++) {
    const h = e.props[l];
    if (h.type === 6)
      i += ` ${h.name}`, h.value && (i += `="${qt(h.value.content)}"`);
    else if (h.type === 7)
      if (h.name === "bind") {
        const c = h.exp;
        if (c.content[0] === "_") {
          i += ` ${h.arg.content}="__VUE_EXP_START__${c.content}__VUE_EXP_END__"`;
          continue;
        }
        if ((fA(h.arg.content) || h.arg.content === "hidden") && c.content === "false")
          continue;
        let p = is(c);
        if (p != null) {
          const u = h.arg && h.arg.content;
          if (u === "hidden" && typeof p == "number" && !dA(p))
            continue;
          u === "class" ? p = Zh(p) : u === "style" && (p = rA(Jh(p))), i += ` ${h.arg.content}="${qt(
            p
          )}"`;
        }
      } else h.name === "html" ? a = is(h.exp) : h.name === "text" && (a = qt(
        pr(is(h.exp))
      ));
  }
  if (t.scopeId && (i += ` ${t.scopeId}`), i += ">", a)
    i += a;
  else
    for (let l = 0; l < e.children.length; l++)
      i += Ao(e.children[l], t);
  return qh(e.tag) || (i += `</${e.tag}>`), i;
}
function is(e) {
  if (e.type === 4)
    return new Function(`return (${e.content})`)();
  {
    let t = "";
    return e.children.forEach((i) => {
      le(i) || cs(i) || (i.type === 2 ? t += i.content : i.type === 5 ? t += pr(is(i.content)) : t += is(i));
    }), t;
  }
}
const r1 = (e, t) => {
  e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && (t.onError(
    ot(
      64,
      e.loc
    )
  ), t.removeNode());
};
function n1(e, t) {
  return e === "template" ? !0 : e in vc ? vc[e].has(t) : t in Tc ? Tc[t].has(e) : !(e in Pc && Pc[e].has(t) || t in Nc && Nc[t].has(e));
}
const gs = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]), Jt = /* @__PURE__ */ new Set([]), vc = {
  head: /* @__PURE__ */ new Set([
    "base",
    "basefront",
    "bgsound",
    "link",
    "meta",
    "title",
    "noscript",
    "noframes",
    "style",
    "script",
    "template"
  ]),
  optgroup: /* @__PURE__ */ new Set(["option"]),
  select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
  // table
  table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
  tr: /* @__PURE__ */ new Set(["td", "th"]),
  colgroup: /* @__PURE__ */ new Set(["col"]),
  tbody: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["tr"]),
  tfoot: /* @__PURE__ */ new Set(["tr"]),
  // these elements can not have any children elements
  script: Jt,
  iframe: Jt,
  option: Jt,
  textarea: Jt,
  style: Jt,
  title: Jt
}, Tc = {
  // sections
  html: Jt,
  body: /* @__PURE__ */ new Set(["html"]),
  head: /* @__PURE__ */ new Set(["html"]),
  // table
  td: /* @__PURE__ */ new Set(["tr"]),
  colgroup: /* @__PURE__ */ new Set(["table"]),
  caption: /* @__PURE__ */ new Set(["table"]),
  tbody: /* @__PURE__ */ new Set(["table"]),
  tfoot: /* @__PURE__ */ new Set(["table"]),
  col: /* @__PURE__ */ new Set(["colgroup"]),
  th: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["table"]),
  tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
  // data list
  dd: /* @__PURE__ */ new Set(["dl", "div"]),
  dt: /* @__PURE__ */ new Set(["dl", "div"]),
  // other
  figcaption: /* @__PURE__ */ new Set(["figure"]),
  // li: new Set(["ul", "ol"]),
  summary: /* @__PURE__ */ new Set(["details"]),
  area: /* @__PURE__ */ new Set(["map"])
}, Pc = {
  p: /* @__PURE__ */ new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "center",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "fieldset",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "menu",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul"
  ]),
  svg: /* @__PURE__ */ new Set([
    "b",
    "blockquote",
    "br",
    "code",
    "dd",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "menu",
    "meta",
    "ol",
    "p",
    "pre",
    "ruby",
    "s",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "table",
    "u",
    "ul",
    "var"
  ])
}, Nc = {
  a: /* @__PURE__ */ new Set(["a"]),
  button: /* @__PURE__ */ new Set(["button"]),
  dd: /* @__PURE__ */ new Set(["dd", "dt"]),
  dt: /* @__PURE__ */ new Set(["dd", "dt"]),
  form: /* @__PURE__ */ new Set(["form"]),
  li: /* @__PURE__ */ new Set(["li"]),
  h1: gs,
  h2: gs,
  h3: gs,
  h4: gs,
  h5: gs,
  h6: gs
}, a1 = (e, t) => {
  if (e.type === 1 && e.tagType === 0 && t.parent && t.parent.type === 1 && t.parent.tagType === 0 && !n1(t.parent.tag, e.tag)) {
    const i = new SyntaxError(
      `<${e.tag}> cannot be child of <${t.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`
    );
    i.loc = e.loc, t.onWarn(i);
  }
}, go = [
  Sp,
  Xy,
  a1
], yo = {
  cloak: yp,
  html: Gy,
  text: Ky,
  model: jy,
  // override compiler-core
  on: Yy,
  // override compiler-core
  show: Jy
};
function o1(e, t = {}) {
  return gp(
    e,
    bt({}, oi, t, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        r1,
        ...go,
        ...t.nodeTransforms || []
      ],
      directiveTransforms: bt(
        {},
        yo,
        t.directiveTransforms || {}
      ),
      transformHoist: qy
    })
  );
}
function l1(e, t = {}) {
  return qa(e, bt({}, oi, t));
}
var Ep = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BASE_TRANSITION: Pa,
  BindingTypes: Fy,
  CAMELIZE: Ji,
  CAPITALIZE: su,
  CREATE_BLOCK: Na,
  CREATE_COMMENT: Bs,
  CREATE_ELEMENT_BLOCK: ka,
  CREATE_ELEMENT_VNODE: mr,
  CREATE_SLOTS: _a,
  CREATE_STATIC: gr,
  CREATE_TEXT: Ar,
  CREATE_VNODE: dr,
  CompilerDeprecationTypes: gg,
  ConstantTypes: EA,
  DOMDirectiveTransforms: yo,
  DOMErrorCodes: Vy,
  DOMErrorMessages: mo,
  DOMNodeTransforms: go,
  ElementTypes: IA,
  ErrorCodes: Ig,
  FRAGMENT: Ps,
  GUARD_REACTIVE_PROPS: Ls,
  IS_MEMO_SAME: Da,
  IS_REF: ii,
  KEEP_ALIVE: qs,
  MERGE_PROPS: ei,
  NORMALIZE_CLASS: Er,
  NORMALIZE_PROPS: Ns,
  NORMALIZE_STYLE: br,
  Namespaces: SA,
  NodeTypes: xA,
  OPEN_BLOCK: Vt,
  POP_SCOPE_ID: ru,
  PUSH_SCOPE_ID: iu,
  RENDER_LIST: Ir,
  RENDER_SLOT: Oa,
  RESOLVE_COMPONENT: zs,
  RESOLVE_DIRECTIVE: Sr,
  RESOLVE_DYNAMIC_COMPONENT: yr,
  RESOLVE_FILTER: tu,
  SET_BLOCK_TRACKING: ti,
  SUSPENSE: fr,
  TELEPORT: ws,
  TO_DISPLAY_STRING: hi,
  TO_HANDLERS: wr,
  TO_HANDLER_KEY: Xi,
  TRANSITION: Gr,
  TRANSITION_GROUP: fo,
  TS_NODE_TYPES: Wa,
  UNREF: si,
  V_MODEL_CHECKBOX: oo,
  V_MODEL_DYNAMIC: rr,
  V_MODEL_RADIO: ao,
  V_MODEL_SELECT: co,
  V_MODEL_TEXT: lo,
  V_ON_WITH_KEYS: uo,
  V_ON_WITH_MODIFIERS: ho,
  V_SHOW: po,
  WITH_CTX: Cr,
  WITH_DIRECTIVES: xr,
  WITH_MEMO: vr,
  advancePositionWithClone: da,
  advancePositionWithMutation: Ya,
  assert: ma,
  baseCompile: gp,
  baseParse: qa,
  buildDirectiveArgs: fp,
  buildProps: so,
  buildSlots: cp,
  checkCompatEnabled: xg,
  compile: o1,
  convertToBlock: Pr,
  createArrayExpression: Ft,
  createAssignmentExpression: vA,
  createBlockStatement: au,
  createCacheExpression: nu,
  createCallExpression: ve,
  createCompilerError: he,
  createCompoundExpression: Qe,
  createConditionalExpression: Zi,
  createDOMCompilerError: ot,
  createForLoopParams: ir,
  createFunctionExpression: ns,
  createIfStatement: CA,
  createInterpolation: bA,
  createObjectExpression: it,
  createObjectProperty: Ee,
  createReturnStatement: PA,
  createRoot: Tr,
  createSequenceExpression: TA,
  createSimpleExpression: z,
  createStructuralDirectiveTransform: za,
  createTemplateLiteral: wA,
  createTransformContext: Hu,
  createVNodeCall: ks,
  errorMessages: Ua,
  extractIdentifiers: ht,
  findDir: Be,
  findProp: Os,
  forAliasRE: Fu,
  generate: zu,
  generateCodeFrame: eA,
  getBaseTransformPreset: no,
  getConstantType: qe,
  getMemoedVNodeCall: Mu,
  getVNodeBlockHelper: os,
  getVNodeHelper: as,
  hasDynamicKeyVBind: Ru,
  hasScopeRef: Fe,
  helperNameMap: Ze,
  injectProp: ni,
  isAllWhitespace: Xa,
  isCommentOrWhitespace: Mr,
  isCoreComponent: Qa,
  isFnExpression: Lu,
  isFnExpressionBrowser: Dg,
  isFnExpressionNode: Bu,
  isFunctionType: Ou,
  isInDestructureAssignment: tr,
  isInNewExpression: vu,
  isMemberExpression: Ha,
  isMemberExpressionBrowser: Og,
  isMemberExpressionNode: Du,
  isReferencedIdentifier: Cu,
  isSimpleIdentifier: mt,
  isSlotOutlet: ri,
  isStaticArgOf: Ut,
  isStaticExp: Ge,
  isStaticProperty: ja,
  isStaticPropertyKey: _u,
  isTemplateNode: _s,
  isText: Fi,
  isVPre: Aa,
  isVSlot: Lr,
  isWhitespaceText: Rr,
  locStub: Pe,
  noopDirectiveTransform: yp,
  parse: l1,
  parserOptions: oi,
  processExpression: Ye,
  processFor: ap,
  processIf: np,
  processSlotOutlet: dp,
  registerRuntimeHelpers: Ba,
  resolveComponentType: pp,
  stringifyExpression: eo,
  toValidAssetId: ai,
  trackSlotScopes: op,
  trackVForSlotScopes: lp,
  transform: Yu,
  transformBind: mp,
  transformElement: up,
  transformExpression: rp,
  transformModel: ro,
  transformOn: io,
  transformStyle: Sp,
  transformVBindShorthand: Ap,
  traverseNode: ui,
  unwrapTSNode: Dr,
  validFirstIdentCharRE: $a,
  walkBlockDeclarations: Ka,
  walkFunctionParams: Tu,
  walkIdentifiers: Ga,
  warnDeprecation: bu
});
function c1(e) {
  return e = e.trim(), e[0] === "'" && e[e.length - 1] === "'" || e[0] === '"' && e[e.length - 1] === '"' ? e.slice(1, -1) : e;
}
const h1 = /v-bind\s*\(/g;
function u1(e) {
  const t = [];
  return e.styles.forEach((i) => {
    let a;
    const l = p1(i.content);
    for (; a = h1.exec(l); ) {
      const h = a.index + a[0].length, c = y1(l, h);
      if (c !== null) {
        const p = c1(l.slice(h, c));
        t.includes(p) || t.push(p);
      }
    }
  }), t;
}
const Oi = /[/"'\\(]/g;
function p1(e) {
  const t = e.length;
  let i = "", a = 0, l = 0;
  for (Oi.lastIndex = 0; Oi.test(e); ) {
    l = Oi.lastIndex - 1;
    const h = e.charCodeAt(l);
    if (h === 47) {
      const c = e.charCodeAt(l + 1);
      if (c === 42) {
        i += e.slice(a, l);
        const p = e.indexOf("*/", l + 2);
        l = a = p === -1 ? t : p + 2;
      } else if (c === 47) {
        for (i += e.slice(a, l), l += 2; l < t && !So(e.charCodeAt(l)); ) l++;
        a = l;
      } else
        l++;
    } else h === 34 || h === 39 ? l = f1(e, l + 1, h) : h === 92 ? l += 2 : d1(e, l) ? l = m1(e, l + 1) : l++;
    Oi.lastIndex = l;
  }
  return a === 0 ? e : i + e.slice(a);
}
function f1(e, t, i) {
  for (; t < e.length; ) {
    const a = e.charCodeAt(t);
    if (a === i) return t + 1;
    if (So(a)) return t;
    a === 92 ? t += e.charCodeAt(t + 1) === 13 && e.charCodeAt(t + 2) === 10 ? 3 : 2 : t++;
  }
  return t;
}
function d1(e, t) {
  const i = e.charCodeAt(t - 4);
  return (e.charCodeAt(t - 3) | 32) === 117 && (e.charCodeAt(t - 2) | 32) === 114 && (e.charCodeAt(t - 1) | 32) === 108 && i !== 92 && !A1(i);
}
function m1(e, t) {
  for (; g1(e.charCodeAt(t)); ) t++;
  const i = e.charCodeAt(t);
  if (i === 34 || i === 39) return t;
  for (; t < e.length; ) {
    const a = e.charCodeAt(t);
    if (a === 41) return t + 1;
    t += a === 92 ? 2 : 1;
  }
  return t;
}
function A1(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || e === 45 || e === 95 || e >= 128;
}
function So(e) {
  return e === 10 || e === 13;
}
function g1(e) {
  return e === 32 || e === 9 || e === 12 || So(e);
}
function y1(e, t) {
  let i = 0, a = 0;
  for (let l = t; l < e.length; l++) {
    const h = e.charAt(l);
    switch (i) {
      case 0:
        if (h === "'")
          i = 1;
        else if (h === '"')
          i = 2;
        else if (h === "(")
          a++;
        else if (h === ")")
          if (a > 0)
            a--;
          else
            return l;
        break;
      case 1:
        h === "'" && (i = 0);
        break;
      case 2:
        h === '"' && (i = 0);
        break;
    }
  }
  return null;
}
function bp() {
  throw new Error("setTimeout has not been defined");
}
function wp() {
  throw new Error("clearTimeout has not been defined");
}
var Bt = bp, Lt = wp;
typeof ls.setTimeout == "function" && (Bt = setTimeout);
typeof ls.clearTimeout == "function" && (Lt = clearTimeout);
function Cp(e) {
  if (Bt === setTimeout)
    return setTimeout(e, 0);
  if ((Bt === bp || !Bt) && setTimeout)
    return Bt = setTimeout, setTimeout(e, 0);
  try {
    return Bt(e, 0);
  } catch {
    try {
      return Bt.call(null, e, 0);
    } catch {
      return Bt.call(this, e, 0);
    }
  }
}
function S1(e) {
  if (Lt === clearTimeout)
    return clearTimeout(e);
  if ((Lt === wp || !Lt) && clearTimeout)
    return Lt = clearTimeout, clearTimeout(e);
  try {
    return Lt(e);
  } catch {
    try {
      return Lt.call(null, e);
    } catch {
      return Lt.call(this, e);
    }
  }
}
var It = [], Cs = !1, ts, Wi = -1;
function x1() {
  !Cs || !ts || (Cs = !1, ts.length ? It = ts.concat(It) : Wi = -1, It.length && vp());
}
function vp() {
  if (!Cs) {
    var e = Cp(x1);
    Cs = !0;
    for (var t = It.length; t; ) {
      for (ts = It, It = []; ++Wi < t; )
        ts && ts[Wi].run();
      Wi = -1, t = It.length;
    }
    ts = null, Cs = !1, S1(e);
  }
}
function I1(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var i = 1; i < arguments.length; i++)
      t[i - 1] = arguments[i];
  It.push(new Tp(e, t)), It.length === 1 && !Cs && Cp(vp);
}
function Tp(e, t) {
  this.fun = e, this.array = t;
}
Tp.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var E1 = "browser", b1 = "browser", w1 = !0, C1 = {}, v1 = [], T1 = "", P1 = {}, N1 = {}, k1 = {};
function hs() {
}
var O1 = hs, _1 = hs, D1 = hs, B1 = hs, L1 = hs, R1 = hs, M1 = hs;
function F1(e) {
  throw new Error("process.binding is not supported");
}
function U1() {
  return "/";
}
function V1(e) {
  throw new Error("process.chdir is not supported");
}
function G1() {
  return 0;
}
var Ss = ls.performance || {}, K1 = Ss.now || Ss.mozNow || Ss.msNow || Ss.oNow || Ss.webkitNow || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function j1(e) {
  var t = K1.call(Ss) * 1e-3, i = Math.floor(t), a = Math.floor(t % 1 * 1e9);
  return e && (i = i - e[0], a = a - e[1], a < 0 && (i--, a += 1e9)), [i, a];
}
var W1 = /* @__PURE__ */ new Date();
function Q1() {
  var e = /* @__PURE__ */ new Date(), t = e - W1;
  return t / 1e3;
}
var Gt = {
  nextTick: I1,
  title: E1,
  browser: w1,
  env: C1,
  argv: v1,
  version: T1,
  versions: P1,
  on: O1,
  addListener: _1,
  once: D1,
  off: B1,
  removeListener: L1,
  removeAllListeners: R1,
  emit: M1,
  binding: F1,
  cwd: U1,
  chdir: V1,
  umask: G1,
  hrtime: j1,
  platform: b1,
  release: N1,
  config: k1,
  uptime: Q1
};
function Pp(e = 500) {
  return /* @__PURE__ */ new Map();
}
var $1 = Object.defineProperty, H1 = Object.defineProperties, Y1 = Object.getOwnPropertyDescriptors, kc = Object.getOwnPropertySymbols, J1 = Object.prototype.hasOwnProperty, X1 = Object.prototype.propertyIsEnumerable, Oc = (e, t, i) => t in e ? $1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Z1 = (e, t) => {
  for (var i in t || (t = {}))
    J1.call(t, i) && Oc(e, i, t[i]);
  if (kc)
    for (var i of kc(t))
      X1.call(t, i) && Oc(e, i, t[i]);
  return e;
}, q1 = (e, t) => H1(e, Y1(t));
function z1(e, t) {
  if (!e?.transformed)
    return e;
  const { compiler: i = Ep, compilerOptions: a, onError: l } = t, c = i.parse(e.source, q1(Z1({
    prefixIdentifiers: !0
  }, a), {
    parseMode: "sfc",
    onError: l
  })).children.find(
    (p) => p.type === 1 && p.tag === "template"
  );
  return Tr(c.children, e.source);
}
function eS(e, t, i) {
  return tS(t).has(e);
}
const _c = Pp();
function tS(e, t) {
  return sS(e, !0).usedIds;
}
function sS(e, t = !0, i) {
  const { content: a, ast: l } = e.template, h = _c.get(a);
  if (h && (!t || h.usedIds))
    return h;
  const c = t ? /* @__PURE__ */ new Set() : void 0, p = /* @__PURE__ */ new Set();
  z1(l, {
    compiler: void 0,
    compilerOptions: void 0,
    // ignore errors since they were already reported by the SFC parser
    onError: () => {
    }
  }).children.forEach(g);
  function g(A) {
    var m;
    switch (A.type) {
      case 1:
        let d = A.tag;
        d.includes(".") && (d = d.split(".")[0].trim()), !oi.isNativeTag(d) && !oi.isBuiltInComponent(d) && c && (c.add(He(d)), c.add(rs(He(d))));
        for (let y = 0; y < A.props.length; y++) {
          const I = A.props[y];
          if (I.type === 7) {
            if (c && (Hh(I.name) || c.add(`v${rs(He(I.name))}`)), I.name === "model") {
              const w = I.exp;
              if (w && w.type === 4) {
                const v = w.content.trim();
                mt(v) && v !== "undefined" && p.add(v);
              }
            }
            c && I.arg && !I.arg.isStatic && _i(c, I.arg), c && (I.name === "for" ? _i(c, I.forParseResult.source) : I.exp ? _i(c, I.exp) : I.name === "bind" && !I.exp && c.add(He(I.arg.content)));
          }
          c && I.type === 6 && I.name === "ref" && ((m = I.value) != null && m.content) && c.add(I.value.content);
        }
        A.children.forEach(g);
        break;
      case 5:
        c && _i(c, A.content);
        break;
    }
  }
  const b = { usedIds: c, vModelIds: p };
  return _c.set(a, b), b;
}
function _i(e, t) {
  t.ast ? Ga(t.ast, (i) => e.add(i.name)) : t.ast === null && e.add(t.content);
}
var iS = Object.defineProperty, rS = Object.defineProperties, nS = Object.getOwnPropertyDescriptors, Dc = Object.getOwnPropertySymbols, aS = Object.prototype.hasOwnProperty, oS = Object.prototype.propertyIsEnumerable, Bc = (e, t, i) => t in e ? iS(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Lc = (e, t) => {
  for (var i in t || (t = {}))
    aS.call(t, i) && Bc(e, i, t[i]);
  if (Dc)
    for (var i of Dc(t))
      oS.call(t, i) && Bc(e, i, t[i]);
  return e;
}, Rc = (e, t) => rS(e, nS(t));
const lS = "anonymous.vue", Mc = Pp();
function cS(e, t = {}) {
  var i;
  const a = Zm(e, Rc(Lc({}, t), {
    compiler: { parse: (i = t.compiler) == null ? void 0 : i.parse }
  })), l = Mc.get(a);
  if (l)
    return l;
  const {
    sourceMap: h = !0,
    filename: c = lS,
    sourceRoot: p = "",
    pad: u = !1,
    ignoreEmpty: g = !0,
    compiler: b = Ep,
    templateParseOptions: A = {}
  } = t, m = {
    filename: c,
    source: e,
    template: null,
    script: null,
    scriptSetup: null,
    styles: [],
    customBlocks: [],
    cssVars: [],
    slotted: !1,
    shouldForceReload: (S) => AS(S, m)
  }, d = [];
  b.parse(e, Rc(Lc({
    parseMode: "sfc",
    prefixIdentifiers: !0
  }, A), {
    onError: (S) => {
      d.push(S);
    }
  })).children.forEach((S) => {
    if (S.type === 1 && !(g && S.tag !== "template" && mS(S) && !dS(S)))
      switch (S.tag) {
        case "template":
          if (m.template)
            d.push(Fc(S));
          else {
            const L = m.template = Di(
              S,
              e,
              !1
            );
            if (L.attrs.src || (L.ast = Tr(S.children, e)), L.attrs.functional) {
              const F = new SyntaxError(
                "<template functional> is no longer supported in Vue 3, since functional components no longer have significant performance difference from stateful ones. Just use a normal <template> instead."
              );
              F.loc = S.props.find(
                (k) => k.type === 6 && k.name === "functional"
              ).loc, d.push(F);
            }
          }
          break;
        case "script":
          const P = Di(S, e, u), M = !!P.attrs.setup;
          if (M && !m.scriptSetup) {
            m.scriptSetup = P;
            break;
          }
          if (!M && !m.script) {
            m.script = P;
            break;
          }
          d.push(Fc(S, M));
          break;
        case "style":
          const R = Di(S, e, u);
          R.attrs.vars && d.push(
            new SyntaxError(
              "<style vars> has been replaced by a new proposal: https://github.com/vuejs/rfcs/pull/231"
            )
          ), m.styles.push(R);
          break;
        default:
          m.customBlocks.push(Di(S, e, u));
          break;
      }
  }), !m.template && !m.script && !m.scriptSetup && d.push(
    new SyntaxError(
      `At least one <template> or <script> is required in a single file component. ${m.filename}`
    )
  ), m.scriptSetup && (m.scriptSetup.src && (d.push(
    new SyntaxError(
      '<script setup> cannot use the "src" attribute because its syntax will be ambiguous outside of the component.'
    )
  ), m.scriptSetup = null), m.script && m.script.src && (d.push(
    new SyntaxError(
      '<script> cannot use the "src" attribute when <script setup> is also present because they must be processed together.'
    )
  ), m.script = null));
  let I = 0;
  if (m.template && (m.template.lang === "pug" || m.template.lang === "jade") && ([m.template.content, I] = gS(
    m.template.content
  )), h) {
    const S = (P, M = 0) => {
      P && !P.src && (P.map = pS(
        c,
        e,
        P.content,
        p,
        !u || P.type === "template" ? P.loc.start.line - 1 : 0,
        M
      ));
    };
    S(m.template, I), S(m.script), m.styles.forEach((P) => S(P)), m.customBlocks.forEach((P) => S(P));
  }
  m.cssVars = u1(m);
  const w = /(?:::v-|:)slotted\(/;
  m.slotted = m.styles.some(
    (S) => S.scoped && w.test(S.content)
  );
  const v = {
    descriptor: m,
    errors: d
  };
  return Mc.set(a, v), v;
}
function Fc(e, t = !1) {
  const i = new SyntaxError(
    `Single file component can contain only one <${e.tag}${t ? " setup" : ""}> element`
  );
  return i.loc = e.loc, i;
}
function Di(e, t, i) {
  const a = e.tag, l = e.innerLoc, h = {}, c = {
    type: a,
    content: t.slice(l.start.offset, l.end.offset),
    loc: l,
    attrs: h
  };
  return i && (c.content = fS(t, c, i) + c.content), e.props.forEach((p) => {
    if (p.type === 6) {
      const u = p.name;
      h[u] = p.value && p.value.content || !0, u === "lang" ? c.lang = p.value && p.value.content : u === "src" ? c.src = p.value && p.value.content : a === "style" ? u === "scoped" ? c.scoped = !0 : u === "module" && (c.module = h[u]) : a === "script" && u === "setup" && (c.setup = h.setup);
    }
  }), c;
}
const Np = /\r?\n/g, hS = /^(?:\/\/)?\s*$/, uS = /./g;
function pS(e, t, i, a, l, h) {
  const c = new qu.SourceMapGenerator({
    file: e.replace(/\\/g, "/"),
    sourceRoot: a.replace(/\\/g, "/")
  });
  return c.setSourceContent(e, t), c._sources.add(e), i.split(Np).forEach((p, u) => {
    if (!hS.test(p)) {
      const g = u + 1 + l, b = u + 1;
      for (let A = 0; A < p.length; A++)
        /\s/.test(p[A]) || c._mappings.add({
          originalLine: g,
          originalColumn: A + h,
          generatedLine: b,
          generatedColumn: A,
          source: e,
          name: null
        });
    }
  }), c.toJSON();
}
function fS(e, t, i) {
  if (e = e.slice(0, t.loc.start.offset), i === "space")
    return e.replace(uS, " ");
  {
    const a = e.split(Np).length, l = t.type === "script" && !t.lang ? `//
` : `
`;
    return Array(a).join(l);
  }
}
function dS(e) {
  return e.props.some((t) => t.type !== 6 ? !1 : t.name === "src");
}
function mS(e) {
  for (let t = 0; t < e.children.length; t++) {
    const i = e.children[t];
    if (i.type !== 2 || i.content.trim() !== "")
      return !1;
  }
  return !0;
}
function AS(e, t) {
  if (!t.scriptSetup || t.scriptSetup.lang !== "ts" && t.scriptSetup.lang !== "tsx")
    return !1;
  for (const i in e)
    if (!e[i].isUsedInTemplate && eS(i, t))
      return !0;
  return !1;
}
function gS(e) {
  const t = e.split(`
`), i = t.reduce(function(a, l) {
    var h, c;
    if (l.trim() === "")
      return a;
    const p = ((c = (h = l.match(/^\s*/)) == null ? void 0 : h[0]) == null ? void 0 : c.length) || 0;
    return Math.min(p, a);
  }, 1 / 0);
  return i === 0 ? [e, i] : [
    t.map(function(a) {
      return a.slice(i);
    }).join(`
`),
    i
  ];
}
function kp(e, t) {
  for (var i = 0, a = e.length - 1; a >= 0; a--) {
    var l = e[a];
    l === "." ? e.splice(a, 1) : l === ".." ? (e.splice(a, 1), i++) : i && (e.splice(a, 1), i--);
  }
  if (t)
    for (; i--; i)
      e.unshift("..");
  return e;
}
var yS = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, xo = function(e) {
  return yS.exec(e).slice(1);
};
function nr() {
  for (var e = "", t = !1, i = arguments.length - 1; i >= -1 && !t; i--) {
    var a = i >= 0 ? arguments[i] : "/";
    if (typeof a != "string")
      throw new TypeError("Arguments to path.resolve must be strings");
    if (!a)
      continue;
    e = a + "/" + e, t = a.charAt(0) === "/";
  }
  return e = kp(bo(e.split("/"), function(l) {
    return !!l;
  }), !t).join("/"), (t ? "/" : "") + e || ".";
}
function Io(e) {
  var t = Eo(e), i = SS(e, -1) === "/";
  return e = kp(bo(e.split("/"), function(a) {
    return !!a;
  }), !t).join("/"), !e && !t && (e = "."), e && i && (e += "/"), (t ? "/" : "") + e;
}
function Eo(e) {
  return e.charAt(0) === "/";
}
function Op() {
  var e = Array.prototype.slice.call(arguments, 0);
  return Io(bo(e, function(t, i) {
    if (typeof t != "string")
      throw new TypeError("Arguments to path.join must be strings");
    return t;
  }).join("/"));
}
function _p(e, t) {
  e = nr(e).substr(1), t = nr(t).substr(1);
  function i(g) {
    for (var b = 0; b < g.length && g[b] === ""; b++)
      ;
    for (var A = g.length - 1; A >= 0 && g[A] === ""; A--)
      ;
    return b > A ? [] : g.slice(b, A - b + 1);
  }
  for (var a = i(e.split("/")), l = i(t.split("/")), h = Math.min(a.length, l.length), c = h, p = 0; p < h; p++)
    if (a[p] !== l[p]) {
      c = p;
      break;
    }
  for (var u = [], p = c; p < a.length; p++)
    u.push("..");
  return u = u.concat(l.slice(c)), u.join("/");
}
var Dp = "/", Bp = ":";
function Lp(e) {
  var t = xo(e), i = t[0], a = t[1];
  return !i && !a ? "." : (a && (a = a.substr(0, a.length - 1)), i + a);
}
function Rp(e, t) {
  var i = xo(e)[2];
  return t && i.substr(-1 * t.length) === t && (i = i.substr(0, i.length - t.length)), i;
}
function Mp(e) {
  return xo(e)[3];
}
var li = {
  extname: Mp,
  basename: Rp,
  dirname: Lp,
  sep: Dp,
  delimiter: Bp,
  relative: _p,
  join: Op,
  isAbsolute: Eo,
  normalize: Io,
  resolve: nr
};
function bo(e, t) {
  if (e.filter) return e.filter(t);
  for (var i = [], a = 0; a < e.length; a++)
    t(e[a], a, e) && i.push(e[a]);
  return i;
}
var SS = "ab".substr(-1) === "b" ? function(e, t, i) {
  return e.substr(t, i);
} : function(e, t, i) {
  return t < 0 && (t = e.length + t), e.substr(t, i);
}, xS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  basename: Rp,
  default: li,
  delimiter: Bp,
  dirname: Lp,
  extname: Mp,
  isAbsolute: Eo,
  join: Op,
  normalize: Io,
  relative: _p,
  resolve: nr,
  sep: Dp
});
/*! https://mths.be/punycode v1.4.1 by @mathias */
var bn = 2147483647, Xs = 36, Fp = 1, Ea = 26, IS = 38, ES = 700, bS = 72, wS = 128, CS = "-", vS = /[^\x20-\x7E]/, TS = /[\x2E\u3002\uFF0E\uFF61]/g, PS = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, wn = Xs - Fp, Is = Math.floor, Cn = String.fromCharCode;
function Uc(e) {
  throw new RangeError(PS[e]);
}
function NS(e, t) {
  for (var i = e.length, a = []; i--; )
    a[i] = t(e[i]);
  return a;
}
function kS(e, t) {
  var i = e.split("@"), a = "";
  i.length > 1 && (a = i[0] + "@", e = i[1]), e = e.replace(TS, ".");
  var l = e.split("."), h = NS(l, t).join(".");
  return a + h;
}
function OS(e) {
  for (var t = [], i = 0, a = e.length, l, h; i < a; )
    l = e.charCodeAt(i++), l >= 55296 && l <= 56319 && i < a ? (h = e.charCodeAt(i++), (h & 64512) == 56320 ? t.push(((l & 1023) << 10) + (h & 1023) + 65536) : (t.push(l), i--)) : t.push(l);
  return t;
}
function Vc(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}
function _S(e, t, i) {
  var a = 0;
  for (e = i ? Is(e / ES) : e >> 1, e += Is(e / t); e > wn * Ea >> 1; a += Xs)
    e = Is(e / wn);
  return Is(a + (wn + 1) * e / (e + IS));
}
function DS(e) {
  var t, i, a, l, h, c, p, u, g, b, A, m = [], d, y, I, w;
  for (e = OS(e), d = e.length, t = wS, i = 0, h = bS, c = 0; c < d; ++c)
    A = e[c], A < 128 && m.push(Cn(A));
  for (a = l = m.length, l && m.push(CS); a < d; ) {
    for (p = bn, c = 0; c < d; ++c)
      A = e[c], A >= t && A < p && (p = A);
    for (y = a + 1, p - t > Is((bn - i) / y) && Uc("overflow"), i += (p - t) * y, t = p, c = 0; c < d; ++c)
      if (A = e[c], A < t && ++i > bn && Uc("overflow"), A == t) {
        for (u = i, g = Xs; b = g <= h ? Fp : g >= h + Ea ? Ea : g - h, !(u < b); g += Xs)
          w = u - b, I = Xs - b, m.push(
            Cn(Vc(b + w % I, 0))
          ), u = Is(w / I);
        m.push(Cn(Vc(u, 0))), h = _S(i, y, a == l), i = 0, ++a;
      }
    ++i, ++t;
  }
  return m.join("");
}
function BS(e) {
  return kS(e, function(t) {
    return vS.test(t) ? "xn--" + DS(t) : t;
  });
}
var LS = Object.getOwnPropertyDescriptors || function(t) {
  for (var i = Object.keys(t), a = {}, l = 0; l < i.length; l++)
    a[i[l]] = Object.getOwnPropertyDescriptor(t, i[l]);
  return a;
};
function vs(e, t) {
  var i = {
    seen: [],
    stylize: MS
  };
  return arguments.length >= 3 && (i.depth = arguments[2]), arguments.length >= 4 && (i.colors = arguments[3]), Up(t) ? i.showHidden = t : t && QS(i, t), bs(i.showHidden) && (i.showHidden = !1), bs(i.depth) && (i.depth = 2), bs(i.colors) && (i.colors = !1), bs(i.customInspect) && (i.customInspect = !0), i.colors && (i.stylize = RS), ar(i, e, i.depth);
}
vs.colors = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39]
};
vs.styles = {
  special: "cyan",
  number: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  date: "magenta",
  // "name": intentionally not styling
  regexp: "red"
};
function RS(e, t) {
  var i = vs.styles[t];
  return i ? "\x1B[" + vs.colors[i][0] + "m" + e + "\x1B[" + vs.colors[i][1] + "m" : e;
}
function MS(e, t) {
  return e;
}
function FS(e) {
  var t = {};
  return e.forEach(function(i, a) {
    t[i] = !0;
  }), t;
}
function ar(e, t, i) {
  if (e.customInspect && t && Nn(t.inspect) && // Filter out the util module, it's inspect function is special
  t.inspect !== vs && // Also filter out any prototype objects using the circular check.
  !(t.constructor && t.constructor.prototype === t)) {
    var a = t.inspect(i, e);
    return fi(a) || (a = ar(e, a, i)), a;
  }
  var l = US(e, t);
  if (l)
    return l;
  var h = Object.keys(t), c = FS(h);
  if (e.showHidden && (h = Object.getOwnPropertyNames(t)), Pn(t) && (h.indexOf("message") >= 0 || h.indexOf("description") >= 0))
    return vn(t);
  if (h.length === 0) {
    if (Nn(t)) {
      var p = t.name ? ": " + t.name : "";
      return e.stylize("[Function" + p + "]", "special");
    }
    if (Tn(t))
      return e.stylize(RegExp.prototype.toString.call(t), "regexp");
    if (Gc(t))
      return e.stylize(Date.prototype.toString.call(t), "date");
    if (Pn(t))
      return vn(t);
  }
  var u = "", g = !1, b = ["{", "}"];
  if (KS(t) && (g = !0, b = ["[", "]"]), Nn(t)) {
    var A = t.name ? ": " + t.name : "";
    u = " [Function" + A + "]";
  }
  if (Tn(t) && (u = " " + RegExp.prototype.toString.call(t)), Gc(t) && (u = " " + Date.prototype.toUTCString.call(t)), Pn(t) && (u = " " + vn(t)), h.length === 0 && (!g || t.length == 0))
    return b[0] + u + b[1];
  if (i < 0)
    return Tn(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
  e.seen.push(t);
  var m;
  return g ? m = VS(e, t, i, c, h) : m = h.map(function(d) {
    return ba(e, t, i, c, d, g);
  }), e.seen.pop(), GS(m, u, b);
}
function US(e, t) {
  if (bs(t))
    return e.stylize("undefined", "undefined");
  if (fi(t)) {
    var i = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return e.stylize(i, "string");
  }
  if (WS(t))
    return e.stylize("" + t, "number");
  if (Up(t))
    return e.stylize("" + t, "boolean");
  if (Es(t))
    return e.stylize("null", "null");
}
function vn(e) {
  return "[" + Error.prototype.toString.call(e) + "]";
}
function VS(e, t, i, a, l) {
  for (var h = [], c = 0, p = t.length; c < p; ++c)
    Vp(t, String(c)) ? h.push(ba(
      e,
      t,
      i,
      a,
      String(c),
      !0
    )) : h.push("");
  return l.forEach(function(u) {
    u.match(/^\d+$/) || h.push(ba(
      e,
      t,
      i,
      a,
      u,
      !0
    ));
  }), h;
}
function ba(e, t, i, a, l, h) {
  var c, p, u;
  if (u = Object.getOwnPropertyDescriptor(t, l) || { value: t[l] }, u.get ? u.set ? p = e.stylize("[Getter/Setter]", "special") : p = e.stylize("[Getter]", "special") : u.set && (p = e.stylize("[Setter]", "special")), Vp(a, l) || (c = "[" + l + "]"), p || (e.seen.indexOf(u.value) < 0 ? (Es(i) ? p = ar(e, u.value, null) : p = ar(e, u.value, i - 1), p.indexOf(`
`) > -1 && (h ? p = p.split(`
`).map(function(g) {
    return "  " + g;
  }).join(`
`).substr(2) : p = `
` + p.split(`
`).map(function(g) {
    return "   " + g;
  }).join(`
`))) : p = e.stylize("[Circular]", "special")), bs(c)) {
    if (h && l.match(/^\d+$/))
      return p;
    c = JSON.stringify("" + l), c.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (c = c.substr(1, c.length - 2), c = e.stylize(c, "name")) : (c = c.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), c = e.stylize(c, "string"));
  }
  return c + ": " + p;
}
function GS(e, t, i) {
  var a = e.reduce(function(l, h) {
    return h.indexOf(`
`) >= 0, l + h.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return a > 60 ? i[0] + (t === "" ? "" : t + `
 `) + " " + e.join(`,
  `) + " " + i[1] : i[0] + t + " " + e.join(", ") + " " + i[1];
}
function KS(e) {
  return Array.isArray(e);
}
function Up(e) {
  return typeof e == "boolean";
}
function Es(e) {
  return e === null;
}
function jS(e) {
  return e == null;
}
function WS(e) {
  return typeof e == "number";
}
function fi(e) {
  return typeof e == "string";
}
function bs(e) {
  return e === void 0;
}
function Tn(e) {
  return Ms(e) && wo(e) === "[object RegExp]";
}
function Ms(e) {
  return typeof e == "object" && e !== null;
}
function Gc(e) {
  return Ms(e) && wo(e) === "[object Date]";
}
function Pn(e) {
  return Ms(e) && (wo(e) === "[object Error]" || e instanceof Error);
}
function Nn(e) {
  return typeof e == "function";
}
function wo(e) {
  return Object.prototype.toString.call(e);
}
function QS(e, t) {
  if (!t || !Ms(t)) return e;
  for (var i = Object.keys(t), a = i.length; a--; )
    e[i[a]] = t[i[a]];
  return e;
}
function Vp(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var Xt = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
function $S(e) {
  if (typeof e != "function")
    throw new TypeError('The "original" argument must be of type Function');
  if (Xt && e[Xt]) {
    var t = e[Xt];
    if (typeof t != "function")
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    return Object.defineProperty(t, Xt, {
      value: t,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), t;
  }
  function t() {
    for (var i, a, l = new Promise(function(p, u) {
      i = p, a = u;
    }), h = [], c = 0; c < arguments.length; c++)
      h.push(arguments[c]);
    h.push(function(p, u) {
      p ? a(p) : i(u);
    });
    try {
      e.apply(this, h);
    } catch (p) {
      a(p);
    }
    return l;
  }
  return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), Xt && Object.defineProperty(t, Xt, {
    value: t,
    enumerable: !1,
    writable: !1,
    configurable: !0
  }), Object.defineProperties(
    t,
    LS(e)
  );
}
$S.custom = Xt;
function HS(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var Gp = Array.isArray || function(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
};
function kn(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "true" : "false";
    case "number":
      return isFinite(e) ? e : "";
    default:
      return "";
  }
}
function YS(e, t, i, a) {
  return t = t || "&", i = i || "=", e === null && (e = void 0), typeof e == "object" ? Kc(JS(e), function(l) {
    var h = encodeURIComponent(kn(l)) + i;
    return Gp(e[l]) ? Kc(e[l], function(c) {
      return h + encodeURIComponent(kn(c));
    }).join(t) : h + encodeURIComponent(kn(e[l]));
  }).join(t) : "";
}
function Kc(e, t) {
  if (e.map) return e.map(t);
  for (var i = [], a = 0; a < e.length; a++)
    i.push(t(e[a], a));
  return i;
}
var JS = Object.keys || function(e) {
  var t = [];
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) && t.push(i);
  return t;
};
function jc(e, t, i, a) {
  t = t || "&", i = i || "=";
  var l = {};
  if (typeof e != "string" || e.length === 0)
    return l;
  var h = /\+/g;
  e = e.split(t);
  var c = 1e3, p = e.length;
  p > c && (p = c);
  for (var u = 0; u < p; ++u) {
    var g = e[u].replace(h, "%20"), b = g.indexOf(i), A, m, d, y;
    b >= 0 ? (A = g.substr(0, b), m = g.substr(b + 1)) : (A = g, m = ""), d = decodeURIComponent(A), y = decodeURIComponent(m), HS(l, d) ? Gp(l[d]) ? l[d].push(y) : l[d] = [l[d], y] : l[d] = y;
  }
  return l;
}
const Kp = ls.URL, jp = ls.URLSearchParams;
var XS = {
  parse: di,
  resolve: Hp,
  resolveObject: Yp,
  fileURLToPath: Qp,
  format: $p,
  Url: rt,
  // WHATWG API
  URL: Kp,
  URLSearchParams: jp
};
function rt() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var ZS = /^([a-z0-9.+-]+:)/i, qS = /:[0-9]*$/, zS = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, ex = ["<", ">", '"', "`", " ", "\r", `
`, "	"], tx = ["{", "}", "|", "\\", "^", "`"].concat(ex), wa = ["'"].concat(tx), Wc = ["%", "/", "?", ";", "#"].concat(wa), Qc = ["/", "?", "#"], sx = 255, $c = /^[+a-z0-9A-Z_-]{0,63}$/, ix = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, rx = {
  javascript: !0,
  "javascript:": !0
}, Ca = {
  javascript: !0,
  "javascript:": !0
}, Ts = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function di(e, t, i) {
  if (e && Ms(e) && e instanceof rt) return e;
  var a = new rt();
  return a.parse(e, t, i), a;
}
rt.prototype.parse = function(e, t, i) {
  return Wp(this, e, t, i);
};
function Wp(e, t, i, a) {
  if (!fi(t))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
  var l = t.indexOf("?"), h = l !== -1 && l < t.indexOf("#") ? "?" : "#", c = t.split(h), p = /\\/g;
  c[0] = c[0].replace(p, "/"), t = c.join(h);
  var u = t;
  if (u = u.trim(), !a && t.split("#").length === 1) {
    var g = zS.exec(u);
    if (g)
      return e.path = u, e.href = u, e.pathname = g[1], g[2] ? (e.search = g[2], i ? e.query = jc(e.search.substr(1)) : e.query = e.search.substr(1)) : i && (e.search = "", e.query = {}), e;
  }
  var b = ZS.exec(u);
  if (b) {
    b = b[0];
    var A = b.toLowerCase();
    e.protocol = A, u = u.substr(b.length);
  }
  if (a || b || u.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var m = u.substr(0, 2) === "//";
    m && !(b && Ca[b]) && (u = u.substr(2), e.slashes = !0);
  }
  var d, y, I, w;
  if (!Ca[b] && (m || b && !Ts[b])) {
    var v = -1;
    for (d = 0; d < Qc.length; d++)
      y = u.indexOf(Qc[d]), y !== -1 && (v === -1 || y < v) && (v = y);
    var S, P;
    for (v === -1 ? P = u.lastIndexOf("@") : P = u.lastIndexOf("@", v), P !== -1 && (S = u.slice(0, P), u = u.slice(P + 1), e.auth = decodeURIComponent(S)), v = -1, d = 0; d < Wc.length; d++)
      y = u.indexOf(Wc[d]), y !== -1 && (v === -1 || y < v) && (v = y);
    v === -1 && (v = u.length), e.host = u.slice(0, v), u = u.slice(v), Jp(e), e.hostname = e.hostname || "";
    var M = e.hostname[0] === "[" && e.hostname[e.hostname.length - 1] === "]";
    if (!M) {
      var R = e.hostname.split(/\./);
      for (d = 0, I = R.length; d < I; d++) {
        var L = R[d];
        if (L && !L.match($c)) {
          for (var F = "", k = 0, O = L.length; k < O; k++)
            L.charCodeAt(k) > 127 ? F += "x" : F += L[k];
          if (!F.match($c)) {
            var B = R.slice(0, d), _ = R.slice(d + 1), U = L.match(ix);
            U && (B.push(U[1]), _.unshift(U[2])), _.length && (u = "/" + _.join(".") + u), e.hostname = B.join(".");
            break;
          }
        }
      }
    }
    e.hostname.length > sx ? e.hostname = "" : e.hostname = e.hostname.toLowerCase(), M || (e.hostname = BS(e.hostname)), w = e.port ? ":" + e.port : "";
    var J = e.hostname || "";
    e.host = J + w, e.href += e.host, M && (e.hostname = e.hostname.substr(1, e.hostname.length - 2), u[0] !== "/" && (u = "/" + u));
  }
  if (!rx[A])
    for (d = 0, I = wa.length; d < I; d++) {
      var $ = wa[d];
      if (u.indexOf($) !== -1) {
        var G = encodeURIComponent($);
        G === $ && (G = escape($)), u = u.split($).join(G);
      }
    }
  var pe = u.indexOf("#");
  pe !== -1 && (e.hash = u.substr(pe), u = u.slice(0, pe));
  var ee = u.indexOf("?");
  if (ee !== -1 ? (e.search = u.substr(ee), e.query = u.substr(ee + 1), i && (e.query = jc(e.query)), u = u.slice(0, ee)) : i && (e.search = "", e.query = {}), u && (e.pathname = u), Ts[A] && e.hostname && !e.pathname && (e.pathname = "/"), e.pathname || e.search) {
    w = e.pathname || "";
    var ye = e.search || "";
    e.path = w + ye;
  }
  return e.href = Co(e), e;
}
function Qp(e) {
  if (typeof e == "string")
    e = new rt().parse(e);
  else if (!(e instanceof rt))
    throw new TypeError('The "path" argument must be of type string or an instance of URL. Received type ' + typeof e + String(e));
  if (e.protocol !== "file:")
    throw new TypeError("The URL must be of scheme file");
  return nx(e);
}
function nx(e) {
  const t = e.pathname;
  for (let i = 0; i < t.length; i++)
    if (t[i] === "%") {
      const a = t.codePointAt(i + 2) | 32;
      if (t[i + 1] === "2" && a === 102)
        throw new TypeError(
          "must not include encoded / characters"
        );
    }
  return decodeURIComponent(t);
}
function $p(e) {
  return fi(e) && (e = Wp({}, e)), Co(e);
}
function Co(e) {
  var t = e.auth || "";
  t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
  var i = e.protocol || "", a = e.pathname || "", l = e.hash || "", h = !1, c = "";
  e.host ? h = t + e.host : e.hostname && (h = t + (e.hostname.indexOf(":") === -1 ? e.hostname : "[" + this.hostname + "]"), e.port && (h += ":" + e.port)), e.query && Ms(e.query) && Object.keys(e.query).length && (c = YS(e.query));
  var p = e.search || c && "?" + c || "";
  return i && i.substr(-1) !== ":" && (i += ":"), e.slashes || (!i || Ts[i]) && h !== !1 ? (h = "//" + (h || ""), a && a.charAt(0) !== "/" && (a = "/" + a)) : h || (h = ""), l && l.charAt(0) !== "#" && (l = "#" + l), p && p.charAt(0) !== "?" && (p = "?" + p), a = a.replace(/[?#]/g, function(u) {
    return encodeURIComponent(u);
  }), p = p.replace("#", "%23"), i + h + a + p + l;
}
rt.prototype.format = function() {
  return Co(this);
};
function Hp(e, t) {
  return di(e, !1, !0).resolve(t);
}
rt.prototype.resolve = function(e) {
  return this.resolveObject(di(e, !1, !0)).format();
};
function Yp(e, t) {
  return e ? di(e, !1, !0).resolveObject(t) : t;
}
rt.prototype.resolveObject = function(e) {
  if (fi(e)) {
    var t = new rt();
    t.parse(e, !1, !0), e = t;
  }
  for (var i = new rt(), a = Object.keys(this), l = 0; l < a.length; l++) {
    var h = a[l];
    i[h] = this[h];
  }
  if (i.hash = e.hash, e.href === "")
    return i.href = i.format(), i;
  if (e.slashes && !e.protocol) {
    for (var c = Object.keys(e), p = 0; p < c.length; p++) {
      var u = c[p];
      u !== "protocol" && (i[u] = e[u]);
    }
    return Ts[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"), i.href = i.format(), i;
  }
  var g;
  if (e.protocol && e.protocol !== i.protocol) {
    if (!Ts[e.protocol]) {
      for (var b = Object.keys(e), A = 0; A < b.length; A++) {
        var m = b[A];
        i[m] = e[m];
      }
      return i.href = i.format(), i;
    }
    if (i.protocol = e.protocol, !e.host && !Ca[e.protocol]) {
      for (g = (e.pathname || "").split("/"); g.length && !(e.host = g.shift()); ) ;
      e.host || (e.host = ""), e.hostname || (e.hostname = ""), g[0] !== "" && g.unshift(""), g.length < 2 && g.unshift(""), i.pathname = g.join("/");
    } else
      i.pathname = e.pathname;
    if (i.search = e.search, i.query = e.query, i.host = e.host || "", i.auth = e.auth, i.hostname = e.hostname || e.host, i.port = e.port, i.pathname || i.search) {
      var d = i.pathname || "", y = i.search || "";
      i.path = d + y;
    }
    return i.slashes = i.slashes || e.slashes, i.href = i.format(), i;
  }
  var I = i.pathname && i.pathname.charAt(0) === "/", w = e.host || e.pathname && e.pathname.charAt(0) === "/", v = w || I || i.host && e.pathname, S = v, P = i.pathname && i.pathname.split("/") || [], M = i.protocol && !Ts[i.protocol];
  g = e.pathname && e.pathname.split("/") || [], M && (i.hostname = "", i.port = null, i.host && (P[0] === "" ? P[0] = i.host : P.unshift(i.host)), i.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && (g[0] === "" ? g[0] = e.host : g.unshift(e.host)), e.host = null), v = v && (g[0] === "" || P[0] === ""));
  var R;
  if (w)
    i.host = e.host || e.host === "" ? e.host : i.host, i.hostname = e.hostname || e.hostname === "" ? e.hostname : i.hostname, i.search = e.search, i.query = e.query, P = g;
  else if (g.length)
    P || (P = []), P.pop(), P = P.concat(g), i.search = e.search, i.query = e.query;
  else if (!jS(e.search))
    return M && (i.hostname = i.host = P.shift(), R = i.host && i.host.indexOf("@") > 0 ? i.host.split("@") : !1, R && (i.auth = R.shift(), i.host = i.hostname = R.shift())), i.search = e.search, i.query = e.query, (!Es(i.pathname) || !Es(i.search)) && (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.href = i.format(), i;
  if (!P.length)
    return i.pathname = null, i.search ? i.path = "/" + i.search : i.path = null, i.href = i.format(), i;
  for (var L = P.slice(-1)[0], F = (i.host || e.host || P.length > 1) && (L === "." || L === "..") || L === "", k = 0, O = P.length; O >= 0; O--)
    L = P[O], L === "." ? P.splice(O, 1) : L === ".." ? (P.splice(O, 1), k++) : k && (P.splice(O, 1), k--);
  if (!v && !S)
    for (; k--; k)
      P.unshift("..");
  v && P[0] !== "" && (!P[0] || P[0].charAt(0) !== "/") && P.unshift(""), F && P.join("/").substr(-1) !== "/" && P.push("");
  var B = P[0] === "" || P[0] && P[0].charAt(0) === "/";
  return M && (i.hostname = i.host = B ? "" : P.length ? P.shift() : "", R = i.host && i.host.indexOf("@") > 0 ? i.host.split("@") : !1, R && (i.auth = R.shift(), i.host = i.hostname = R.shift())), v = v || i.host && P.length, v && !B && P.unshift(""), P.length ? i.pathname = P.join("/") : (i.pathname = null, i.path = null), (!Es(i.pathname) || !Es(i.search)) && (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.auth = e.auth || i.auth, i.slashes = i.slashes || e.slashes, i.href = i.format(), i;
};
rt.prototype.parseHost = function() {
  return Jp(this);
};
function Jp(e) {
  var t = e.host, i = qS.exec(t);
  i && (i = i[0], i !== ":" && (e.port = i.substr(1)), t = t.substr(0, t.length - i.length)), t && (e.hostname = t);
}
var ax = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  URL: Kp,
  URLSearchParams: jp,
  Url: rt,
  default: XS,
  fileURLToPath: Qp,
  format: $p,
  parse: di,
  resolve: Hp,
  resolveObject: Yp
}), ox = Object.defineProperty, lx = Object.defineProperties, cx = Object.getOwnPropertyDescriptors, Hc = Object.getOwnPropertySymbols, hx = Object.prototype.hasOwnProperty, ux = Object.prototype.propertyIsEnumerable, Yc = (e, t, i) => t in e ? ox(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, px = (e, t) => {
  for (var i in t || (t = {}))
    hx.call(t, i) && Yc(e, i, t[i]);
  if (Hc)
    for (var i of Hc(t))
      ux.call(t, i) && Yc(e, i, t[i]);
  return e;
}, fx = (e, t) => lx(e, cx(t));
const dx = {
  video: ["src", "poster"],
  source: ["src"],
  img: ["src"]
};
fx(px({}, dx), {
  image: ["xlink:href", "href"],
  use: ["xlink:href", "href"]
});
const mx = /* @__PURE__ */ Symbol("ssrInterpolate"), Ax = /* @__PURE__ */ Symbol("ssrRenderVNode"), gx = /* @__PURE__ */ Symbol("ssrRenderComponent"), yx = /* @__PURE__ */ Symbol("ssrRenderSlot"), Sx = /* @__PURE__ */ Symbol("ssrRenderSlotInner"), xx = /* @__PURE__ */ Symbol("ssrRenderClass"), Ix = /* @__PURE__ */ Symbol("ssrRenderStyle"), Ex = /* @__PURE__ */ Symbol("ssrRenderAttrs"), bx = /* @__PURE__ */ Symbol("ssrRenderAttr"), wx = /* @__PURE__ */ Symbol("ssrRenderDynamicAttr"), Cx = /* @__PURE__ */ Symbol("ssrRenderList"), vx = /* @__PURE__ */ Symbol(
  "ssrIncludeBooleanAttr"
), Tx = /* @__PURE__ */ Symbol("ssrLooseEqual"), Px = /* @__PURE__ */ Symbol("ssrLooseContain"), Nx = /* @__PURE__ */ Symbol(
  "ssrRenderDynamicModel"
), kx = /* @__PURE__ */ Symbol(
  "ssrGetDynamicModelProps"
), Ox = /* @__PURE__ */ Symbol("ssrRenderTeleport"), _x = /* @__PURE__ */ Symbol("ssrRenderSuspense"), Dx = /* @__PURE__ */ Symbol("ssrGetDirectiveProps"), Bx = {
  [mx]: "ssrInterpolate",
  [Ax]: "ssrRenderVNode",
  [gx]: "ssrRenderComponent",
  [yx]: "ssrRenderSlot",
  [Sx]: "ssrRenderSlotInner",
  [xx]: "ssrRenderClass",
  [Ix]: "ssrRenderStyle",
  [Ex]: "ssrRenderAttrs",
  [bx]: "ssrRenderAttr",
  [wx]: "ssrRenderDynamicAttr",
  [Cx]: "ssrRenderList",
  [vx]: "ssrIncludeBooleanAttr",
  [Tx]: "ssrLooseEqual",
  [Px]: "ssrLooseContain",
  [Nx]: "ssrRenderDynamicModel",
  [kx]: "ssrGetDynamicModelProps",
  [Ox]: "ssrRenderTeleport",
  [_x]: "ssrRenderSuspense",
  [Dx]: "ssrGetDirectiveProps"
};
Ba(Bx);
var Lx = Object.defineProperty, Jc = Object.getOwnPropertySymbols, Rx = Object.prototype.hasOwnProperty, Mx = Object.prototype.propertyIsEnumerable, Xc = (e, t, i) => t in e ? Lx(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Zc = (e, t) => {
  for (var i in t || (t = {}))
    Rx.call(t, i) && Xc(e, i, t[i]);
  if (Jc)
    for (var i of Jc(t))
      Mx.call(t, i) && Xc(e, i, t[i]);
  return e;
};
const [Fx, Ux] = no(!0);
[...Fx, ...go];
Zc(Zc({}, Ux), yo);
var Vx = {}, Gx = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: Vx
}), Kx = /* @__PURE__ */ Va(Gx), vo = /* @__PURE__ */ Va(xS), Bi = { exports: {} }, qc;
function Xp() {
  if (qc) return Bi.exports;
  qc = 1;
  let e = Gt || {}, t = e.argv || [], i = e.env || {}, a = !(i.NO_COLOR || t.includes("--no-color")) && (!!i.FORCE_COLOR || t.includes("--color") || e.platform === "win32" || (e.stdout || {}).isTTY && i.TERM !== "dumb" || !!i.CI), l = (p, u, g = p) => (b) => {
    let A = "" + b, m = A.indexOf(u, p.length);
    return ~m ? p + h(A, u, g, m) + u : p + A + u;
  }, h = (p, u, g, b) => {
    let A = "", m = 0;
    do
      A += p.substring(m, b) + g, m = b + u.length, b = p.indexOf(u, m);
    while (~b);
    return A + p.substring(m);
  }, c = (p = a) => {
    let u = p ? l : () => String;
    return {
      isColorSupported: p,
      reset: u("\x1B[0m", "\x1B[0m"),
      bold: u("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: u("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: u("\x1B[3m", "\x1B[23m"),
      underline: u("\x1B[4m", "\x1B[24m"),
      inverse: u("\x1B[7m", "\x1B[27m"),
      hidden: u("\x1B[8m", "\x1B[28m"),
      strikethrough: u("\x1B[9m", "\x1B[29m"),
      black: u("\x1B[30m", "\x1B[39m"),
      red: u("\x1B[31m", "\x1B[39m"),
      green: u("\x1B[32m", "\x1B[39m"),
      yellow: u("\x1B[33m", "\x1B[39m"),
      blue: u("\x1B[34m", "\x1B[39m"),
      magenta: u("\x1B[35m", "\x1B[39m"),
      cyan: u("\x1B[36m", "\x1B[39m"),
      white: u("\x1B[37m", "\x1B[39m"),
      gray: u("\x1B[90m", "\x1B[39m"),
      bgBlack: u("\x1B[40m", "\x1B[49m"),
      bgRed: u("\x1B[41m", "\x1B[49m"),
      bgGreen: u("\x1B[42m", "\x1B[49m"),
      bgYellow: u("\x1B[43m", "\x1B[49m"),
      bgBlue: u("\x1B[44m", "\x1B[49m"),
      bgMagenta: u("\x1B[45m", "\x1B[49m"),
      bgCyan: u("\x1B[46m", "\x1B[49m"),
      bgWhite: u("\x1B[47m", "\x1B[49m"),
      blackBright: u("\x1B[90m", "\x1B[39m"),
      redBright: u("\x1B[91m", "\x1B[39m"),
      greenBright: u("\x1B[92m", "\x1B[39m"),
      yellowBright: u("\x1B[93m", "\x1B[39m"),
      blueBright: u("\x1B[94m", "\x1B[39m"),
      magentaBright: u("\x1B[95m", "\x1B[39m"),
      cyanBright: u("\x1B[96m", "\x1B[39m"),
      whiteBright: u("\x1B[97m", "\x1B[39m"),
      bgBlackBright: u("\x1B[100m", "\x1B[49m"),
      bgRedBright: u("\x1B[101m", "\x1B[49m"),
      bgGreenBright: u("\x1B[102m", "\x1B[49m"),
      bgYellowBright: u("\x1B[103m", "\x1B[49m"),
      bgBlueBright: u("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: u("\x1B[105m", "\x1B[49m"),
      bgCyanBright: u("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: u("\x1B[107m", "\x1B[49m")
    };
  };
  return Bi.exports = c(), Bi.exports.createColors = c, Bi.exports;
}
var On, zc;
function Zp() {
  if (zc) return On;
  zc = 1;
  const e = 39, t = 34, i = 92, a = 47, l = 10, h = 32, c = 12, p = 9, u = 13, g = 91, b = 93, A = 40, m = 41, d = 123, y = 125, I = 59, w = 42, v = 58, S = 64, P = /[\t\n\f\r "#'()/;[\\\]{}]/g, M = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, R = /.[\r\n"'(/\\]/, L = /[\da-f]/i;
  return On = function(k, O = {}) {
    let B = k.css.valueOf(), _ = O.ignoreErrors, U, J, $, G, pe, ee, ye, Z, ue, lt, Ne = B.length, q = 0, jt = [], Ct = [], us = -1;
    function Fs() {
      return q;
    }
    function Y(vt) {
      throw k.error("Unclosed " + vt, q);
    }
    function se() {
      return Ct.length === 0 && q >= Ne;
    }
    function Xr(vt) {
      if (Ct.length) return Ct.pop();
      if (q >= Ne) return;
      let Ke = vt ? vt.ignoreUnclosed : !1;
      switch (U = B.charCodeAt(q), U) {
        case l:
        case h:
        case p:
        case u:
        case c: {
          G = q;
          do
            G += 1, U = B.charCodeAt(G);
          while (U === h || U === l || U === p || U === u || U === c);
          ee = ["space", B.slice(q, G)], q = G - 1;
          break;
        }
        case g:
        case b:
        case d:
        case y:
        case v:
        case I:
        case m: {
          let Us = String.fromCharCode(U);
          ee = [Us, Us, q];
          break;
        }
        case A: {
          if (lt = jt.length ? jt.pop()[1] : "", ue = B.charCodeAt(q + 1), lt === "url" && ue !== e && ue !== t && ue !== h && ue !== l && ue !== p && ue !== c && ue !== u) {
            G = q;
            do {
              if (ye = !1, G = B.indexOf(")", G + 1), G === -1)
                if (_ || Ke) {
                  G = q;
                  break;
                } else
                  Y("bracket");
              for (Z = G; B.charCodeAt(Z - 1) === i; )
                Z -= 1, ye = !ye;
            } while (ye);
            ee = ["brackets", B.slice(q, G + 1), q, G], q = G;
          } else q <= us ? ee = ["(", "(", q] : (G = B.indexOf(")", q + 1), J = B.slice(q, G + 1), G === -1 || R.test(J) ? (us = G === -1 ? Ne : G, ee = ["(", "(", q]) : (ee = ["brackets", J, q, G], q = G));
          break;
        }
        case e:
        case t: {
          pe = U === e ? "'" : '"', G = q;
          do {
            if (ye = !1, G = B.indexOf(pe, G + 1), G === -1)
              if (_ || Ke) {
                G = q + 1;
                break;
              } else
                Y("string");
            for (Z = G; B.charCodeAt(Z - 1) === i; )
              Z -= 1, ye = !ye;
          } while (ye);
          ee = ["string", B.slice(q, G + 1), q, G], q = G;
          break;
        }
        case S: {
          P.lastIndex = q + 1, P.test(B), P.lastIndex === 0 ? G = B.length - 1 : G = P.lastIndex - 2, ee = ["at-word", B.slice(q, G + 1), q, G], q = G;
          break;
        }
        case i: {
          for (G = q, $ = !0; B.charCodeAt(G + 1) === i; )
            G += 1, $ = !$;
          if (U = B.charCodeAt(G + 1), $ && U !== a && U !== h && U !== l && U !== p && U !== u && U !== c && (G += 1, L.test(B.charAt(G)))) {
            for (; L.test(B.charAt(G + 1)); )
              G += 1;
            B.charCodeAt(G + 1) === h && (G += 1);
          }
          ee = ["word", B.slice(q, G + 1), q, G], q = G;
          break;
        }
        default: {
          U === a && B.charCodeAt(q + 1) === w ? (G = B.indexOf("*/", q + 2) + 1, G === 0 && (_ || Ke ? G = B.length : Y("comment")), ee = ["comment", B.slice(q, G + 1), q, G], q = G) : (M.lastIndex = q + 1, M.test(B), M.lastIndex === 0 ? G = B.length - 1 : G = M.lastIndex - 2, ee = ["word", B.slice(q, G + 1), q, G], jt.push(ee), q = G);
          break;
        }
      }
      return q++, ee;
    }
    function ae(vt) {
      Ct.push(vt);
    }
    return {
      back: ae,
      endOfFile: se,
      nextToken: Xr,
      position: Fs
    };
  }, On;
}
var _n, eh;
function qp() {
  if (eh) return _n;
  eh = 1;
  let e = /* @__PURE__ */ Xp(), t = /* @__PURE__ */ Zp(), i;
  function a(p) {
    i = p;
  }
  const l = {
    ";": e.yellow,
    ":": e.yellow,
    "(": e.cyan,
    ")": e.cyan,
    "[": e.yellow,
    "]": e.yellow,
    "{": e.yellow,
    "}": e.yellow,
    "at-word": e.cyan,
    brackets: e.cyan,
    call: e.cyan,
    class: e.yellow,
    comment: e.gray,
    hash: e.magenta,
    string: e.green
  };
  function h([p, u], g) {
    if (p === "word") {
      if (u[0] === ".")
        return "class";
      if (u[0] === "#")
        return "hash";
    }
    if (!g.endOfFile()) {
      let b = g.nextToken();
      if (g.back(b), b[0] === "brackets" || b[0] === "(") return "call";
    }
    return p;
  }
  function c(p) {
    let u = t(new i(p), { ignoreErrors: !0 }), g = "";
    for (; !u.endOfFile(); ) {
      let b = u.nextToken(), A = l[h(b, u)];
      A ? g += b[1].split(/\r?\n/).map((m) => A(m)).join(`
`) : g += b[1];
    }
    return g;
  }
  return c.registerInput = a, _n = c, _n;
}
var Dn, th;
function To() {
  if (th) return Dn;
  th = 1;
  let e = /* @__PURE__ */ Xp(), t = /* @__PURE__ */ qp();
  class i extends Error {
    constructor(l, h, c, p, u, g) {
      super(l), this.name = "CssSyntaxError", this.reason = l, u && (this.file = u), p && (this.source = p), g && (this.plugin = g), typeof h < "u" && typeof c < "u" && (typeof h == "number" ? (this.line = h, this.column = c) : (this.line = h.line, this.column = h.column, this.endLine = c.line, this.endColumn = c.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, i);
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
    }
    showSourceCode(l) {
      if (!this.source) return "";
      let h = this.source;
      l == null && (l = e.isColorSupported);
      let c = (d) => d, p = (d) => d, u = (d) => d;
      if (l) {
        let { bold: d, gray: y, red: I } = e.createColors(!0);
        p = (w) => d(I(w)), c = (w) => y(w), t && (u = (w) => t(w));
      }
      let g = h.split(/\r?\n/), b = Math.max(this.line - 3, 0), A = Math.min(this.line + 2, g.length), m = String(A).length;
      return g.slice(b, A).map((d, y) => {
        let I = b + 1 + y, w = " " + (" " + I).slice(-m) + " | ";
        if (I === this.line) {
          if (d.length > 160) {
            let S = 20, P = Math.max(0, this.column - S), M = Math.max(
              this.column + S,
              this.endColumn + S
            ), R = d.slice(P, M), L = c(w.replace(/\d/g, " ")) + d.slice(0, Math.min(this.column - 1, S - 1)).replace(/[^\t]/g, " ");
            return p(">") + c(w) + u(R) + `
 ` + L + p("^");
          }
          let v = c(w.replace(/\d/g, " ")) + d.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return p(">") + c(w) + u(d) + `
 ` + v + p("^");
        }
        return " " + c(w) + u(d);
      }).join(`
`);
    }
    toString() {
      let l = this.showSourceCode();
      return l && (l = `

` + l + `
`), this.name + ": " + this.message + l;
    }
  }
  return Dn = i, i.default = i, Dn;
}
var Bn, sh;
function zp() {
  if (sh) return Bn;
  sh = 1;
  const e = /(<)(\/?style\b)/gi, t = /(<)(!--)/g, i = /[\t\n\f\r "#'()/;[\\\]{}]/;
  function a(A) {
    return typeof A != "string" || !A.includes("<") ? A : A.replace(e, "\\3c $2").replace(t, "\\3c $2");
  }
  const l = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1
  };
  function h(A) {
    return A[0].toUpperCase() + A.slice(1);
  }
  function c(A, m) {
    let d = "@" + m.name, y = m.params ? A.rawValue(m, "params") : "", I = m.raws.afterName;
    return typeof I > "u" ? I = y ? " " : "" : I === "" && y && !i.test(y[0]) && (I = " "), d + I + y;
  }
  function p(A) {
    if (!A.prop.startsWith("--")) return !1;
    let m = A.raws.before;
    return typeof m > "u" || !/\S$/.test(m);
  }
  function u(A, m, d) {
    let y = d.nodes, I = y.length - 1;
    for (; I > 0 && y[I].type === "comment"; )
      I -= 1;
    let w = A.raw(d, "semicolon"), v = d.type === "document";
    for (let S = y.length - 1; S >= 0; S--) {
      let P = y[S], M = I !== S || w;
      !M && S < y.length - 1 && (P.type === "atrule" && !P.nodes || P.type === "decl" && p(P)) && (M = !0), m.push({
        document: v,
        node: P,
        semicolon: M
      });
    }
  }
  function g(A, m, d, y) {
    let I = A.raw(d, "between", "beforeOpen");
    A.builder(a(y + I) + "{", d, "start");
    let w = d.nodes && d.nodes.length, v = () => {
      let S = w ? A.raw(d, "after") : A.raw(d, "after", "emptyBody");
      S && A.builder(a(S)), A.builder("}", d, "end"), d.type === "rule" && d.raws.ownSemicolon && A.builder(a(d.raws.ownSemicolon), d, "end");
    };
    w ? (m.push(v), u(A, m, d)) : v();
  }
  class b {
    constructor(m) {
      this.builder = m;
    }
    atrule(m, d) {
      let y = c(this, m);
      if (m.nodes)
        this.block(m, y);
      else {
        let I = (m.raws.between || "") + (d ? ";" : "");
        this.builder(a(y + I), m);
      }
    }
    beforeAfter(m, d) {
      let y;
      m.type === "decl" ? y = this.raw(m, null, "beforeDecl") : m.type === "comment" ? y = this.raw(m, null, "beforeComment") : d === "before" ? y = this.raw(m, null, "beforeRule") : y = this.raw(m, null, "beforeClose");
      let I = m.parent, w = 0;
      for (; I && I.type !== "root"; )
        w += 1, I = I.parent;
      if (y.includes(`
`)) {
        let v = this.raw(m, null, "indent");
        if (v.length)
          for (let S = 0; S < w; S++) y += v;
      }
      return y;
    }
    block(m, d) {
      let y = this.raw(m, "between", "beforeOpen");
      this.builder(a(d + y) + "{", m, "start");
      let I;
      m.nodes && m.nodes.length ? (this.body(m), I = this.raw(m, "after")) : I = this.raw(m, "after", "emptyBody"), I && this.builder(a(I)), this.builder("}", m, "end");
    }
    body(m) {
      let d = b.prototype, y = ["atrule", "block", "body", "rule", "stringify"].every(
        (w) => this[w] === d[w]
      ), I = [];
      for (u(this, I, m); I.length > 0; ) {
        let w = I.pop();
        if (typeof w == "function") {
          w();
          continue;
        }
        let v = w.node, S = this.raw(v, "before");
        S && this.builder(w.document ? S : a(S)), y && v.type === "rule" ? g(this, I, v, this.rawValue(v, "selector")) : y && v.type === "atrule" && v.nodes ? g(this, I, v, c(this, v)) : this.stringify(v, w.semicolon);
      }
    }
    comment(m) {
      let d = this.raw(m, "left", "commentLeft"), y = this.raw(m, "right", "commentRight");
      this.builder(a("/*" + d + m.text + y + "*/"), m);
    }
    decl(m, d) {
      let y = m.raws, I = this.raw(m, "between", "colon"), w = m.prop + I + this.rawValue(m, "value");
      m.important && (w += y.important || " !important"), d && (w += ";"), this.builder(a(w), m);
    }
    document(m) {
      this.body(m);
    }
    raw(m, d, y) {
      let I;
      if (y || (y = d), d && (I = m.raws[d], typeof I < "u"))
        return I;
      let w = m.parent;
      if (y === "before" && (!w || w.type === "root" && w.first === m || w && w.type === "document"))
        return "";
      if (!w) return l[y];
      let v = m.root(), S = v.rawCache || (v.rawCache = {});
      if (typeof S[y] < "u")
        return S[y];
      if (y === "before" || y === "after")
        return this.beforeAfter(m, y);
      {
        let P = "raw" + h(y);
        this[P] ? I = this[P](v, m) : v.walk((M) => {
          if (I = M.raws[d], typeof I < "u") return !1;
        });
      }
      return typeof I > "u" && (I = l[y]), S[y] = I, I;
    }
    rawBeforeClose(m) {
      let d;
      return m.walk((y) => {
        if (y.nodes && y.nodes.length > 0 && typeof y.raws.after < "u")
          return d = y.raws.after, d.includes(`
`) && (d = d.replace(/[^\n]+$/, "")), !1;
      }), d && (d = d.replace(/\S/g, "")), d;
    }
    rawBeforeComment(m, d) {
      let y;
      return m.walkComments((I) => {
        if (typeof I.raws.before < "u")
          return y = I.raws.before, y.includes(`
`) && (y = y.replace(/[^\n]+$/, "")), !1;
      }), typeof y > "u" ? y = this.raw(d, null, "beforeDecl") : y && (y = y.replace(/\S/g, "")), y;
    }
    rawBeforeDecl(m, d) {
      let y;
      return m.walkDecls((I) => {
        if (typeof I.raws.before < "u")
          return y = I.raws.before, y.includes(`
`) && (y = y.replace(/[^\n]+$/, "")), !1;
      }), typeof y > "u" ? y = this.raw(d, null, "beforeRule") : y && (y = y.replace(/\S/g, "")), y;
    }
    rawBeforeOpen(m) {
      let d;
      return m.walk((y) => {
        if (y.type !== "decl" && (d = y.raws.between, typeof d < "u"))
          return !1;
      }), d;
    }
    rawBeforeRule(m) {
      let d;
      return m.walk((y) => {
        if (y.nodes && (y.parent !== m || m.first !== y) && typeof y.raws.before < "u")
          return d = y.raws.before, d.includes(`
`) && (d = d.replace(/[^\n]+$/, "")), !1;
      }), d && (d = d.replace(/\S/g, "")), d;
    }
    rawColon(m) {
      let d;
      return m.walkDecls((y) => {
        if (typeof y.raws.between < "u")
          return d = y.raws.between.replace(/[^\s:]/g, ""), !1;
      }), d;
    }
    rawEmptyBody(m) {
      let d;
      return m.walk((y) => {
        if (y.nodes && y.nodes.length === 0 && (d = y.raws.after, typeof d < "u"))
          return !1;
      }), d;
    }
    rawIndent(m) {
      if (m.raws.indent) return m.raws.indent;
      let d;
      return m.walk((y) => {
        let I = y.parent;
        if (I && I !== m && I.parent && I.parent === m && typeof y.raws.before < "u") {
          let w = y.raws.before.split(`
`);
          return d = w[w.length - 1], d = d.replace(/\S/g, ""), !1;
        }
      }), d;
    }
    rawSemicolon(m) {
      let d;
      return m.walk((y) => {
        if (y.nodes && y.nodes.length && y.last.type === "decl" && (d = y.raws.semicolon, typeof d < "u"))
          return !1;
      }), d;
    }
    rawValue(m, d) {
      let y = m[d], I = m.raws[d];
      return I && I.value === y ? I.raw : y;
    }
    root(m) {
      if (m.source && m.source.input.hasBOM && this.builder("\uFEFF", m, "start"), this.body(m), m.raws.after) {
        let d = m.raws.after, y = m.parent && m.parent.type === "document";
        this.builder(y ? d : a(d));
      }
    }
    rule(m) {
      this.block(m, this.rawValue(m, "selector")), m.raws.ownSemicolon && this.builder(a(m.raws.ownSemicolon), m, "end");
    }
    stringify(m, d) {
      if (!this[m.type])
        throw new Error(
          "Unknown AST node type " + m.type + ". Maybe you need to change PostCSS stringifier."
        );
      this[m.type](m, d);
    }
  }
  return Bn = b, b.default = b, Bn;
}
var Ln, ih;
function Kr() {
  if (ih) return Ln;
  ih = 1;
  let e = /* @__PURE__ */ zp();
  function t(i, a) {
    new e(a).stringify(i);
  }
  return Ln = t, t.default = t, Ln;
}
var Li = {}, rh;
function jr() {
  return rh || (rh = 1, Li.isClean = Symbol("isClean"), Li.my = Symbol("my")), Li;
}
var Rn, nh;
function Wr() {
  if (nh) return Rn;
  nh = 1;
  let e = /* @__PURE__ */ To(), t = /* @__PURE__ */ zp(), i = /* @__PURE__ */ Kr(), { isClean: a, my: l } = /* @__PURE__ */ jr();
  function h(u, g) {
    let b = new u.constructor(), A = [[u, b, g]];
    for (; A.length > 0; ) {
      let [m, d, y] = A.pop();
      for (let I in m) {
        if (!Object.prototype.hasOwnProperty.call(m, I) || I === "proxyCache") continue;
        let w = m[I], v = typeof w;
        if (I === "parent" && v === "object")
          y && (d[I] = y);
        else if (I === "source")
          d[I] = w;
        else if (Array.isArray(w)) {
          let S = [];
          d[I] = S;
          for (let P of w) {
            let M = new P.constructor();
            S.push(M), A.push([P, M, d]);
          }
        } else {
          if (v === "object" && w !== null) {
            let S = new w.constructor();
            A.push([w, S, void 0]), w = S;
          }
          d[I] = w;
        }
      }
    }
    return b;
  }
  function c(u, g) {
    if (g && typeof g.offset < "u")
      return g.offset;
    let b = 1, A = 1, m = 0;
    for (let d = 0; d < u.length; d++) {
      if (A === g.line && b === g.column) {
        m = d;
        break;
      }
      u[d] === `
` ? (b = 1, A += 1) : b += 1;
    }
    return m;
  }
  class p {
    get proxyOf() {
      return this;
    }
    constructor(g = {}) {
      this.raws = {}, this[a] = !1, this[l] = !0;
      for (let b of Object.keys(g))
        if (b !== "__proto__")
          if (b === "nodes") {
            this.nodes = [];
            for (let A of g[b])
              typeof A.clone == "function" && A.parent ? this.append(A.clone()) : this.append(A);
          } else
            this[b] = g[b];
    }
    addToError(g) {
      if (g.postcssNode = this, g.stack && this.source && /\n\s{4}at /.test(g.stack)) {
        let b = this.source;
        g.stack = g.stack.replace(
          /\n\s{4}at /,
          `$&${b.input.from}:${b.start.line}:${b.start.column}$&`
        );
      }
      return g;
    }
    after(g) {
      return this.parent.insertAfter(this, g), this;
    }
    assign(g = {}) {
      for (let b in g)
        this[b] = g[b];
      return this;
    }
    before(g) {
      return this.parent.insertBefore(this, g), this;
    }
    cleanRaws(g) {
      delete this.raws.before, delete this.raws.after, g || delete this.raws.between;
    }
    clone(g = {}) {
      let b = h(this);
      for (let A in g)
        b[A] = g[A];
      return b;
    }
    cloneAfter(g = {}) {
      let b = this.clone(g);
      return this.parent.insertAfter(this, b), b;
    }
    cloneBefore(g = {}) {
      let b = this.clone(g);
      return this.parent.insertBefore(this, b), b;
    }
    error(g, b = {}) {
      if (this.source) {
        let { end: A, start: m } = this.rangeBy(b);
        return this.source.input.error(
          g,
          { column: m.column, line: m.line },
          { column: A.column, line: A.line },
          b
        );
      }
      return new e(g);
    }
    getProxyProcessor() {
      return {
        get(g, b) {
          return b === "proxyOf" ? g : b === "root" ? () => g.root().toProxy() : g[b];
        },
        set(g, b, A) {
          return g[b] === A || (g[b] = A, (b === "prop" || b === "value" || b === "name" || b === "params" || b === "important" || /* c8 ignore next */
          b === "text") && g.markDirty()), !0;
        }
      };
    }
    /* c8 ignore next 3 */
    markClean() {
      this[a] = !0;
    }
    markDirty() {
      if (this[a]) {
        this[a] = !1;
        let g = this;
        for (; g = g.parent; )
          g[a] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let g = this.parent.index(this);
      return this.parent.nodes[g + 1];
    }
    positionBy(g = {}) {
      let b = "document" in this.source.input ? this.source.input.document : this.source.input.css, A = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: c(b, this.source.start)
      };
      if (g.index)
        A = this.positionInside(g.index);
      else if (g.word) {
        let d = b.slice(
          c(b, this.source.start),
          c(b, this.source.end)
        ).indexOf(g.word);
        d !== -1 && (A = this.positionInside(d));
      }
      return A;
    }
    positionInside(g) {
      let b = this.source.start.column, A = this.source.start.line, m = "document" in this.source.input ? this.source.input.document : this.source.input.css, d = c(m, this.source.start), y = d + g;
      for (let I = d; I < y; I++)
        m[I] === `
` ? (b = 1, A += 1) : b += 1;
      return { column: b, line: A, offset: y };
    }
    prev() {
      if (!this.parent) return;
      let g = this.parent.index(this);
      return this.parent.nodes[g - 1];
    }
    rangeBy(g = {}) {
      let b = "document" in this.source.input ? this.source.input.document : this.source.input.css, A = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: c(b, this.source.start)
      }, m = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line,
        offset: typeof this.source.end.offset == "number" ? (
          // `source.end.offset` is exclusive, so we don't need to add 1
          this.source.end.offset
        ) : (
          // Since line/column in this.source.end is inclusive,
          // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
          // So, we add 1 to convert it to exclusive.
          c(b, this.source.end) + 1
        )
      } : {
        column: A.column + 1,
        line: A.line,
        offset: A.offset + 1
      };
      if (g.word) {
        let y = b.slice(
          c(b, this.source.start),
          c(b, this.source.end)
        ).indexOf(g.word);
        y !== -1 && (A = this.positionInside(y), m = this.positionInside(y + g.word.length));
      } else
        g.start ? A = {
          column: g.start.column,
          line: g.start.line,
          offset: c(b, g.start)
        } : typeof g.index == "number" && (A = this.positionInside(g.index)), g.end ? m = {
          column: g.end.column,
          line: g.end.line,
          offset: c(b, g.end)
        } : typeof g.endIndex == "number" ? m = this.positionInside(g.endIndex) : typeof g.index == "number" && (m = this.positionInside(g.index + 1));
      return (m.line < A.line || m.line === A.line && m.column <= A.column) && (m = {
        column: A.column + 1,
        line: A.line,
        offset: A.offset + 1
      }), { end: m, start: A };
    }
    raw(g, b) {
      return new t().raw(this, g, b);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }
    replaceWith(...g) {
      if (this.parent) {
        let b = this, A = !1;
        for (let m of g)
          m === this ? A = !0 : A ? (this.parent.insertAfter(b, m), b = m) : this.parent.insertBefore(b, m);
        A || this.remove();
      }
      return this;
    }
    root() {
      let g = this;
      for (; g.parent && g.parent.type !== "document"; )
        g = g.parent;
      return g;
    }
    toJSON(g, b) {
      let A = b == null;
      b = b || /* @__PURE__ */ new Map();
      let m = [], d = [[this, m, 0]];
      for (let I = 0; I < d.length; I++) {
        let [w, v, S] = d[I], P = {};
        v[S] = P;
        for (let M in w) {
          if (!Object.prototype.hasOwnProperty.call(w, M) || M === "parent" || M === "proxyCache") continue;
          let R = w[M];
          if (Array.isArray(R)) {
            let L = [];
            P[M] = L;
            for (let F = 0; F < R.length; F++) {
              let k = R[F];
              typeof k == "object" && k.toJSON ? k.toJSON === p.prototype.toJSON ? d.push([k, L, F]) : L[F] = k.toJSON(null, b) : L[F] = k;
            }
          } else if (typeof R == "object" && R.toJSON)
            R.toJSON === p.prototype.toJSON ? d.push([R, P, M]) : P[M] = R.toJSON(null, b);
          else if (M === "source") {
            if (R == null) continue;
            let L = b.get(R.input);
            L == null && (L = b.size, b.set(R.input, L)), P[M] = {
              end: R.end,
              inputId: L,
              start: R.start
            };
          } else
            P[M] = R;
        }
      }
      let y = m[0];
      return A && (y.inputs = [...b.keys()].map((I) => I.toJSON())), y;
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    toString(g = i) {
      g.stringify && (g = g.stringify);
      let b = "";
      return g(this, (A) => {
        b += A;
      }), b;
    }
    warn(g, b, A = {}) {
      let m = { node: this };
      for (let d in A) m[d] = A[d];
      return g.warn(b, m);
    }
  }
  return Rn = p, p.default = p, Rn;
}
var Mn, ah;
function Qr() {
  if (ah) return Mn;
  ah = 1;
  let e = /* @__PURE__ */ Wr();
  class t extends e {
    constructor(a) {
      super(a), this.type = "comment";
    }
  }
  return Mn = t, t.default = t, Mn;
}
var Fn, oh;
function $r() {
  if (oh) return Fn;
  oh = 1;
  let e = /* @__PURE__ */ Wr();
  class t extends e {
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
    constructor(a) {
      a && typeof a.value < "u" && typeof a.value != "string" && (a = { ...a, value: String(a.value) }), super(a), this.type = "decl";
    }
  }
  return Fn = t, t.default = t, Fn;
}
var Un, lh;
function Kt() {
  if (lh) return Un;
  lh = 1;
  let e = /* @__PURE__ */ Qr(), t = /* @__PURE__ */ $r(), i = /* @__PURE__ */ Wr(), { isClean: a, my: l } = /* @__PURE__ */ jr(), h, c, p, u;
  function g(m) {
    let d = m.slice();
    for (; d.length > 0; ) {
      let y = d.pop();
      if (delete y.source, y.nodes) {
        y.nodes = y.nodes.slice();
        for (let I of y.nodes) d.push(I);
      }
    }
    return m.slice();
  }
  function b(m) {
    let d = [m];
    for (; d.length > 0; ) {
      let y = d.pop();
      if (y[a] = !1, y.proxyOf.nodes)
        for (let I of y.proxyOf.nodes) d.push(I);
    }
  }
  class A extends i {
    get first() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    append(...d) {
      for (let y of d) {
        let I = this.normalize(y, this.last);
        for (let w of I) this.proxyOf.nodes.push(w);
      }
      return this.markDirty(), this;
    }
    cleanRaws(d) {
      let y = [this];
      for (; y.length > 0; ) {
        let I = y.pop();
        if (I !== this && I.cleanRaws !== A.prototype.cleanRaws) {
          I.cleanRaws(d);
          continue;
        }
        if (i.prototype.cleanRaws.call(I, d), I.nodes)
          for (let w of I.nodes) y.push(w);
      }
    }
    each(d) {
      if (!this.proxyOf.nodes) return;
      let y = this.getIterator(), I, w;
      for (; this.indexes[y] < this.proxyOf.nodes.length && (I = this.indexes[y], w = d(this.proxyOf.nodes[I], I), w !== !1); )
        this.indexes[y] += 1;
      return delete this.indexes[y], w;
    }
    every(d) {
      return this.nodes.every(d);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
      let d = this.lastEach;
      return this.indexes[d] = 0, d;
    }
    getProxyProcessor() {
      return {
        get(d, y) {
          return y === "proxyOf" ? d : d[y] ? y === "each" || typeof y == "string" && y.startsWith("walk") ? (...I) => d[y](
            ...I.map((w) => typeof w == "function" ? (v, S) => w(v.toProxy(), S) : w)
          ) : y === "every" || y === "some" ? (I) => d[y](
            (w, ...v) => I(w.toProxy(), ...v)
          ) : y === "root" ? () => d.root().toProxy() : y === "nodes" ? d.nodes.map((I) => I.toProxy()) : y === "first" || y === "last" ? d[y].toProxy() : d[y] : d[y];
        },
        set(d, y, I) {
          return d[y] === I || (d[y] = I, (y === "name" || y === "params" || y === "selector") && d.markDirty()), !0;
        }
      };
    }
    index(d) {
      return typeof d == "number" ? d : (d.proxyOf && (d = d.proxyOf), this.proxyOf.nodes.indexOf(d));
    }
    insertAfter(d, y) {
      let I = this.index(d), w = this.normalize(y, this.proxyOf.nodes[I]).reverse();
      I = this.index(d);
      for (let S of w) this.proxyOf.nodes.splice(I + 1, 0, S);
      let v;
      for (let S in this.indexes)
        v = this.indexes[S], I < v && (this.indexes[S] = v + w.length);
      return this.markDirty(), this;
    }
    insertBefore(d, y) {
      let I = this.index(d), w = I === 0 ? "prepend" : !1, v = this.normalize(
        y,
        this.proxyOf.nodes[I],
        w
      ).reverse();
      I = this.index(d);
      for (let P of v) this.proxyOf.nodes.splice(I, 0, P);
      let S;
      for (let P in this.indexes)
        S = this.indexes[P], I <= S && (this.indexes[P] = S + v.length);
      return this.markDirty(), this;
    }
    normalize(d, y) {
      if (typeof d == "string")
        d = g(c(d).nodes);
      else if (typeof d > "u")
        d = [];
      else if (Array.isArray(d)) {
        d = d.slice(0);
        for (let w of d)
          w.parent && w.parent.removeChild(w, "ignore");
      } else if (d.type === "root" && this.type !== "document") {
        d = d.nodes.slice(0);
        for (let w of d)
          w.parent && w.parent.removeChild(w, "ignore");
      } else if (d.type)
        d = [d];
      else if (d.prop) {
        if (typeof d.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof d.value != "string" && (d.value = String(d.value)), d = [new t(d)];
      } else if (d.selector || d.selectors)
        d = [new u(d)];
      else if (d.name)
        d = [new h(d)];
      else if (d.text)
        d = [new e(d)];
      else
        throw new Error("Unknown node type in node creation");
      return d.map((w) => (w[l] || A.rebuild(w), w = w.proxyOf, w.parent && w.parent.removeChild(w), w[a] && b(w), w.raws || (w.raws = {}), typeof w.raws.before > "u" && y && typeof y.raws.before < "u" && (w.raws.before = y.raws.before.replace(/\S/g, "")), w.parent = this.proxyOf, w));
    }
    prepend(...d) {
      d = d.reverse();
      for (let y of d) {
        let I = this.normalize(y, this.first, "prepend").reverse();
        for (let w of I) this.proxyOf.nodes.unshift(w);
        for (let w in this.indexes)
          this.indexes[w] = this.indexes[w] + I.length;
      }
      return this.markDirty(), this;
    }
    push(d) {
      return d.parent = this, this.proxyOf.nodes.push(d), this;
    }
    removeAll() {
      for (let d of this.proxyOf.nodes) d.parent = void 0;
      return this.proxyOf.nodes = [], this.markDirty(), this;
    }
    removeChild(d) {
      d = this.index(d), this.proxyOf.nodes[d].parent = void 0, this.proxyOf.nodes.splice(d, 1);
      let y;
      for (let I in this.indexes)
        y = this.indexes[I], y >= d && (this.indexes[I] = y - 1);
      return this.markDirty(), this;
    }
    replaceValues(d, y, I) {
      return I || (I = y, y = {}), this.walkDecls((w) => {
        y.props && !y.props.includes(w.prop) || y.fast && !w.value.includes(y.fast) || (w.value = w.value.replace(d, I));
      }), this.markDirty(), this;
    }
    some(d) {
      return this.nodes.some(d);
    }
    walk(d) {
      if (!this.proxyOf.nodes) return;
      let y = [{ iterator: this.getIterator(), node: this.proxyOf }];
      for (; y.length > 0; ) {
        let { iterator: I, node: w } = y[y.length - 1], v = w.indexes[I];
        if (v >= w.proxyOf.nodes.length) {
          delete w.indexes[I], y.pop();
          let M = y[y.length - 1];
          M && (M.node.indexes[M.iterator] += 1);
          continue;
        }
        let S = w.proxyOf.nodes[v], P;
        try {
          P = d(S, v);
        } catch (M) {
          throw S.addToError(M);
        }
        if (P === !1) {
          for (let M of y)
            delete M.node.indexes[M.iterator];
          return !1;
        }
        S.walk && S.proxyOf.nodes ? y.push({ iterator: S.getIterator(), node: S }) : w.indexes[I] += 1;
      }
    }
    walkAtRules(d, y) {
      return y ? d instanceof RegExp ? this.walk((I, w) => {
        if (I.type === "atrule" && d.test(I.name))
          return y(I, w);
      }) : this.walk((I, w) => {
        if (I.type === "atrule" && I.name === d)
          return y(I, w);
      }) : (y = d, this.walk((I, w) => {
        if (I.type === "atrule")
          return y(I, w);
      }));
    }
    walkComments(d) {
      return this.walk((y, I) => {
        if (y.type === "comment")
          return d(y, I);
      });
    }
    walkDecls(d, y) {
      return y ? d instanceof RegExp ? this.walk((I, w) => {
        if (I.type === "decl" && d.test(I.prop))
          return y(I, w);
      }) : this.walk((I, w) => {
        if (I.type === "decl" && I.prop === d)
          return y(I, w);
      }) : (y = d, this.walk((I, w) => {
        if (I.type === "decl")
          return y(I, w);
      }));
    }
    walkRules(d, y) {
      return y ? d instanceof RegExp ? this.walk((I, w) => {
        if (I.type === "rule" && d.test(I.selector))
          return y(I, w);
      }) : this.walk((I, w) => {
        if (I.type === "rule" && I.selector === d)
          return y(I, w);
      }) : (y = d, this.walk((I, w) => {
        if (I.type === "rule")
          return y(I, w);
      }));
    }
  }
  return A.registerParse = (m) => {
    c = m;
  }, A.registerRule = (m) => {
    u = m;
  }, A.registerAtRule = (m) => {
    h = m;
  }, A.registerRoot = (m) => {
    p = m;
  }, Un = A, A.default = A, A.rebuild = (m) => {
    let d = [m];
    for (; d.length > 0; ) {
      let y = d.pop();
      if (y.type === "atrule" ? Object.setPrototypeOf(y, h.prototype) : y.type === "rule" ? Object.setPrototypeOf(y, u.prototype) : y.type === "decl" ? Object.setPrototypeOf(y, t.prototype) : y.type === "comment" ? Object.setPrototypeOf(y, e.prototype) : y.type === "root" && Object.setPrototypeOf(y, p.prototype), y[l] = !0, y.nodes)
        for (let I of y.nodes) d.push(I);
    }
  }, Un;
}
var Vn, ch;
function Po() {
  if (ch) return Vn;
  ch = 1;
  let e = /* @__PURE__ */ Kt();
  class t extends e {
    constructor(a) {
      super(a), this.type = "atrule";
    }
    append(...a) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...a);
    }
    prepend(...a) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...a);
    }
  }
  return Vn = t, t.default = t, e.registerAtRule(t), Vn;
}
var Gn, hh;
function No() {
  if (hh) return Gn;
  hh = 1;
  let e = /* @__PURE__ */ Kt(), t, i;
  class a extends e {
    constructor(h) {
      super({ type: "document", ...h }), this.nodes || (this.nodes = []);
    }
    toResult(h = {}) {
      return new t(new i(), this, h).stringify();
    }
  }
  return a.registerLazyResult = (l) => {
    t = l;
  }, a.registerProcessor = (l) => {
    i = l;
  }, Gn = a, a.default = a, Gn;
}
var Kn, uh;
function jx() {
  if (uh) return Kn;
  uh = 1;
  let e = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  return Kn = { nanoid: (a = 21) => {
    let l = "", h = a | 0;
    for (; h-- > 0; )
      l += e[Math.random() * 64 | 0];
    return l;
  }, customAlphabet: (a, l = 21) => (h = l) => {
    let c = "", p = h | 0;
    for (; p-- > 0; )
      c += a[Math.random() * a.length | 0];
    return c;
  } }, Kn;
}
var ef = /* @__PURE__ */ Va(ax), jn, ph;
function tf() {
  if (ph) return jn;
  ph = 1;
  let { existsSync: e, readFileSync: t, realpathSync: i } = Kx, { dirname: a, isAbsolute: l, join: h, relative: c, sep: p } = vo, { SourceMapConsumer: u, SourceMapGenerator: g } = /* @__PURE__ */ Fr();
  function b(d) {
    try {
      return i(d);
    } catch {
      return d;
    }
  }
  function A(d) {
    return K ? K.from(d, "base64").toString() : window.atob(d);
  }
  class m {
    constructor(y, I) {
      if (I.map === !1) return;
      I.unsafeMap && (this.unsafeMap = !0), this.loadAnnotation(y), this.inline = this.startWith(this.annotation, "data:");
      let w = I.map ? I.map.prev : void 0, v = this.loadMap(I.from, w);
      !this.mapFile && I.from && (this.mapFile = I.from), this.mapFile && (this.root = a(this.mapFile)), v && (this.text = v);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new u(this.json || this.text)), this.consumerCache;
    }
    decodeInline(y) {
      let I = /^data:application\/json;charset=utf-?8;base64,/, w = /^data:application\/json;base64,/, v = /^data:application\/json;charset=utf-?8,/, S = /^data:application\/json,/, P = y.match(v) || y.match(S);
      if (P)
        return decodeURIComponent(y.substr(P[0].length));
      let M = y.match(I) || y.match(w);
      if (M)
        return A(y.substr(M[0].length));
      let R = y.slice(22);
      throw R = R.slice(0, R.indexOf(",")), new Error("Unsupported source map encoding " + R);
    }
    getAnnotationURL(y) {
      return y.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(y) {
      return typeof y != "object" ? !1 : typeof y.mappings == "string" || typeof y._mappings == "string" || Array.isArray(y.sections);
    }
    loadAnnotation(y) {
      let I = y.match(/\/\*\s*# sourceMappingURL=/g);
      if (!I) return;
      let w = y.lastIndexOf(I.pop()), v = y.indexOf("*/", w);
      w > -1 && v > -1 && (this.annotation = this.getAnnotationURL(y.substring(w, v)));
    }
    loadFile(y, I, w) {
      if (!w && !this.unsafeMap) {
        if (!/\.map$/i.test(y) || !I) return;
        let v = c(b(a(I)), b(y));
        if (v === ".." || v.startsWith(".." + p) || l(v))
          return;
      }
      if (this.root = a(y), e(y))
        return this.mapFile = y, t(y, "utf-8").toString().trim();
    }
    loadMap(y, I) {
      if (I === !1) return !1;
      if (I) {
        if (typeof I == "string")
          return I;
        if (typeof I == "function") {
          let w = I(y);
          if (w) {
            let v = this.loadFile(w, y, !0);
            if (!v)
              throw new Error(
                "Unable to load previous source map: " + w.toString()
              );
            return v;
          }
        } else {
          if (I instanceof u)
            return g.fromSourceMap(I).toString();
          if (I instanceof g)
            return I.toString();
          if (this.isMap(I))
            return JSON.stringify(I);
          throw new Error(
            "Unsupported previous source map format: " + I.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let w = this.annotation;
          y && (w = h(a(y), w));
          let v = this.loadFile(w, y, !1);
          if (v)
            try {
              this.json = JSON.parse(v.replace(/^\)]}'[^\n]*\n/, ""));
            } catch {
              return;
            }
          return v;
        }
      }
    }
    startWith(y, I) {
      return y ? y.substr(0, I.length) === I : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return jn = m, m.default = m, jn;
}
var Wn, fh;
function Hr() {
  if (fh) return Wn;
  fh = 1;
  let { nanoid: e } = /* @__PURE__ */ jx(), { isAbsolute: t, resolve: i } = vo, { SourceMapConsumer: a, SourceMapGenerator: l } = /* @__PURE__ */ Fr(), { fileURLToPath: h, pathToFileURL: c } = ef, p = /* @__PURE__ */ To(), u = /* @__PURE__ */ tf(), g = /* @__PURE__ */ qp(), b = Symbol("lineToIndexCache"), A = !!(a && l), m = !!(i && t);
  function d(I) {
    if (I[b]) return I[b];
    let w = I.css.split(`
`), v = new Array(w.length), S = 0;
    for (let P = 0, M = w.length; P < M; P++)
      v[P] = S, S += w[P].length + 1;
    return I[b] = v, v;
  }
  class y {
    get from() {
      return this.file || this.id;
    }
    constructor(w, v = {}) {
      if (w === null || typeof w > "u" || typeof w == "object" && !w.toString)
        throw new Error(`PostCSS received ${w} instead of CSS string`);
      if (this.css = w.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, this.document = this.css, v.document && (this.document = v.document.toString()), v.from && (!m || /^\w+:\/\//.test(v.from) || t(v.from) ? this.file = v.from : this.file = i(v.from)), m && A) {
        let S = new u(this.css, v);
        if (S.text) {
          this.map = S;
          let P = S.consumer().file;
          !this.file && P && (this.file = this.mapResolve(P));
        }
      }
      this.file || (this.id = "<input css " + e(6) + ">"), this.map && (this.map.file = this.from);
    }
    error(w, v, S, P = {}) {
      let M, R, L, F, k;
      if (v && typeof v == "object") {
        let B = v, _ = S;
        if (typeof B.offset == "number") {
          F = B.offset;
          let U = this.fromOffset(F);
          v = U.line, S = U.col;
        } else
          v = B.line, S = B.column, F = this.fromLineAndColumn(v, S);
        if (typeof _.offset == "number") {
          L = _.offset;
          let U = this.fromOffset(L);
          R = U.line, M = U.col;
        } else
          R = _.line, M = _.column, L = this.fromLineAndColumn(_.line, _.column);
      } else if (S)
        F = this.fromLineAndColumn(v, S);
      else {
        F = v;
        let B = this.fromOffset(F);
        v = B.line, S = B.col;
      }
      let O = this.origin(v, S, R, M);
      return O ? k = new p(
        w,
        O.endLine === void 0 ? O.line : { column: O.column, line: O.line },
        O.endLine === void 0 ? O.column : { column: O.endColumn, line: O.endLine },
        O.source,
        O.file,
        P.plugin
      ) : k = new p(
        w,
        R === void 0 ? v : { column: S, line: v },
        R === void 0 ? S : { column: M, line: R },
        this.css,
        this.file,
        P.plugin
      ), k.input = {
        column: S,
        endColumn: M,
        endLine: R,
        endOffset: L,
        line: v,
        offset: F,
        source: this.css
      }, this.file && (c && (k.input.url = c(this.file).toString()), k.input.file = this.file), k;
    }
    fromLineAndColumn(w, v) {
      return d(this)[w - 1] + v - 1;
    }
    fromOffset(w) {
      let v = d(this), S = v[v.length - 1], P = 0;
      if (w >= S)
        P = v.length - 1;
      else {
        let M = v.length - 2, R;
        for (; P < M; )
          if (R = P + (M - P >> 1), w < v[R])
            M = R - 1;
          else if (w >= v[R + 1])
            P = R + 1;
          else {
            P = R;
            break;
          }
      }
      return {
        col: w - v[P] + 1,
        line: P + 1
      };
    }
    mapResolve(w) {
      return /^\w+:\/\//.test(w) ? w : i(this.map.consumer().sourceRoot || this.map.root || ".", w);
    }
    origin(w, v, S, P) {
      if (!this.map) return !1;
      let M = this.map.consumer(), R = M.originalPositionFor({ column: v - 1, line: w });
      if (!R.source) return !1;
      let L;
      if (typeof S == "number") {
        let B = M.originalPositionFor({
          column: P - 1,
          line: S
        });
        B.source && (L = B);
      }
      let F;
      t(R.source) ? F = c(R.source) : F = new URL(
        R.source,
        this.map.consumer().sourceRoot || c(this.map.mapFile)
      );
      let k = {
        column: R.column + 1,
        endColumn: L && L.column + 1,
        endLine: L && L.line,
        line: R.line,
        url: F.toString()
      };
      if (F.protocol === "file:")
        if (h)
          k.file = h(F);
        else
          throw new Error("file: protocol is not available in this PostCSS build");
      let O = M.sourceContentFor(R.source);
      return O && (k.source = O), k;
    }
    toJSON() {
      let w = {};
      for (let v of ["hasBOM", "css", "file", "id"])
        this[v] != null && (w[v] = this[v]);
      return this.map && (w.map = { ...this.map }, w.map.consumerCache && (w.map.consumerCache = void 0)), w;
    }
  }
  return Wn = y, y.default = y, g && g.registerInput && g.registerInput(y), Wn;
}
var Qn, dh;
function mi() {
  if (dh) return Qn;
  dh = 1;
  let e = /* @__PURE__ */ Kt(), t, i;
  class a extends e {
    constructor(h) {
      super(h), this.type = "root", this.nodes || (this.nodes = []);
    }
    normalize(h, c, p) {
      let u = /* @__PURE__ */ new Set();
      for (let b of Array.isArray(h) ? h : [h])
        b && typeof b == "object" && !b.parent && b.raws && typeof b.raws.before < "u" && u.add(b.raws);
      let g = super.normalize(h);
      if (c) {
        if (p === "prepend")
          this.nodes.length > 1 ? c.raws.before = this.nodes[1].raws.before : delete c.raws.before;
        else if (this.first !== c)
          for (let b of g)
            u.has(b.raws) || (b.raws.before = c.raws.before);
      }
      return g;
    }
    removeChild(h, c) {
      let p = this.index(h);
      return !c && p === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[p].raws.before), super.removeChild(h);
    }
    toResult(h = {}) {
      return new t(new i(), this, h).stringify();
    }
  }
  return a.registerLazyResult = (l) => {
    t = l;
  }, a.registerProcessor = (l) => {
    i = l;
  }, Qn = a, a.default = a, e.registerRoot(a), Qn;
}
var $n, mh;
function sf() {
  if (mh) return $n;
  mh = 1;
  let e = {
    comma(t) {
      return e.split(t, [","], !0);
    },
    space(t) {
      let i = [" ", `
`, "	"];
      return e.split(t, i);
    },
    split(t, i, a) {
      if (typeof t != "string") return [];
      let l = [], h = "", c = !1, p = 0, u = !1, g = "", b = !1;
      for (let m of t)
        if (b ? b = !1 : m === "\\" ? b = !0 : u ? m === g && (u = !1) : m === '"' || m === "'" ? (u = !0, g = m) : m === "(" ? p += 1 : m === ")" ? p > 0 && (p -= 1) : p === 0 && i.includes(m) && (c = !0), c) {
          let d = h.trim();
          (a || d !== "") && l.push(d), h = "", c = !1;
        } else
          h += m;
      let A = h.trim();
      return (a || A !== "") && l.push(A), l;
    }
  };
  return $n = e, e.default = e, $n;
}
var Hn, Ah;
function ko() {
  if (Ah) return Hn;
  Ah = 1;
  let e = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ sf();
  class i extends e {
    get selectors() {
      return t.comma(this.selector);
    }
    set selectors(l) {
      let h = this.selector ? this.selector.match(/,\s*/) : null, c = h ? h[0] : "," + this.raw("between", "beforeOpen");
      this.selector = l.join(c);
    }
    constructor(l) {
      super(l), this.type = "rule", this.nodes || (this.nodes = []);
    }
  }
  return Hn = i, i.default = i, e.registerRule(i), Hn;
}
var Yn, gh;
function Wx() {
  if (gh) return Yn;
  gh = 1;
  let e = /* @__PURE__ */ Po(), t = /* @__PURE__ */ Qr(), i = /* @__PURE__ */ $r(), a = /* @__PURE__ */ Hr(), l = /* @__PURE__ */ tf(), h = /* @__PURE__ */ mi(), c = /* @__PURE__ */ ko();
  function p(b, A) {
    return b.inputs ? b.inputs.map((m) => {
      let d = { ...m, __proto__: a.prototype };
      return d.map && (d.map = {
        ...d.map,
        __proto__: l.prototype
      }), d;
    }) : A;
  }
  function u(b, A, m) {
    let d = { ...b };
    if (delete d.inputs, delete d.nodes, d.source) {
      let { inputId: I, ...w } = d.source;
      d.source = w, I != null && (d.source.input = A[I]);
    }
    let y;
    if (d.type === "root")
      y = new h(d);
    else if (d.type === "decl")
      y = new i(d);
    else if (d.type === "rule")
      y = new c(d);
    else if (d.type === "comment")
      y = new t(d);
    else if (d.type === "atrule")
      y = new e(d);
    else
      throw new Error("Unknown node type: " + b.type);
    if (m) {
      y.nodes = m;
      for (let I of m) I.parent = y;
    }
    return y;
  }
  function g(b, A) {
    if (Array.isArray(b)) return b.map((y) => g(y));
    let m, d = [
      { childIndex: 0, children: [], inputs: p(b, A), json: b }
    ];
    for (; d.length > 0; ) {
      let y = d[d.length - 1], I = y.json.nodes;
      if (I && y.childIndex < I.length) {
        let v = I[y.childIndex];
        y.childIndex += 1, d.push({
          childIndex: 0,
          children: [],
          inputs: p(v, y.inputs),
          json: v
        });
        continue;
      }
      d.pop();
      let w = u(
        y.json,
        y.inputs,
        I ? y.children : void 0
      );
      d.length > 0 ? d[d.length - 1].children.push(w) : m = w;
    }
    return m;
  }
  return Yn = g, g.default = g, Yn;
}
var Jn, yh;
function rf() {
  if (yh) return Jn;
  yh = 1;
  let { dirname: e, relative: t, resolve: i, sep: a } = vo, { SourceMapConsumer: l, SourceMapGenerator: h } = /* @__PURE__ */ Fr(), { pathToFileURL: c } = ef, p = /* @__PURE__ */ Hr(), u = !!(l && h), g = !!(e && i && t && a);
  class b {
    constructor(m, d, y, I) {
      this.stringify = m, this.mapOpts = y.map || {}, this.root = d, this.opts = y, this.css = I, this.originalCSS = I, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let m;
      this.isInline() ? m = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? m = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? m = this.mapOpts.annotation(this.opts.to, this.root) : m = this.outputFile() + ".map";
      let d = `
`;
      this.css.includes(`\r
`) && (d = `\r
`), this.css += d + "/*# sourceMappingURL=" + m + " */";
    }
    applyPrevMaps() {
      for (let m of this.previous()) {
        let d = this.toUrl(this.path(m.file)), y = m.root || e(m.file), I;
        this.mapOpts.sourcesContent === !1 ? (I = new l(m.text), I.sourcesContent && (I.sourcesContent = null)) : I = m.consumer(), this.map.applySourceMap(I, d, this.toUrl(this.path(y)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1) {
        if (this.root) {
          let m;
          for (let d = this.root.nodes.length - 1; d >= 0; d--)
            m = this.root.nodes[d], m.type === "comment" && m.text.startsWith("# sourceMappingURL=") && this.root.removeChild(d);
        } else if (this.css) {
          let m = "/*# sourceMappingURL=", d;
          for (; (d = this.css.lastIndexOf(m)) !== -1; ) {
            let y = this.css.indexOf("*/", d + m.length);
            if (y === -1) break;
            for (; d > 0 && this.css[d - 1] === `
`; )
              d--;
            this.css = this.css.slice(0, d) + this.css.slice(y + 2);
          }
        }
      }
    }
    generate() {
      if (this.clearAnnotation(), g && u && this.isMap())
        return this.generateMap();
      {
        let m = "";
        return this.stringify(this.root, (d) => {
          m += d;
        }), [m];
      }
    }
    generateMap() {
      if (this.root)
        this.generateString();
      else if (this.previous().length === 1) {
        let m = this.previous()[0].consumer();
        m.file = this.outputFile(), this.map = h.fromSourceMap(m, {
          ignoreInvalidMapping: !0
        });
      } else
        this.map = new h({
          file: this.outputFile(),
          ignoreInvalidMapping: !0
        }), this.map.addMapping({
          generated: { column: 0, line: 1 },
          original: { column: 0, line: 1 },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
    }
    generateString() {
      this.css = "", this.map = new h({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      });
      let m = 1, d = 1, y = "<no source>", I = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ""
      }, w, v;
      this.stringify(this.root, (S, P, M) => {
        if (this.css += S, P && M !== "end" && (I.generated.line = m, I.generated.column = d - 1, P.source && P.source.start ? (I.source = this.sourcePath(P), I.original.line = P.source.start.line, I.original.column = P.source.start.column - 1, this.map.addMapping(I)) : (I.source = y, I.original.line = 1, I.original.column = 0, this.map.addMapping(I))), v = S.match(/\n/g), v ? (m += v.length, w = S.lastIndexOf(`
`), d = S.length - w) : d += S.length, P && M !== "start") {
          let R = P.parent || { raws: {} };
          (!(P.type === "decl" || P.type === "atrule" && !P.nodes) || P !== R.last || R.raws.semicolon) && (P.source && P.source.end ? (I.source = this.sourcePath(P), I.original.line = P.source.end.line, I.original.column = P.source.end.column - 1, I.generated.line = m, I.generated.column = d - 2, this.map.addMapping(I)) : (I.source = y, I.original.line = 1, I.original.column = 0, I.generated.line = m, I.generated.column = d - 1, this.map.addMapping(I)));
        }
      });
    }
    isAnnotation() {
      return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((m) => m.annotation) : !0;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u")
        return this.mapOpts.inline;
      let m = this.mapOpts.annotation;
      return typeof m < "u" && m !== !0 ? !1 : this.previous().length ? this.previous().some((d) => d.inline) : !0;
    }
    isMap() {
      return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((m) => m.withContent()) : !0;
    }
    outputFile() {
      return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
    }
    path(m) {
      if (this.mapOpts.absolute || m.charCodeAt(0) === 60 || /^\w+:\/\//.test(m)) return m;
      let d = this.memoizedPaths.get(m);
      if (d) return d;
      let y = this.opts.to ? e(this.opts.to) : ".";
      typeof this.mapOpts.annotation == "string" && (y = e(i(y, this.mapOpts.annotation)));
      let I = t(y, m);
      return this.memoizedPaths.set(m, I), I;
    }
    previous() {
      if (!this.previousMaps)
        if (this.previousMaps = [], this.root)
          this.root.walk((m) => {
            if (m.source && m.source.input.map) {
              let d = m.source.input.map;
              this.previousMaps.includes(d) || this.previousMaps.push(d);
            }
          });
        else {
          let m = new p(this.originalCSS, this.opts);
          m.map && this.previousMaps.push(m.map);
        }
      return this.previousMaps;
    }
    setSourcesContent() {
      let m = {};
      if (this.root)
        this.root.walk((d) => {
          if (d.source) {
            let y = d.source.input.from;
            if (y && !m[y]) {
              m[y] = !0;
              let I = this.usesFileUrls ? this.toFileUrl(y) : this.toUrl(this.path(y));
              this.map.setSourceContent(I, d.source.input.css);
            }
          }
        });
      else if (this.css) {
        let d = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(d, this.css);
      }
    }
    sourcePath(m) {
      return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(m.source.input.from) : this.toUrl(this.path(m.source.input.from));
    }
    toBase64(m) {
      return K ? K.from(m).toString("base64") : window.btoa(unescape(encodeURIComponent(m)));
    }
    toFileUrl(m) {
      let d = this.memoizedFileURLs.get(m);
      if (d) return d;
      if (c) {
        let y = c(m).toString();
        return this.memoizedFileURLs.set(m, y), y;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(m) {
      let d = this.memoizedURLs.get(m);
      if (d) return d;
      a === "\\" && (m = m.replace(/\\/g, "/"));
      let y = encodeURI(m).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(m, y), y;
    }
  }
  return Jn = b, Jn;
}
var Xn, Sh;
function Qx() {
  if (Sh) return Xn;
  Sh = 1;
  let e = /* @__PURE__ */ Po(), t = /* @__PURE__ */ Qr(), i = /* @__PURE__ */ $r(), a = /* @__PURE__ */ mi(), l = /* @__PURE__ */ ko(), h = /* @__PURE__ */ Zp();
  const c = {
    empty: !0,
    space: !0
  };
  function p(b) {
    for (let A = b.length - 1; A >= 0; A--) {
      let m = b[A], d = m[3] || m[2];
      if (d) return d;
    }
  }
  function u(b, A, m) {
    let d = "";
    for (let y = A; y < m; y++) d += b[y][1];
    return d;
  }
  class g {
    constructor(A) {
      this.input = A, this.root = new a(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: A, start: { column: 1, line: 1, offset: 0 } };
    }
    atrule(A) {
      let m = new e();
      m.name = A[1].slice(1), m.name === "" && this.unnamedAtrule(m, A), this.init(m, A[2]);
      let d, y, I, w = !1, v = !1, S = [], P = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (A = this.tokenizer.nextToken(), d = A[0], d === "(" || d === "[" ? P.push(d === "(" ? ")" : "]") : d === "{" && P.length > 0 ? P.push("}") : d === P[P.length - 1] && P.pop(), P.length === 0)
          if (d === ";") {
            m.source.end = this.getPosition(A[2]), m.source.end.offset++, this.semicolon = !0;
            break;
          } else if (d === "{") {
            v = !0;
            break;
          } else if (d === "}") {
            if (S.length > 0) {
              for (I = S.length - 1, y = S[I]; y && y[0] === "space"; )
                y = S[--I];
              y && (m.source.end = this.getPosition(y[3] || y[2]), m.source.end.offset++);
            }
            this.end(A);
            break;
          } else
            S.push(A);
        else
          S.push(A);
        if (this.tokenizer.endOfFile()) {
          w = !0;
          break;
        }
      }
      m.raws.between = this.spacesAndCommentsFromEnd(S), S.length ? (m.raws.afterName = this.spacesAndCommentsFromStart(S), this.raw(m, "params", S), w && (A = S[S.length - 1], m.source.end = this.getPosition(A[3] || A[2]), m.source.end.offset++, this.spaces = m.raws.between, m.raws.between = "")) : (m.raws.afterName = "", m.params = ""), v && (m.nodes = [], this.current = m);
    }
    checkMissedSemicolon(A) {
      let m = this.colon(A);
      if (m === !1) return;
      let d = 0, y;
      for (let I = m - 1; I >= 0 && (y = A[I], !(y[0] !== "space" && (d += 1, d === 2))); I--)
        ;
      throw this.input.error(
        "Missed semicolon",
        y[0] === "word" ? y[3] + 1 : y[2]
      );
    }
    colon(A) {
      let m = 0, d, y, I;
      for (let [w, v] of A.entries()) {
        if (y = v, I = y[0], I === "(" && (m += 1), I === ")" && (m -= 1), m === 0 && I === ":")
          if (!d)
            this.doubleColon(y);
          else {
            if (d[0] === "word" && d[1] === "progid")
              continue;
            return w;
          }
        d = y;
      }
      return !1;
    }
    comment(A) {
      let m = new t();
      this.init(m, A[2]), m.source.end = this.getPosition(A[3] || A[2]), m.source.end.offset++;
      let d = A[1].slice(2, -2);
      if (!d.trim())
        m.text = "", m.raws.left = d, m.raws.right = "";
      else {
        let y = d.match(/^(\s*)([^]*\S)(\s*)$/);
        m.text = y[2], m.raws.left = y[1], m.raws.right = y[3];
      }
    }
    createTokenizer() {
      this.tokenizer = h(this.input);
    }
    decl(A, m) {
      let d = new i();
      this.init(d, A[0][2]);
      let y = A[A.length - 1];
      y[0] === ";" && (this.semicolon = !0, A.pop()), d.source.end = this.getPosition(
        y[3] || y[2] || p(A)
      ), d.source.end.offset++;
      let I = 0;
      for (; A[I][0] !== "word"; )
        I === A.length - 1 && this.unknownWord([A[I]]), I++;
      d.raws.before += u(A, 0, I), d.source.start = this.getPosition(A[I][2]);
      let w = I;
      for (; I < A.length; ) {
        let L = A[I][0];
        if (L === ":" || L === "space" || L === "comment")
          break;
        I++;
      }
      d.prop = u(A, w, I);
      let v = I, S;
      for (; I < A.length && (S = A[I], I++, S[0] !== ":"); )
        S[0] === "word" && /\w/.test(S[1]) && this.unknownWord([S]);
      d.raws.between = u(A, v, I), (d.prop[0] === "_" || d.prop[0] === "*") && (d.raws.before += d.prop[0], d.prop = d.prop.slice(1));
      let P = I;
      for (; I < A.length; ) {
        let L = A[I][0];
        if (L !== "space" && L !== "comment") break;
        I++;
      }
      let M = A.slice(P, I);
      A = A.slice(I), this.precheckMissedSemicolon(A);
      for (let L = A.length - 1; L >= 0; L--) {
        if (S = A[L], S[1].toLowerCase() === "!important") {
          d.important = !0;
          let F = this.stringFrom(A, L);
          F = this.spacesFromEnd(A) + F, F !== " !important" && (d.raws.important = F);
          break;
        } else if (S[1].toLowerCase() === "important") {
          let F = A.slice(0), k = "";
          for (let O = L; O > 0; O--) {
            let B = F[O][0];
            if (k.trim().startsWith("!") && B !== "space")
              break;
            k = F.pop()[1] + k;
          }
          k.trim().startsWith("!") && (d.important = !0, d.raws.important = k, A = F);
        }
        if (S[0] !== "space" && S[0] !== "comment")
          break;
      }
      A.some((L) => L[0] !== "space" && L[0] !== "comment") && (d.raws.between += M.map((L) => L[1]).join(""), M = []), this.raw(d, "value", M.concat(A), m), d.value.includes(":") && !m && this.checkMissedSemicolon(A);
    }
    doubleColon(A) {
      throw this.input.error(
        "Double colon",
        { offset: A[2] },
        { offset: A[2] + A[1].length }
      );
    }
    emptyRule(A) {
      let m = new l();
      this.init(m, A[2]), m.selector = "", m.raws.between = "", this.current = m;
    }
    end(A) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(A[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(A);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    freeSemicolon(A) {
      if (this.spaces += A[1], this.current.nodes) {
        let m = this.current.nodes[this.current.nodes.length - 1];
        m && m.type === "rule" && !m.raws.ownSemicolon && (m.raws.ownSemicolon = this.spaces, this.spaces = "", m.source.end = this.getPosition(A[2]), m.source.end.offset++);
      }
    }
    // Helpers
    getPosition(A) {
      let m = this.input.fromOffset(A);
      return {
        column: m.col,
        line: m.line,
        offset: A
      };
    }
    init(A, m) {
      this.current.push(A), A.source = {
        input: this.input,
        start: this.getPosition(m)
      }, A.raws.before = this.spaces, this.spaces = "", A.type !== "comment" && (this.semicolon = !1);
    }
    other(A) {
      let m = !1, d = null, y = !1, I = null, w = [], v = A[1].startsWith("--"), S = [], P = A;
      for (; P; ) {
        if (d = P[0], S.push(P), d === "(" || d === "[")
          I || (I = P), w.push(d === "(" ? ")" : "]");
        else if (v && y && d === "{")
          I || (I = P), w.push("}");
        else if (w.length === 0)
          if (d === ";")
            if (y) {
              this.decl(S, v);
              return;
            } else
              break;
          else if (d === "{") {
            this.rule(S);
            return;
          } else if (d === "}") {
            this.tokenizer.back(S.pop()), m = !0;
            break;
          } else d === ":" && (y = !0);
        else d === w[w.length - 1] && (w.pop(), w.length === 0 && (I = null));
        P = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile() && (m = !0), w.length > 0 && this.unclosedBracket(I), m && y) {
        if (!v)
          for (; S.length && (P = S[S.length - 1][0], !(P !== "space" && P !== "comment")); )
            this.tokenizer.back(S.pop());
        this.decl(S, v);
      } else
        this.unknownWord(S);
    }
    parse() {
      let A;
      for (; !this.tokenizer.endOfFile(); )
        switch (A = this.tokenizer.nextToken(), A[0]) {
          case "space":
            this.spaces += A[1];
            break;
          case ";":
            this.freeSemicolon(A);
            break;
          case "}":
            this.end(A);
            break;
          case "comment":
            this.comment(A);
            break;
          case "at-word":
            this.atrule(A);
            break;
          case "{":
            this.emptyRule(A);
            break;
          default:
            this.other(A);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {
    }
    raw(A, m, d, y) {
      let I, w, v = d.length, S = "", P = !0, M, R;
      for (let L = 0; L < v; L += 1)
        I = d[L], w = I[0], w === "space" && L === v - 1 && !y ? P = !1 : w === "comment" ? (R = d[L - 1] ? d[L - 1][0] : "empty", M = d[L + 1] ? d[L + 1][0] : "empty", !c[R] && !c[M] ? S.slice(-1) === "," ? P = !1 : S += I[1] : P = !1) : S += I[1];
      if (!P) {
        let L = d.reduce((F, k) => F + k[1], "");
        A.raws[m] = { raw: L, value: S };
      }
      A[m] = S;
    }
    rule(A) {
      A.pop();
      let m = new l();
      this.init(m, A[0][2]), m.raws.between = this.spacesAndCommentsFromEnd(A), this.raw(m, "selector", A), this.current = m;
    }
    spacesAndCommentsFromEnd(A) {
      let m, d = "";
      for (; A.length && (m = A[A.length - 1][0], !(m !== "space" && m !== "comment")); )
        d = A.pop()[1] + d;
      return d;
    }
    // Errors
    spacesAndCommentsFromStart(A) {
      let m, d = "";
      for (; A.length && (m = A[0][0], !(m !== "space" && m !== "comment")); )
        d += A.shift()[1];
      return d;
    }
    spacesFromEnd(A) {
      let m, d = "";
      for (; A.length && (m = A[A.length - 1][0], m === "space"); )
        d = A.pop()[1] + d;
      return d;
    }
    stringFrom(A, m) {
      let d = "";
      for (let y = m; y < A.length; y++)
        d += A[y][1];
      return A.splice(m, A.length - m), d;
    }
    unclosedBlock() {
      let A = this.current.source.start;
      throw this.input.error("Unclosed block", A.line, A.column);
    }
    unclosedBracket(A) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: A[2] },
        { offset: A[2] + 1 }
      );
    }
    unexpectedClose(A) {
      throw this.input.error(
        "Unexpected }",
        { offset: A[2] },
        { offset: A[2] + 1 }
      );
    }
    unknownWord(A) {
      throw this.input.error(
        "Unknown word " + A[0][1],
        { offset: A[0][2] },
        { offset: A[0][2] + A[0][1].length }
      );
    }
    unnamedAtrule(A, m) {
      throw this.input.error(
        "At-rule without name",
        { offset: m[2] },
        { offset: m[2] + m[1].length }
      );
    }
  }
  return Xn = g, Xn;
}
var Zn, xh;
function Oo() {
  if (xh) return Zn;
  xh = 1;
  let e = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ Hr(), i = /* @__PURE__ */ Qx();
  function a(l, h) {
    let c = new t(l, h), p = new i(c);
    try {
      p.parse();
    } catch (u) {
      throw Gt.env.NODE_ENV !== "production" && u.name === "CssSyntaxError" && h && h.from && (/\.scss$/i.test(h.from) ? u.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(h.from) ? u.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(h.from) && (u.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), u;
    }
    return p.root;
  }
  return Zn = a, a.default = a, e.registerParse(a), Zn;
}
var qn, Ih;
function nf() {
  if (Ih) return qn;
  Ih = 1;
  let e = /* @__PURE__ */ Kt(), { my: t } = /* @__PURE__ */ jr();
  class i {
    constructor(l, h = {}) {
      if (this.type = "warning", this.text = l, h.node && h.node.source) {
        h.node[t] || e.rebuild(h.node);
        let c = h.node.rangeBy(h);
        this.line = c.start.line, this.column = c.start.column, this.endLine = c.end.line, this.endColumn = c.end.column;
      }
      for (let c in h) this[c] = h[c];
    }
    toString() {
      return this.node ? this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        word: this.word
      }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
    }
  }
  return qn = i, i.default = i, qn;
}
var zn, Eh;
function _o() {
  if (Eh) return zn;
  Eh = 1;
  let e = /* @__PURE__ */ nf();
  class t {
    get content() {
      return this.css;
    }
    constructor(a, l, h) {
      this.processor = a, this.messages = [], this.root = l, this.opts = h, this.css = "", this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(a, l = {}) {
      l.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (l.plugin = this.lastPlugin.postcssPlugin);
      let h = new e(a, l);
      return this.messages.push(h), h;
    }
    warnings() {
      return this.messages.filter((a) => a.type === "warning");
    }
  }
  return zn = t, t.default = t, zn;
}
var ea, bh;
function af() {
  if (bh) return ea;
  bh = 1;
  let e = {};
  return ea = function(i) {
    e[i] || (e[i] = !0, typeof console < "u" && console.warn && console.warn(i));
  }, ea;
}
var ta, wh;
function of() {
  if (wh) return ta;
  wh = 1;
  let e = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ No(), i = /* @__PURE__ */ rf(), a = /* @__PURE__ */ Oo(), l = /* @__PURE__ */ _o(), h = /* @__PURE__ */ mi(), c = /* @__PURE__ */ Kr(), { isClean: p, my: u } = /* @__PURE__ */ jr(), g = /* @__PURE__ */ af();
  const b = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule"
  }, A = {
    AtRule: !0,
    AtRuleExit: !0,
    Comment: !0,
    CommentExit: !0,
    Declaration: !0,
    DeclarationExit: !0,
    Document: !0,
    DocumentExit: !0,
    Once: !0,
    OnceExit: !0,
    postcssPlugin: !0,
    prepare: !0,
    Root: !0,
    RootExit: !0,
    Rule: !0,
    RuleExit: !0
  }, m = {
    Once: !0,
    postcssPlugin: !0,
    prepare: !0
  }, d = 0;
  function y(M) {
    return typeof M == "object" && typeof M.then == "function";
  }
  function I(M) {
    let R = !1, L = b[M.type];
    return M.type === "decl" ? R = M.prop.toLowerCase() : M.type === "atrule" && (R = M.name.toLowerCase()), R && M.append ? [
      L,
      L + "-" + R,
      d,
      L + "Exit",
      L + "Exit-" + R
    ] : R ? [L, L + "-" + R, L + "Exit", L + "Exit-" + R] : M.append ? [L, d, L + "Exit"] : [L, L + "Exit"];
  }
  function w(M) {
    let R;
    return M.type === "document" ? R = ["Document", d, "DocumentExit"] : M.type === "root" ? R = ["Root", d, "RootExit"] : R = I(M), {
      eventIndex: 0,
      events: R,
      iterator: 0,
      node: M,
      visitorIndex: 0,
      visitors: []
    };
  }
  function v(M) {
    let R = [M];
    for (; R.length > 0; ) {
      let L = R.pop();
      if (L[p] = !1, L.nodes)
        for (let F of L.nodes) R.push(F);
    }
    return M;
  }
  let S = {};
  class P {
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
    constructor(R, L, F) {
      this.stringified = !1, this.processed = !1;
      let k;
      if (typeof L == "object" && L !== null && (L.type === "root" || L.type === "document"))
        k = v(L);
      else if (L instanceof P || L instanceof l)
        k = v(L.root), L.map && (typeof F.map > "u" && (F.map = {}), F.map.inline || (F.map.inline = !1), F.map.prev = L.map);
      else {
        let O = a;
        F.syntax && (O = F.syntax.parse), F.parser && (O = F.parser), O.parse && (O = O.parse);
        try {
          k = O(L, F);
        } catch (B) {
          this.processed = !0, this.error = B;
        }
        k && !k[u] && e.rebuild(k);
      }
      this.result = new l(R, k, F), this.helpers = { ...S, postcss: S, result: this.result }, this.plugins = this.processor.plugins.map((O) => typeof O == "object" && O.prepare ? { ...O, ...O.prepare(this.result) } : O);
    }
    async() {
      return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
    }
    catch(R) {
      return this.async().catch(R);
    }
    finally(R) {
      return this.async().then(R, R);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(R, L) {
      let F = this.result.lastPlugin;
      try {
        if (L && L.addToError(R), this.error = R, R.name === "CssSyntaxError" && !R.plugin)
          R.plugin = F.postcssPlugin, R.setMessage();
        else if (F.postcssVersion && Gt.env.NODE_ENV !== "production") {
          let k = F.postcssPlugin, O = F.postcssVersion, B = this.result.processor.version, _ = O.split("."), U = B.split(".");
          (_[0] !== U[0] || parseInt(_[1]) > parseInt(U[1])) && console.error(
            "Unknown error from PostCSS plugin. Your current PostCSS version is " + B + ", but " + k + " uses " + O + ". Perhaps this is the source of the error below."
          );
        }
      } catch (k) {
        console && console.error && console.error(k);
      }
      return R;
    }
    prepareVisitors() {
      this.listeners = {};
      let R = (L, F, k) => {
        this.listeners[F] || (this.listeners[F] = []), this.listeners[F].push([L, k]);
      };
      for (let L of this.plugins)
        if (typeof L == "object")
          for (let F in L) {
            if (!A[F] && /^[A-Z]/.test(F))
              throw new Error(
                `Unknown event ${F} in ${L.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!m[F])
              if (typeof L[F] == "object")
                for (let k in L[F])
                  k === "*" ? R(L, F, L[F][k]) : R(
                    L,
                    F + "-" + k.toLowerCase(),
                    L[F][k]
                  );
              else typeof L[F] == "function" && R(L, F, L[F]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let R = 0; R < this.plugins.length; R++) {
        let L = this.plugins[R], F = this.runOnRoot(L);
        if (y(F))
          try {
            await F;
          } catch (k) {
            throw this.handleError(k);
          }
      }
      if (this.prepareVisitors(), this.hasListener) {
        let R = this.result.root;
        for (; !R[p]; ) {
          R[p] = !0;
          let L = [w(R)];
          for (; L.length > 0; ) {
            let F = this.visitTick(L);
            if (y(F))
              try {
                await F;
              } catch (k) {
                let O = L[L.length - 1].node;
                throw this.handleError(k, O);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [L, F] of this.listeners.OnceExit) {
            this.result.lastPlugin = L;
            try {
              if (R.type === "document") {
                let k = R.nodes.map(
                  (O) => F(O, this.helpers)
                );
                await Promise.all(k);
              } else
                await F(R, this.helpers);
            } catch (k) {
              throw this.handleError(k);
            }
          }
      }
      return this.processed = !0, this.stringify();
    }
    runOnRoot(R) {
      this.result.lastPlugin = R;
      try {
        if (typeof R == "object" && R.Once) {
          if (this.result.root.type === "document") {
            let L = this.result.root.nodes.map(
              (F) => R.Once(F, this.helpers)
            );
            return y(L[0]) ? Promise.all(L) : L;
          }
          return R.Once(this.result.root, this.helpers);
        } else if (typeof R == "function")
          return R(this.result.root, this.result);
      } catch (L) {
        throw this.handleError(L);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = !0, this.sync();
      let R = this.result.opts, L = c;
      R.syntax && (L = R.syntax.stringify), R.stringifier && (L = R.stringifier), L.stringify && (L = L.stringify);
      let F = this.result.root.source;
      if (R.map === void 0 && !(F && F.input && F.input.map)) {
        let B = "";
        return L(this.result.root, (_) => {
          B += _;
        }), this.result.css = B, this.result;
      }
      let O = new i(L, this.result.root, this.result.opts).generate();
      return this.result.css = O[0], this.result.map = O[1], this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      if (this.processed = !0, this.processing)
        throw this.getAsyncError();
      for (let R of this.plugins) {
        let L = this.runOnRoot(R);
        if (y(L))
          throw this.getAsyncError();
      }
      if (this.prepareVisitors(), this.hasListener) {
        let R = this.result.root;
        for (; !R[p]; )
          R[p] = !0, this.walkSync(R);
        if (this.listeners.OnceExit)
          if (R.type === "document")
            for (let L of R.nodes)
              this.visitSync(this.listeners.OnceExit, L);
          else
            this.visitSync(this.listeners.OnceExit, R);
      }
      return this.result;
    }
    then(R, L) {
      return Gt.env.NODE_ENV !== "production" && ("from" in this.opts || g(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(R, L);
    }
    toString() {
      return this.css;
    }
    visitSync(R, L) {
      for (let [F, k] of R) {
        this.result.lastPlugin = F;
        let O;
        try {
          O = k(L, this.helpers);
        } catch (B) {
          throw this.handleError(B, L.proxyOf);
        }
        if (L.type !== "root" && L.type !== "document" && !L.parent)
          return !0;
        if (y(O))
          throw this.getAsyncError();
      }
    }
    visitTick(R) {
      let L = R[R.length - 1], { node: F, visitors: k } = L;
      if (F.type !== "root" && F.type !== "document" && !F.parent) {
        R.pop();
        return;
      }
      if (k.length > 0 && L.visitorIndex < k.length) {
        let [B, _] = k[L.visitorIndex];
        L.visitorIndex += 1, L.visitorIndex === k.length && (L.visitors = [], L.visitorIndex = 0), this.result.lastPlugin = B;
        try {
          return _(F.toProxy(), this.helpers);
        } catch (U) {
          throw this.handleError(U, F);
        }
      }
      if (L.iterator !== 0) {
        let B = L.iterator;
        L.descending && (L.descending = !1, F.indexes[B] += 1);
        let _;
        for (; _ = F.nodes[F.indexes[B]]; ) {
          if (!_[p]) {
            _[p] = !0, L.descending = !0, R.push(w(_));
            return;
          }
          F.indexes[B] += 1;
        }
        L.iterator = 0, delete F.indexes[B];
      }
      let O = L.events;
      for (; L.eventIndex < O.length; ) {
        let B = O[L.eventIndex];
        if (L.eventIndex += 1, B === d) {
          F.nodes && F.nodes.length && (F[p] = !0, L.iterator = F.getIterator());
          return;
        } else if (this.listeners[B]) {
          L.visitors = this.listeners[B];
          return;
        }
      }
      R.pop();
    }
    walkSync(R) {
      R[p] = !0;
      let L = [{ eventIndex: 0, events: I(R), iterator: 0, node: R }];
      for (; L.length > 0; ) {
        let F = L[L.length - 1], k = F.node;
        if (F.iterator !== 0) {
          let O = F.iterator;
          F.descending && (F.descending = !1, k.indexes[O] += 1);
          let B, _ = !1;
          for (; B = k.nodes[k.indexes[O]]; ) {
            if (!B[p]) {
              B[p] = !0, F.descending = !0, L.push({
                eventIndex: 0,
                events: I(B),
                iterator: 0,
                node: B
              }), _ = !0;
              break;
            }
            k.indexes[O] += 1;
          }
          if (_) continue;
          F.iterator = 0, delete k.indexes[O];
        }
        if (F.eventIndex < F.events.length) {
          let O = F.events[F.eventIndex];
          if (F.eventIndex += 1, O === d)
            k.nodes && k.nodes.length && (F.iterator = k.getIterator());
          else {
            let B = this.listeners[O];
            B && this.visitSync(B, k.toProxy()) && L.pop();
          }
          continue;
        }
        L.pop();
      }
    }
    warnings() {
      return this.sync().warnings();
    }
  }
  return P.registerPostcss = (M) => {
    S = M;
  }, ta = P, P.default = P, h.registerLazyResult(P), t.registerLazyResult(P), ta;
}
var sa, Ch;
function $x() {
  if (Ch) return sa;
  Ch = 1;
  let e = /* @__PURE__ */ rf(), t = /* @__PURE__ */ Oo(), i = /* @__PURE__ */ _o(), a = /* @__PURE__ */ Kr(), l = /* @__PURE__ */ af();
  class h {
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root)
        return this._root;
      let p, u = t;
      try {
        p = u(this._css, this._opts);
      } catch (g) {
        this.error = g;
      }
      if (this.error)
        throw this.error;
      return this._root = p, p;
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
    constructor(p, u, g) {
      u = u.toString(), this.stringified = !1, this._processor = p, this._css = u, this._opts = g, this._map = void 0;
      let b = a;
      this.result = new i(this._processor, void 0, this._opts), this.result.css = u;
      let A = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return A.root;
        }
      });
      let m = new e(b, void 0, this._opts, u);
      if (m.isMap()) {
        let [d, y] = m.generate();
        d && (this.result.css = d), y && (this.result.map = y);
      } else
        m.clearAnnotation(), this.result.css = m.css;
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    catch(p) {
      return this.async().catch(p);
    }
    finally(p) {
      return this.async().then(p, p);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(p, u) {
      return Gt.env.NODE_ENV !== "production" && ("from" in this._opts || l(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(p, u);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
  }
  return sa = h, h.default = h, sa;
}
var ia, vh;
function Hx() {
  if (vh) return ia;
  vh = 1;
  let e = /* @__PURE__ */ No(), t = /* @__PURE__ */ of(), i = /* @__PURE__ */ $x(), a = /* @__PURE__ */ mi();
  class l {
    constructor(c = []) {
      this.version = "8.5.28", this.plugins = this.normalize(c);
    }
    normalize(c) {
      let p = [];
      for (let u of c)
        if (u.postcss === !0 ? u = u() : u.postcss && (u = u.postcss), typeof u == "object" && Array.isArray(u.plugins))
          p = p.concat(u.plugins);
        else if (typeof u == "object" && u.postcssPlugin)
          p.push(u);
        else if (typeof u == "function")
          p.push(u);
        else if (typeof u == "object" && (u.parse || u.stringify)) {
          if (Gt.env.NODE_ENV !== "production")
            throw new Error(
              "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
            );
        } else
          throw new Error(u + " is not a PostCSS plugin");
      return p;
    }
    process(c, p = {}) {
      return !this.plugins.length && !p.parser && !p.stringifier && !p.syntax ? new i(this, c, p) : new t(this, c, p);
    }
    use(c) {
      return this.plugins = this.plugins.concat(this.normalize([c])), this;
    }
  }
  return ia = l, l.default = l, a.registerProcessor(l), e.registerProcessor(l), ia;
}
var ra, Th;
function Yx() {
  if (Th) return ra;
  Th = 1;
  let e = /* @__PURE__ */ Po(), t = /* @__PURE__ */ Qr(), i = /* @__PURE__ */ Kt(), a = /* @__PURE__ */ To(), l = /* @__PURE__ */ $r(), h = /* @__PURE__ */ No(), c = /* @__PURE__ */ Wx(), p = /* @__PURE__ */ Hr(), u = /* @__PURE__ */ of(), g = /* @__PURE__ */ sf(), b = /* @__PURE__ */ Wr(), A = /* @__PURE__ */ Oo(), m = /* @__PURE__ */ Hx(), d = /* @__PURE__ */ _o(), y = /* @__PURE__ */ mi(), I = /* @__PURE__ */ ko(), w = /* @__PURE__ */ Kr(), v = /* @__PURE__ */ nf();
  function S(...P) {
    return P.length === 1 && Array.isArray(P[0]) && (P = P[0]), new m(P);
  }
  return S.plugin = function(M, R) {
    let L = !1;
    function F(...O) {
      console && console.warn && !L && (L = !0, console.warn(
        M + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
      ), Gt.env.LANG && Gt.env.LANG.startsWith("zh") && console.warn(
        M + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
      ));
      let B = R(...O);
      return B.postcssPlugin = M, B.postcssVersion = new m().version, B;
    }
    let k;
    return Object.defineProperty(F, "postcss", {
      get() {
        return k || (k = F()), k;
      }
    }), F.process = function(O, B, _) {
      return S([F(_)]).process(O, B);
    }, F;
  }, S.stringify = w, S.parse = A, S.fromJSON = c, S.list = g, S.comment = (P) => new t(P), S.atRule = (P) => new e(P), S.decl = (P) => new l(P), S.rule = (P) => new I(P), S.root = (P) => new y(P), S.document = (P) => new h(P), S.CssSyntaxError = a, S.Declaration = l, S.Container = i, S.Processor = m, S.Document = h, S.Comment = t, S.Warning = v, S.AtRule = e, S.Result = d, S.Input = p, S.Rule = I, S.Root = y, S.Node = b, u.registerPostcss(S), ra = S, S.default = S, ra;
}
var Jx = /* @__PURE__ */ Yx(), xe = /* @__PURE__ */ Eg(Jx);
xe.stringify;
xe.fromJSON;
xe.plugin;
xe.parse;
xe.list;
xe.document;
xe.comment;
xe.atRule;
xe.rule;
xe.decl;
xe.root;
xe.CssSyntaxError;
xe.Declaration;
xe.Container;
xe.Processor;
xe.Document;
xe.Comment;
xe.Warning;
xe.AtRule;
xe.Result;
xe.Input;
xe.Rule;
xe.Root;
xe.Node;
(li.posix || li).normalize;
(li.posix || li).join;
var Ph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Xx = new Uint8Array(64), Zx = new Uint8Array(128);
for (let e = 0; e < Ph.length; e++) {
  const t = Ph.charCodeAt(e);
  Xx[e] = t, Zx[t] = e;
}
var qx = Object.defineProperty, Nh = Object.getOwnPropertySymbols, zx = Object.prototype.hasOwnProperty, eI = Object.prototype.propertyIsEnumerable, kh = (e, t, i) => t in e ? qx(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Oh = (e, t) => {
  for (var i in t || (t = {}))
    zx.call(t, i) && kh(e, i, t[i]);
  if (Nh)
    for (var i of Nh(t))
      eI.call(t, i) && kh(e, i, t[i]);
  return e;
};
Oh(Oh({}, Ua), mo);
var tI = ss.parse;
const sI = /* @__PURE__ */ new Set(["loc", "start", "end", "extra", "leadingComments", "trailingComments", "innerComments", "range", "type"]), iI = /* @__PURE__ */ new Set([
  "data",
  "props",
  "computed",
  "methods",
  "watch",
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "activated",
  "deactivated",
  "beforeDestroy",
  "destroyed",
  "components",
  "directives",
  "filters",
  "mixins",
  "extends",
  "render",
  "template",
  "inject",
  "provide",
  "inheritAttrs",
  "functional",
  "model",
  "emits",
  "setup"
]), rI = /* @__PURE__ */ new Set(["beforeCreate", "created", "beforeMount", "mounted", "beforeDestroy", "destroyed"]), nI = /* @__PURE__ */ new Set(["methods", "computed"]), na = { beforeDestroy: "beforeUnmount", destroyed: "unmounted" }, Qi = {
  bind: "beforeMount",
  inserted: "mounted",
  update: null,
  componentUpdated: "updated",
  unbind: "unmounted"
}, aI = /* @__PURE__ */ new Set(["inserted", "componentUpdated", "unbind"]), oI = /* @__PURE__ */ new Set([
  ...Object.keys(Qi),
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeUnmount",
  "unmounted",
  "deep",
  "getSSRProps"
]), lI = {
  observable: ["GLOBAL_OBSERVABLE"],
  util: ["GLOBAL_PRIVATE_UTIL"]
}, cI = {
  component: "app.component()",
  use: "app.use()",
  mixin: "app.mixin()",
  directive: "app.directive()",
  nextTick: "import { nextTick } from 'vue'",
  observable: "import { reactive } from 'vue'",
  version: "import { version } from 'vue'",
  compile: "import { compile } from 'vue'",
  util: "nothing (private API removed)"
}, hI = {
  silent: ["CONFIG_SILENT"],
  devtools: ["CONFIG_DEVTOOLS"],
  optionMergeStrategies: ["CONFIG_OPTION_MERGE_STRATS"]
};
function xs(e) {
  return !!(e && (e.type === "FunctionExpression" || e.type === "ArrowFunctionExpression" || e.type === "ObjectMethod"));
}
function uI(e, t) {
  const i = xs(t) || t.type === "Identifier";
  switch (e) {
    case "data":
    case "provide":
    case "inject":
    case "props":
    case "emits":
      return i || t.type === "ObjectExpression" || t.type === "ArrayExpression";
    case "computed":
    case "methods":
    case "watch":
    case "components":
    case "directives":
    case "filters":
    case "model":
      return t.type === "ObjectExpression" || t.type === "Identifier";
    case "mixins":
      return t.type === "ArrayExpression";
    case "extends":
      return t.type === "Identifier" || t.type === "ObjectExpression";
    case "template":
      return t.type === "StringLiteral" || t.type === "TemplateLiteral";
    case "inheritAttrs":
    case "functional":
      return t.type === "BooleanLiteral";
    default:
      return i;
  }
}
function et(e) {
  let t = e;
  for (; t && (t.type === "TSAsExpression" || t.type === "TSSatisfiesExpression" || t.type === "TSTypeAssertion" || t.type === "TSNonNullExpression" || t.type === "ParenthesizedExpression"); )
    t = t.expression;
  return t;
}
function Je(e) {
  if (e.type !== "ObjectProperty" && e.type !== "ObjectMethod" && e.type !== "ClassMethod" || e.computed)
    return;
  const t = e.key;
  if (t.type === "Identifier") return t.name;
  if (t.type === "StringLiteral") return t.value;
}
function Ys(e) {
  return e.type === "ObjectMethod" ? e : e.value;
}
function aa(e) {
  if (!e.computed && e.property.type === "Identifier") return e.property.name;
  if (e.computed && e.property.type === "StringLiteral") return e.property.value;
}
function pI(e) {
  if (e) {
    if (e.type === "StringLiteral") return e.value;
    if (e.type === "TemplateLiteral" && e.expressions.length === 0) return e.quasis[0]?.value.cooked ?? void 0;
  }
}
function fI(e) {
  const t = ["decorators-legacy"];
  return (e === "ts" || e === "tsx") && t.push("typescript"), e !== "ts" && t.push("jsx"), t;
}
function lf(e, t, i) {
  let a;
  try {
    a = tI(t, {
      sourceType: "module",
      errorRecovery: !0,
      allowReturnOutsideFunction: !0,
      allowImportExportEverywhere: !0,
      allowAwaitOutsideFunction: !0,
      plugins: fI(i.lang)
    });
  } catch (l) {
    e.warn(`Could not parse script, skipped: ${l.message}`);
    return;
  }
  new dI(e, i).run(a);
}
class dI {
  constructor(t, i) {
    Ot(this, "vueNames", /* @__PURE__ */ new Set(["Vue"]));
    Ot(this, "components", /* @__PURE__ */ new WeakSet());
    Ot(this, "directives", /* @__PURE__ */ new WeakSet());
    Ot(this, "checked", /* @__PURE__ */ new WeakSet());
    this.ctx = t, this.options = i;
  }
  run(t) {
    for (const i of t.program.body)
      if (!(i.type !== "ImportDeclaration" || i.source.value !== "vue"))
        for (const a of i.specifiers)
          (a.type === "ImportDefaultSpecifier" || a.type === "ImportNamespaceSpecifier") && this.vueNames.add(a.local.name);
    this.walk(t.program, []);
  }
  start(t) {
    return (t.start ?? 0) + this.options.offset;
  }
  end(t) {
    return (t.end ?? 0) + this.options.offset;
  }
  report(t, i, a, l = {}) {
    this.ctx.report(t, this.start(i), this.end(i), a, l);
  }
  walk(t, i) {
    this.enter(t, i), i.push(t);
    for (const a of Object.keys(t)) {
      if (sI.has(a)) continue;
      const l = t[a];
      if (Array.isArray(l))
        for (const h of l)
          h && typeof h == "object" && typeof h.type == "string" && this.walk(h, i);
      else l && typeof l == "object" && typeof l.type == "string" && this.walk(l, i);
    }
    i.pop();
  }
  enter(t, i) {
    const a = i[i.length - 1];
    switch (t.type) {
      case "ImportDeclaration":
        this.checkImport(t);
        break;
      case "ExportDefaultDeclaration": {
        const l = et(t.declaration);
        l?.type === "ObjectExpression" && (this.options.isSfc || this.looksLikeComponent(l)) && this.components.add(l);
        break;
      }
      case "NewExpression":
        if (t.callee.type === "Identifier" && this.vueNames.has(t.callee.name)) {
          this.ctx.report(
            "global-mount",
            this.start(t),
            this.end(t.callee),
            "new Vue() is removed: create the app with createApp(App) and call app.mount()."
          );
          const l = et(t.arguments[0]);
          l?.type === "ObjectExpression" && this.components.add(l);
        }
        break;
      case "CallExpression":
        this.markCallContext(t);
        break;
      case "MemberExpression":
      case "OptionalMemberExpression":
        this.checkMember(t, a, i);
        break;
      case "ObjectExpression":
        this.checkObject(t);
        break;
      case "ClassDeclaration":
      case "ClassExpression":
        this.checkClass(t);
        break;
    }
  }
  checkImport(t) {
    const i = t.source.value;
    if (i === "@vue/composition-api") {
      this.report("composition-api-plugin", t.source, "@vue/composition-api is built into Vue 3: import these APIs from 'vue' and remove the plugin.");
      return;
    }
    if (i === "vue")
      for (const a of t.specifiers) {
        if (a.type !== "ImportSpecifier") continue;
        const l = a.imported.type === "Identifier" ? a.imported.name : a.imported.value;
        (l === "set" || l === "del") && this.report("set-delete", a, `"${l}" is exported by Vue 2.7 but not by Vue 3: assign or delete the property directly.`, {
          compatFlags: [l === "set" ? "GLOBAL_SET" : "GLOBAL_DELETE"]
        });
      }
  }
  markCallContext(t) {
    const i = t.callee, a = et(t.arguments[0]), l = et(t.arguments[1]);
    if (i.type === "Identifier" && i.name === "defineComponent" && a?.type === "ObjectExpression") {
      this.components.add(a);
      return;
    }
    if (i.type !== "MemberExpression") return;
    const h = aa(i), c = i.object.type === "Identifier" && this.vueNames.has(i.object.name);
    h === "directive" && l?.type === "ObjectExpression" && this.directives.add(l), c && (h === "component" && l?.type === "ObjectExpression" && this.components.add(l), (h === "extend" || h === "mixin") && a?.type === "ObjectExpression" && this.components.add(a));
  }
  checkMember(t, i, a) {
    const l = aa(t);
    if (l) {
      if (t.object.type === "Identifier" && this.vueNames.has(t.object.name)) {
        this.checkGlobal(t, l, i, a);
        return;
      }
      switch (l) {
        case "$listeners":
          this.report("listeners", t.property, "$listeners is removed: listeners are now included in $attrs.");
          break;
        case "$scopedSlots": {
          const h = t.computed ? void 0 : [{ start: this.start(t.property), end: this.end(t.property), text: "$slots" }];
          this.report("scoped-slots", t.property, "$scopedSlots is removed: use $slots, which now exposes slots as functions.", { fix: h });
          break;
        }
        case "$children":
          this.report("children", t.property, "$children is removed: use template refs to access child components.");
          break;
        case "$destroy":
          this.report("destroy", t.property, "$destroy is removed: unmount the app or remove the component with v-if.");
          break;
        case "$set":
        case "$delete":
          this.report("set-delete", t.property, `${l} is removed: ${l === "$set" ? "assign the property directly" : "use the delete operator"}, Vue 3 tracks it.`, {
            compatFlags: [l === "$set" ? "INSTANCE_SET" : "INSTANCE_DELETE"]
          });
          break;
        case "$attrs":
          this.report("attrs-class-style", t.property, "$attrs now also contains class and style (and listeners).");
          break;
        case "$on":
        case "$off":
        case "$once": {
          const h = i?.type === "CallExpression" && i.callee === t ? pI(i.arguments[0]) : void 0;
          h?.startsWith("hook:") ? this.report("hook-events", t.property, `${l}('${h}') no longer works: use the lifecycle hook directly, or @vue:${na[h.slice(5)] ?? h.slice(5)} on the parent template.`, {
            compatFlags: ["INSTANCE_EVENT_HOOKS", "INSTANCE_EVENT_EMITTER"]
          }) : this.report("event-emitter", t.property, `${l} is removed: instances are no longer event emitters (use props and emits, provide/inject, a store, or mitt).`);
          break;
        }
      }
    }
  }
  checkGlobal(t, i, a, l) {
    const h = t.object.name;
    switch (i) {
      case "set":
      case "delete":
        this.report("set-delete", t, `${h}.${i} is removed: ${i === "set" ? "assign the property directly" : "use the delete operator"}, Vue 3 tracks it.`, {
          compatFlags: [i === "set" ? "GLOBAL_SET" : "GLOBAL_DELETE"]
        });
        return;
      case "extend":
        this.report("global-extend", t, `${h}.extend is removed: use defineComponent() or the extends option.`);
        return;
      case "prototype":
        this.report("global-prototype", t, `${h}.prototype is removed: use app.config.globalProperties or provide/inject.`);
        return;
      case "filter":
        this.report("filters", t, `${h}.filter is removed: expose a helper through app.config.globalProperties or import a function.`, {
          compatFlags: ["FILTERS"]
        });
        return;
      case "config":
        this.checkConfig(t, a, l);
        return;
    }
    const c = cI[i];
    c && this.report("global-api", t, `${h}.${i} is removed from the global API: use ${c}.`, {
      compatFlags: lI[i] ?? []
    });
  }
  checkConfig(t, i, a) {
    const l = i && (i.type === "MemberExpression" || i.type === "OptionalMemberExpression") && i.object === t ? aa(i) : void 0, h = l && i ? i : t;
    switch (l) {
      case "productionTip": {
        const c = a[a.length - 2], p = a[a.length - 3];
        let u;
        c?.type === "AssignmentExpression" && c.left === i && p?.type === "ExpressionStatement" && (u = [this.removeStatement(p)]), this.report("config-production-tip", h, "Vue.config.productionTip is removed: delete this line.", { fix: u });
        return;
      }
      case "ignoredElements":
        this.report("config-ignored-elements", h, "Vue.config.ignoredElements is removed: use compilerOptions.isCustomElement (a function).");
        return;
      case "keyCodes":
        this.report("config-key-codes", h, "Vue.config.keyCodes is removed: use kebab-case key names in v-on modifiers.");
        return;
      default:
        this.report("global-config", h, `Vue.config${l ? `.${l}` : ""} is not available in Vue 3: use app.config on the instance returned by createApp().`, {
          compatFlags: l ? hI[l] ?? [] : []
        });
    }
  }
  /** Removes a statement and, when it is alone on its line, the whole line. */
  removeStatement(t) {
    const i = this.ctx.text;
    let a = this.start(t), l = this.end(t);
    const h = i.lastIndexOf(`
`, a - 1) + 1;
    let c = l;
    for (; i[c] === " " || i[c] === "	"; ) c++;
    return i.slice(h, a).trim() === "" && (i[c] === "\r" && c++, (i[c] === `
` || c >= i.length) && (a = h, l = Math.min(c + 1, i.length))), { start: a, end: l, text: "" };
  }
  looksLikeComponent(t) {
    let i = 0, a = !1;
    for (const l of t.properties) {
      const h = Je(l);
      if (!h || !iI.has(h)) continue;
      const c = Ys(l);
      uI(h, et(c) ?? c) && (i++, rI.has(h) && xs(c) && (a = !0), nI.has(h) && c.type === "ObjectExpression" && (a = !0));
    }
    return i >= 2 || a;
  }
  looksLikeDirective(t) {
    if (t.properties.length === 0) return !1;
    let i = !1, a = !1, l = !1;
    for (const h of t.properties) {
      const c = Je(h);
      if (!c || !oI.has(c)) return !1;
      c in Qi && (i = !0), aI.has(c) && (a = !0);
      const p = Ys(h);
      if (xs(p)) {
        const u = p.params[0];
        u?.type === "Identifier" && u.name === "el" && (l = !0);
      }
    }
    return i && (a || l);
  }
  checkObject(t) {
    this.checked.has(t) || (this.components.has(t) || this.looksLikeComponent(t) ? (this.checked.add(t), this.checkComponent(t)) : (this.directives.has(t) || this.looksLikeDirective(t)) && (this.checked.add(t), this.checkDirective(t)));
  }
  /** Builds an edit that renames an object key, keeping shorthand properties valid. */
  renameKey(t, i) {
    if (t.type !== "ObjectProperty" && t.type !== "ObjectMethod" && t.type !== "ClassMethod" || t.computed) return;
    const a = t.key;
    if (t.type === "ObjectProperty" && t.shorthand && a.type === "Identifier")
      return [{ start: this.start(t), end: this.end(t), text: `${i}: ${a.name}` }];
    if (a.type === "Identifier") return [{ start: this.start(a), end: this.end(a), text: i }];
    if (a.type === "StringLiteral") return [{ start: this.start(a) + 1, end: this.end(a) - 1, text: i }];
  }
  checkComponent(t) {
    const i = new Set(t.properties.map((l) => Je(l)).filter(Boolean)), a = t.properties.filter((l) => l.type === "ObjectProperty" || l.type === "ObjectMethod");
    for (const l of a) {
      const h = Je(l);
      if (!h) continue;
      const c = Ys(l);
      switch (h) {
        case "beforeDestroy":
        case "destroyed": {
          if (!xs(c) && c.type !== "Identifier") break;
          const p = na[h];
          this.report("destroy-hooks", l.key, `${h} is renamed to ${p} and is ignored by Vue 3.`, {
            compatFlags: [h === "beforeDestroy" ? "OPTIONS_BEFORE_DESTROY" : "OPTIONS_DESTROYED"],
            fix: i.has(p) ? void 0 : this.renameKey(l, p)
          });
          break;
        }
        case "data":
          et(c)?.type === "ObjectExpression" && this.report("data-object", l.key, "data must be a function: use data() { return { ... } }.");
          break;
        case "filters":
          if (c.type === "ObjectExpression")
            for (const p of c.properties) {
              const u = Je(p);
              u && this.report("filters", p.key, `Local filter "${u}" is removed: turn it into a method or a computed property.`, {
                compatFlags: ["FILTERS"]
              });
            }
          break;
        case "functional":
          c.type === "BooleanLiteral" && c.value && this.report("functional-components", l, "functional: true is removed: use a regular component or a plain function.");
          break;
        case "model":
          c.type === "ObjectExpression" && this.report("component-v-model", l.key, "The model option is removed: v-model now uses the modelValue prop and the update:modelValue event (or v-model:name arguments).");
          break;
        case "props":
          this.options.emitsInput && !i.has("model") && this.checkValueProp(c);
          break;
        case "render":
          if (xs(c)) {
            const p = c.params[0];
            p && this.report("render-function-h", p, `render(${p.type === "Identifier" ? p.name : "h"}) no longer receives h: import { h } from 'vue' and update the VNode props format.`);
          }
          break;
        case "directives":
          if (c.type === "ObjectExpression")
            for (const p of c.properties) {
              if (p.type !== "ObjectProperty") continue;
              const u = et(p.value);
              u?.type === "ObjectExpression" && this.directives.add(u);
            }
          break;
        case "watch":
          c.type === "ObjectExpression" && this.checkWatch(t, c);
          break;
        case "template": {
          const p = et(c);
          if (!this.options.onTemplateString || !p) break;
          if (p.type === "StringLiteral" && String(p.extra?.raw ?? "").slice(1, -1) === p.value)
            this.options.onTemplateString(p.value, this.start(p) + 1);
          else if (p.type === "TemplateLiteral" && p.expressions.length === 0) {
            const u = p.quasis[0];
            u && u.value.raw === u.value.cooked && this.options.onTemplateString(u.value.raw, this.start(u));
          }
          break;
        }
      }
    }
  }
  checkValueProp(t) {
    const i = et(t), a = `Prop "value" combined with $emit('input'): v-model on components now passes modelValue and listens to update:modelValue.`;
    if (i?.type === "ArrayExpression")
      for (const l of i.elements)
        l?.type === "StringLiteral" && l.value === "value" && this.report("component-v-model", l, a);
    else if (i?.type === "ObjectExpression")
      for (const l of i.properties)
        Je(l) === "value" && this.report("component-v-model", l.key, a);
  }
  checkWatch(t, i) {
    const a = this.arrayDataKeys(t);
    if (a.size !== 0)
      for (const l of i.properties) {
        const h = Je(l);
        if (!h || !a.has(h)) continue;
        const c = et(Ys(l));
        c?.type === "ObjectExpression" && c.properties.some((u) => Je(u) === "deep" && u.type === "ObjectProperty" && u.value.type === "BooleanLiteral" && u.value.value) || this.report("watch-array", l.key, `"${h}" is an array: this watcher only fires when the array is replaced. Add deep: true to react to mutations.`);
      }
  }
  arrayDataKeys(t) {
    const i = /* @__PURE__ */ new Set(), a = t.properties.find((c) => Je(c) === "data");
    if (!a) return i;
    const l = Ys(a);
    let h;
    if (l.type === "ArrowFunctionExpression" && l.body.type !== "BlockStatement")
      h = et(l.body);
    else if (xs(l)) {
      const c = l.body;
      if (c.type === "BlockStatement") {
        const p = c.body.find((u) => u.type === "ReturnStatement");
        h = et(p?.argument);
      }
    }
    if (h?.type !== "ObjectExpression") return i;
    for (const c of h.properties) {
      const p = Je(c);
      p && c.type === "ObjectProperty" && et(c.value)?.type === "ArrayExpression" && i.add(p);
    }
    return i;
  }
  checkDirective(t) {
    const i = new Set(t.properties.map((a) => Je(a)).filter(Boolean));
    for (const a of t.properties) {
      const l = Je(a);
      if (!l || !(l in Qi)) continue;
      const h = Qi[l], c = a.key;
      if (h === null) {
        this.report("directive-hooks", c, "The update directive hook is removed: use updated (or beforeUpdate) instead.", { compatFlags: ["CUSTOM_DIR"] });
        continue;
      }
      this.report("directive-hooks", c, `Directive hook ${l} is renamed to ${h}.`, {
        fix: i.has(h) ? void 0 : this.renameKey(a, h)
      });
    }
  }
  checkClass(t) {
    const i = (t.decorators ?? []).some((c) => {
      const p = c.expression.type === "CallExpression" ? c.expression.callee : c.expression;
      return p.type === "Identifier" && (p.name === "Component" || p.name === "Options");
    }), a = t.superClass, l = a?.type === "Identifier" && this.vueNames.has(a.name) || a?.type === "CallExpression" && a.callee.type === "Identifier" && a.callee.name === "Mixins";
    if (!i && !l) return;
    const h = new Set(t.body.body.map((c) => Je(c)).filter(Boolean));
    for (const c of t.body.body) {
      if (c.type !== "ClassMethod") continue;
      const p = Je(c);
      if (p === "beforeDestroy" || p === "destroyed") {
        const u = na[p];
        this.report("destroy-hooks", c.key, `${p} is renamed to ${u} and is ignored by Vue 3.`, {
          compatFlags: [p === "beforeDestroy" ? "OPTIONS_BEFORE_DESTROY" : "OPTIONS_DESTROYED"],
          fix: h.has(u) ? void 0 : this.renameKey(c, u)
        });
      } else p === "render" && c.params[0] && this.report("render-function-h", c.params[0], "render(h) no longer receives h: import { h } from 'vue'.");
    }
  }
}
const mI = /<(?:transition|transition-group|Transition|TransitionGroup)\b[^>]*?\sname\s*=\s*["']([A-Za-z_][\w-]*)["']/g, AI = /\.([A-Za-z_][\w-]*?)-(?:enter|leave)-(?:active|to)(?![\w-])/g, gI = /\.([A-Za-z_][\w-]*?)-(enter|leave)(?![\w-])/g;
function yI(e, t) {
  for (const i of e.matchAll(mI)) t.add(i[1]);
  for (const i of e.matchAll(AI)) t.add(i[1]);
}
function SI(e) {
  return e.replace(/\/\*[\s\S]*?\*\//g, (t) => t.replace(/[^\r\n]/g, " "));
}
function cf(e, t, i, a) {
  const l = SI(t);
  for (const h of l.matchAll(gI)) {
    const c = h[1];
    if (!a.has(c)) continue;
    const p = i + (h.index ?? 0), u = p + h[0].length, g = `${h[0]}-from`;
    e.report("transition-classes", p, u, `${h[0]} is renamed to ${g} in Vue 3.`, {
      fix: [{ start: u, end: u, text: "-from" }]
    });
  }
}
const xI = /[\w).+\-_$\]]/;
function II(e) {
  const t = [];
  let i = !1, a = !1, l = !1, h = !1, c = 0, p = 0, u = 0, g = 0, b = 0;
  for (let A = 0; A < e.length; A++)
    if (b = g, g = e.charCodeAt(A), i)
      g === 39 && b !== 92 && (i = !1);
    else if (a)
      g === 34 && b !== 92 && (a = !1);
    else if (l)
      g === 96 && b !== 92 && (l = !1);
    else if (h)
      g === 47 && b !== 92 && (h = !1);
    else if (g === 124 && e.charCodeAt(A + 1) !== 124 && e.charCodeAt(A - 1) !== 124 && c === 0 && p === 0 && u === 0)
      t.push(A);
    else {
      switch (g) {
        case 34:
          a = !0;
          break;
        case 39:
          i = !0;
          break;
        case 96:
          l = !0;
          break;
        case 40:
          u++;
          break;
        case 41:
          u--;
          break;
        case 91:
          p++;
          break;
        case 93:
          p--;
          break;
        case 123:
          c++;
          break;
        case 125:
          c--;
          break;
      }
      if (g === 47) {
        let m = A - 1, d = "";
        for (; m >= 0 && (d = e.charAt(m), d === " "); m--)
          ;
        (!d || !xI.test(d)) && (h = !0);
      }
    }
  return t.map((A, m) => {
    const d = m + 1 < t.length ? t[m + 1] : e.length, y = e.slice(A + 1, d).trim(), I = y.indexOf("(");
    return { name: (I === -1 ? y : y.slice(0, I)).trim(), offset: A };
  });
}
const hf = 1, uf = 4, EI = 5, or = 6, Yr = 7, bI = 3, wI = {
  8: "backspace",
  9: "tab",
  13: "enter",
  27: "esc",
  32: "space",
  37: "left",
  38: "up",
  39: "right",
  40: "down"
}, CI = {
  beforeDestroy: "beforeUnmount",
  destroyed: "unmounted"
}, pf = /* @__PURE__ */ new Set(["transition", "Transition", "transition-group", "TransitionGroup"]), vI = /* @__PURE__ */ new Set(["transition-group", "TransitionGroup"]), lr = {
  "enter-class": "enter-from-class",
  "leave-class": "leave-from-class",
  enterClass: "enterFromClass",
  leaveClass: "leaveFromClass"
}, TI = /(?<![\w$.])\$(listeners|scopedSlots|children|attrs|set|delete|destroy|on|off|once)\b/g;
function ff(e) {
  return typeof e == "string" ? e : e.content;
}
function ci(e) {
  const t = e.arg;
  return t && t.type === uf && t.isStatic ? t : void 0;
}
function PI(e, t) {
  return e.type === Yr && e.name === t;
}
function NI(e, t) {
  return e.props.some(
    (i) => i.type === or && i.name === t || i.type === Yr && i.name === "bind" && ci(i)?.content === t
  );
}
function _h(e, t) {
  return e.props.find((i) => PI(i, t));
}
function df(e, t) {
  for (const i of t.children) mf(e, i);
}
function mf(e, t) {
  if (t.type === EI) {
    Jr(e, t.content, !0);
    return;
  }
  if (t.type === hf) {
    kI(e, t);
    for (const i of t.children) mf(e, i);
  }
}
function Jr(e, t, i) {
  if (!t || t.type !== uf) return;
  const a = t.loc.source, l = t.loc.start.offset;
  if (i)
    for (const h of II(a)) {
      const c = l + h.offset;
      e.report(
        "filters",
        c,
        c + 1,
        `Filter "${h.name}" used in a template expression. Call a method or use a computed property instead.`,
        { compatFlags: ["COMPILER_FILTERS"] }
      );
    }
  for (const h of a.matchAll(TI)) {
    const c = h[1], p = l + (h.index ?? 0), u = p + h[0].length;
    switch (c) {
      case "listeners":
        e.report("listeners", p, u, "$listeners is removed: listeners are now included in $attrs.");
        break;
      case "scopedSlots":
        e.report("scoped-slots", p, u, "$scopedSlots is removed: use $slots, which now exposes slots as functions.", {
          fix: [{ start: p, end: u, text: "$slots" }]
        });
        break;
      case "children":
        e.report("children", p, u, "$children is removed: use template refs.");
        break;
      case "attrs":
        e.report("attrs-class-style", p, u, "$attrs now also contains class and style.");
        break;
      case "set":
      case "delete":
        e.report("set-delete", p, u, `$${c} is removed: assign or delete the property directly.`, {
          compatFlags: [c === "set" ? "INSTANCE_SET" : "INSTANCE_DELETE"]
        });
        break;
      case "destroy":
        e.report("destroy", p, u, "$destroy is removed.");
        break;
      default:
        e.report("event-emitter", p, u, `$${c} is removed: instances are no longer event emitters.`);
    }
  }
}
function kI(e, t) {
  const i = t.props, a = _h(t, "for"), l = _h(t, "if");
  if (a && l && e.report(
    "v-if-v-for",
    l.loc.start.offset,
    l.loc.end.offset,
    "v-if and v-for on the same element: in Vue 3 v-if runs first and cannot see the loop variable."
  ), a && t.tag === "template" && t.tagType === bI)
    for (const h of t.children) {
      if (h.type !== hf) continue;
      const c = h.props.find(
        (p) => p.type === or && p.name === "key" || p.type === Yr && p.name === "bind" && ci(p)?.content === "key"
      );
      c && e.report(
        "template-v-for-key",
        c.loc.start.offset,
        c.loc.end.offset,
        "Move this key to the parent <template v-for>: keys on children of <template v-for> are a compile error in Vue 3."
      );
    }
  vI.has(t.tag) && !NI(t, "tag") && e.report(
    "transition-group-root",
    t.loc.start.offset,
    t.loc.start.offset + t.tag.length + 1,
    "<transition-group> without a tag prop no longer renders a wrapper <span>."
  ), i.forEach((h, c) => {
    if (h.type === or) {
      OI(e, t, h);
      return;
    }
    switch (h.name) {
      case "bind":
        _I(e, t, h, i.slice(0, c));
        break;
      case "on":
        DI(e, h);
        break;
      case "slot":
      case "for":
        break;
      default:
        Jr(e, h.exp, !1);
    }
  });
}
function OI(e, t, i) {
  const a = i.loc.start.offset, l = a + i.name.length;
  switch (i.name) {
    case "inline-template":
      e.report("inline-template", a, l, "inline-template is removed: move the markup into the component or pass it as a slot.");
      break;
    case "slot":
      t.tag !== "slot" && e.report("deprecated-slot-syntax", a, l, "The slot attribute is removed: use v-slot (or #name) on a <template>.");
      break;
    case "slot-scope":
      e.report("deprecated-slot-syntax", a, l, 'slot-scope is removed: use v-slot="props" (or #name="props").');
      break;
    case "scope":
      t.tag === "template" && e.report("deprecated-slot-syntax", a, l, 'The scope attribute is removed: use v-slot="props".');
      break;
    case "is":
      t.tag !== "component" && !(i.value?.content ?? "").startsWith("vue:") && e.report(
        "is-on-element",
        a,
        i.loc.end.offset,
        `is="${i.value?.content ?? ""}" on <${t.tag}> creates a customized built-in element in Vue 3. Use is="vue:${i.value?.content ?? ""}" to render a component.`
      );
      break;
    default:
      if (pf.has(t.tag) && lr[i.name]) {
        const h = lr[i.name];
        e.report("transition-classes", a, l, `${i.name} is renamed to ${h}.`, {
          fix: [{ start: a, end: l, text: h }]
        });
      }
  }
}
function _I(e, t, i, a) {
  const l = i.loc.start.offset, h = i.modifiers.map(ff), c = ci(i), p = i.rawName ?? "";
  if (Jr(e, i.exp, !0), h.includes("sync")) {
    const u = i.exp, g = !!(c && u && h.length === 1 && p && e.text.startsWith(p, l));
    e.report(
      "sync-modifier",
      l,
      l + (p.length || 1),
      c ? `.sync is removed: use v-model:${c.content}="${u?.content ?? ""}" instead.` : "v-bind.sync with an object is removed: use one v-model:prop per property.",
      g && c ? { fix: [{ start: l, end: l + p.length, text: `v-model:${c.content}` }] } : {}
    );
  }
  if (!i.arg && i.exp && !h.includes("sync")) {
    const u = a.map((g) => g.type === or ? g.name : g.type === Yr && g.name === "bind" ? ci(g)?.content : void 0).filter((g) => !!g && !["class", "style", "key", "ref"].includes(g));
    u.length > 0 && e.report(
      "v-bind-object-order",
      l,
      i.loc.end.offset,
      `v-bind="${i.exp.content}" comes after ${u.join(", ")}: in Vue 3 the object now overrides those attributes. Move it first to keep Vue 2 behavior.`
    );
  }
  if (c?.content === "is" && t.tag !== "component" && e.report("is-on-element", l, i.loc.end.offset, `:is on <${t.tag}> only renders a component with a "vue:" prefixed value in Vue 3.`), c && c.content === "slot" && t.tag !== "slot" && e.report("deprecated-slot-syntax", l, l + (p.length || 1), "The slot attribute is removed: use v-slot (or #name) on a <template>."), c && pf.has(t.tag) && lr[c.content]) {
    const u = lr[c.content];
    e.report("transition-classes", c.loc.start.offset, c.loc.end.offset, `${c.content} is renamed to ${u}.`, {
      fix: [{ start: c.loc.start.offset, end: c.loc.end.offset, text: u }]
    });
  }
}
function DI(e, t) {
  Jr(e, t.exp, !1);
  const i = ci(t);
  for (const a of t.modifiers) {
    const l = ff(a), h = typeof a == "string" ? void 0 : a.loc, c = h ? h.start.offset : t.loc.start.offset, p = h ? h.end.offset : t.loc.end.offset;
    if (l === "native")
      e.report(
        "native-modifier",
        c - 1,
        p,
        '.native is removed: declare the events the child emits with "emits", other listeners fall through to its root element.'
      );
    else if (/^\d+$/.test(l)) {
      const u = wI[l];
      e.report(
        "keycode-modifiers",
        c - 1,
        p,
        u ? `KeyCode modifier .${l} is removed: use .${u}.` : `KeyCode modifier .${l} is removed: use the kebab-case key name instead.`,
        u && h ? { fix: [{ start: c, end: p, text: u }] } : {}
      );
    }
  }
  if (i && i.content.startsWith("hook:")) {
    const a = i.content.slice(5), l = `vue:${CI[a] ?? a}`;
    e.report("hook-events", i.loc.start.offset, i.loc.end.offset, `@${i.content} is now @${l}.`, {
      fix: [{ start: i.loc.start.offset, end: i.loc.end.offset, text: l }]
    });
  }
}
const Af = /\$emit\(\s*['"`]input['"`]/;
function BI(e) {
  return e === "ts" || e === "tsx" || e === "jsx" ? e : "js";
}
function LI(e, t, i) {
  const { descriptor: a, errors: l } = cS(e.text, { filename: e.file, sourceMap: !1 }), h = l.filter((u) => !(typeof u == "string" ? u : u.message).includes("<template functional>"));
  if (h.length > 0) {
    const u = h[0];
    e.warn(`Parse error, results may be incomplete: ${typeof u == "string" ? u : u.message}`);
  }
  const c = a.template;
  if (c && (c.src ? e.warn(`Template loaded from "${c.src}" was not scanned.`) : c.lang && c.lang !== "html" ? e.warn(`Skipped <template lang="${c.lang}">: only HTML templates are analyzed. Script and style checks still ran.`) : c.ast && df(e, c.ast), c.attrs.functional)) {
    const u = e.text.lastIndexOf("<template", c.loc.start.offset), g = e.text.indexOf("functional", u), b = g === -1 || g > c.loc.start.offset ? u : g;
    e.report(
      "functional-components",
      b,
      b + 10,
      "<template functional> is removed: use a regular component (or a plain function)."
    );
  }
  const p = Af.test(e.text);
  for (const u of [a.script, a.scriptSetup])
    !u || u.src || lf(e, u.content, {
      offset: u.loc.start.offset,
      lang: BI(u.lang),
      isSfc: u === a.script,
      emitsInput: p,
      onTemplateString: i
    });
  for (const u of a.styles)
    u.src || cf(e, u.content, u.loc.start.offset, t);
}
const RI = /* @__PURE__ */ new Set([".js", ".mjs", ".cjs", ".jsx", ".ts", ".mts", ".cts", ".tsx"]), gf = /* @__PURE__ */ new Set([".css", ".scss", ".sass", ".less", ".styl", ".stylus", ".pcss", ".postcss"]), Dh = { error: 0, warning: 1, info: 2 };
function yf(e) {
  const t = e.slice(e.lastIndexOf("/") + 1), i = t.lastIndexOf(".");
  return i > 0 ? t.slice(i).toLowerCase() : "";
}
function MI(e) {
  for (const a of [...e.rules ?? [], ...e.skipRules ?? []])
    if (!hr.has(a)) throw new Error(`Unknown rule "${a}". Run "vueleap --list-rules" to see all rules.`);
  const t = e.rules && e.rules.length > 0 ? new Set(e.rules) : void 0, i = new Set(e.skipRules ?? []);
  return (a) => (!t || t.has(a)) && !i.has(a);
}
function FI(e) {
  return e === ".ts" || e === ".mts" || e === ".cts" ? "ts" : e === ".tsx" ? "tsx" : "jsx";
}
function Bh(e) {
  return (t, i) => {
    if (t.includes("<"))
      try {
        const a = e.text.slice(0, i).replace(/[^\r\n]/g, " "), l = Nm(a + t, { onError: () => {
        } });
        df(e, l);
      } catch {
        e.warn("Could not parse an inline template string, skipped.");
      }
  };
}
function UI(e, t, i, a) {
  const l = new Dm(e, t, a), h = yf(e);
  try {
    e === "package.json" || e.endsWith("/package.json") ? Fm(l) : h === ".vue" ? LI(l, i, Bh(l)) : RI.has(h) ? lf(l, t, {
      offset: 0,
      lang: FI(h),
      isSfc: !1,
      emitsInput: Af.test(t),
      onTemplateString: Bh(l)
    }) : gf.has(h) && cf(l, t, 0, i);
  } catch (c) {
    l.warn(`Analysis failed for this file: ${c.message}`);
  }
  return l;
}
function VI(e, t) {
  const i = /* @__PURE__ */ new Map();
  for (const h of e) {
    const c = hr.get(h.ruleId);
    let p = i.get(h.ruleId);
    p || (p = {
      ruleId: h.ruleId,
      title: c?.title ?? h.ruleId,
      severity: h.severity,
      docs: c?.docs ?? h.docs,
      count: 0,
      fixable: 0
    }, i.set(h.ruleId, p)), p.count++, h.fixable && p.fixable++;
  }
  const a = new Map(Wh.map((h, c) => [h.id, c])), l = [...i.values()].sort(
    (h, c) => Dh[h.severity] - Dh[c.severity] || c.count - h.count || (a.get(h.ruleId) ?? 0) - (a.get(c.ruleId) ?? 0)
  );
  return {
    filesScanned: t,
    filesWithFindings: new Set(e.map((h) => h.file)).size,
    total: e.length,
    error: e.filter((h) => h.severity === "error").length,
    warning: e.filter((h) => h.severity === "warning").length,
    info: e.filter((h) => h.severity === "info").length,
    fixable: e.filter((h) => h.fixable).length,
    byRule: l
  };
}
function GI(e) {
  let t = 0;
  for (const l of e) {
    const h = l.effort ?? hr.get(l.ruleId)?.effort ?? 0.5;
    t += l.fixable ? h / 10 : h;
  }
  const i = t === 0 ? 0 : Math.max(1, Math.round(t)), a = i === 0 ? "none" : i < 8 ? "small" : i < 40 ? "moderate" : i < 120 ? "large" : "very large";
  return { score: i, level: a };
}
function KI(e, t) {
  const i = [...t].sort((c, p) => c.start - p.start || c.end - p.end);
  let a = "", l = 0;
  const h = [];
  for (const c of i)
    c.start < l || c.end < c.start || c.end > e.length || (a += e.slice(l, c.start), h.push({ start: a.length, end: a.length + c.text.length }), a += c.text, l = c.end);
  return { text: a + e.slice(l), ranges: h };
}
function Lh(e, t = {}) {
  const i = (t.filename ?? "Component.vue").replace(/\\/g, "/"), a = MI(t), l = /* @__PURE__ */ new Set(["v"]), h = yf(i);
  (h === ".vue" || gf.has(h)) && yI(e, l);
  const c = UI(i, e, l, a), p = [...c.findings].sort((u, g) => u.line - g.line || u.column - g.column);
  return {
    filename: i,
    findings: p,
    warnings: c.warnings,
    summary: VI(p, 1),
    effort: GI(p),
    compat: Om(p)
  };
}
function qI(e, t = {}) {
  const i = Lh(e, t), a = i.findings.filter((p) => p.fix), { text: l, ranges: h } = KI(
    e,
    a.flatMap((p) => p.fix ?? [])
  ), c = l === e ? i : Lh(l, t);
  return {
    filename: i.filename,
    code: l,
    fixed: l === e ? [] : a,
    changes: l === e ? [] : h,
    remaining: c.findings,
    compat: c.compat,
    warnings: c.warnings
  };
}
export {
  hr as RULES_BY_ID,
  Lh as analyzeSource,
  QI as compatSnippet,
  qI as fixSource
};
