"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EnterpriseSupplyChainScene — "The Supply Chain Spine" for /home2, arranged as
 * an ORGANIC operating map (not a straight row). Physical zones sit at different
 * levels and are linked by curved, diagonal routes; material dots flow along the
 * active route. Two supporting loops surround it: an ESG loop (trade value
 * returns to community and origin) and a Singapore coordination hub above.
 * Technology is a THIN secondary layer — enabling checkpoints, never the story.
 *
 * Layout on the 1400 x 900 canvas:
 *   origin (upper-left) → verification (upper-middle) → processing (centre) →
 *   QA (centre-right) → warehouse/shipment (lower-right) → industrial buyer
 *   (far-right); ESG community (lower-left); Singapore hub (centre-top).
 *
 * The parent <svg> pans/zooms the viewBox on scroll (camera). Active zones
 * sharpen, others fade. Reduced-motion holds everything static.
 */
const BLUE = "#0B2F44";
const GREEN = "#2F7D5A";
const GOLD = "#B8955B";
const COPPER = "#B87333";
const CREAM = "#F8F6F1";
const S = 1.1;

const POS = {
  origin: { x: 270, y: 300 },
  verify: { x: 560, y: 240 },
  process: { x: 700, y: 470 },
  qa: { x: 960, y: 400 },
  logistics: { x: 1130, y: 610 },
  buyer: { x: 1300, y: 440 },
  community: { x: 300, y: 690 },
  hub: { x: 700, y: 130 },
};

export const SCENE_VIEWBOXES: Record<string, { x: number; y: number; w: number; h: number }> = {
  overview: { x: 70, y: 60, w: 1300, h: 780 },
  sourcing: { x: 130, y: 190, w: 330, h: 280 },
  verification: { x: 400, y: 110, w: 360, h: 320 },
  processing: { x: 560, y: 350, w: 340, h: 290 },
  quality: { x: 810, y: 280, w: 340, h: 290 },
  logistics: { x: 960, y: 470, w: 400, h: 320 },
  buyer: { x: 1150, y: 310, w: 290, h: 290 },
  community: { x: 130, y: 550, w: 380, h: 320 },
  singapore: { x: 0, y: 0, w: 1400, h: 900 },
};

type Props = { activeId: string };
type Z = { active: boolean; reduce: boolean; dim?: boolean };

/* ── building blocks ── */

function Panel({ x, y, w, h, active }: { x: number; y: number; w: number; h: number; active: boolean }) {
  return (
    <g>
      <rect x={x + 2} y={y + 3} width={w} height={h} rx={11} fill={BLUE} fillOpacity={0.045} />
      <rect x={x} y={y} width={w} height={h} rx={11} fill={CREAM} fillOpacity={active ? 0.5 : 0.24} stroke={BLUE} strokeOpacity={active ? 0.18 : 0.08} strokeWidth={0.8} />
    </g>
  );
}

function Route({ d, color, on, reduce, dash = false }: { d: string; color: string; on: boolean; reduce: boolean; dash?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={BLUE} strokeOpacity={0.1} strokeWidth={1} strokeDasharray={dash ? "5 6" : undefined} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth={S + 0.2} initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 0.5 : 0 }} transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }} />
      {on && !reduce && (
        <motion.path d={d} fill="none" stroke={color} strokeWidth={2.1} strokeOpacity={0.55} strokeLinecap="round" strokeDasharray="0.1 12"
          animate={{ strokeDashoffset: [0, -36.3] }} transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }} />
      )}
    </g>
  );
}

function Pulse({ cx, cy, color, show, reduce, from = 9, to = 28, dur = 4, delay = 0, op = 0.4 }: { cx: number; cy: number; color: string; show: boolean; reduce: boolean; from?: number; to?: number; dur?: number; delay?: number; op?: number }) {
  if (!show || reduce) return null;
  return (
    <motion.circle cx={cx} cy={cy} r={from} fill="none" stroke={color} strokeWidth={S} strokeOpacity={op}
      animate={{ r: [from, to], opacity: [op, 0] }} transition={{ duration: dur, repeat: Infinity, delay, ease: "easeOut" }} />
  );
}

function Node({ x, y, label, color, active, dy = 20 }: { x: number; y: number; label?: string; color: string; active: boolean; dy?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7.5} fill={CREAM} stroke={color} strokeWidth={S} strokeOpacity={active ? 0.9 : 0.4} />
      <circle cx={x} cy={y} r={2.8} fill={color} fillOpacity={active ? 0.9 : 0.5} />
      {label && <text x={x} y={y + dy} textAnchor="middle" fontSize={9} fontWeight={600} letterSpacing="1.3" fill={color} fillOpacity={active ? 0.8 : 0.42}>{label}</text>}
    </g>
  );
}

function Pill({ x, y, text, color, show }: { x: number; y: number; text: string; color: string; show: boolean }) {
  const w = text.length * 4.7 + 14;
  return (
    <g style={{ opacity: show ? 1 : 0, transition: "opacity 400ms ease" }}>
      <rect x={x - w / 2} y={y - 8} width={w} height={15} rx={7.5} fill={CREAM} fillOpacity={0.85} stroke={color} strokeOpacity={0.42} strokeWidth={0.7} />
      <text x={x} y={y + 2.6} textAnchor="middle" fontSize={7.5} fontWeight={600} letterSpacing="0.8" fill={color} fillOpacity={0.9}>{text}</text>
    </g>
  );
}

function Person({ x, y, s = 1, color, op = 0.42 }: { x: number; y: number; s?: number; color: string; op?: number }) {
  return (
    <g opacity={op}>
      <circle cx={x} cy={y - 20 * s} r={4.2 * s} fill="none" stroke={color} strokeWidth={S} />
      <path d={`M${x - 7 * s} ${y} Q ${x} ${y - 18 * s} ${x + 7 * s} ${y}`} fill="none" stroke={color} strokeWidth={S} />
    </g>
  );
}

function Tree({ x, y, active }: { x: number; y: number; active: boolean }) {
  const o = active ? 0.6 : 0.34;
  return (
    <g stroke={GREEN} strokeWidth={S} strokeOpacity={o} fill="none" strokeLinecap="round">
      <line x1={x} y1={y} x2={x} y2={y - 24} />
      <path d={`M${x} ${y - 24} q -8 -3 -10 -13 q 10 5 10 13 q 0 -8 10 -13 q -2 10 -10 13 Z`} />
      <path d={`M${x - 4} ${y - 3} a 4 2.4 0 0 0 8 0`} stroke={GOLD} strokeOpacity={active ? 0.75 : 0.45} />
    </g>
  );
}

function Drone({ x, y, active, reduce, delay = 0 }: { x: number; y: number; active: boolean; reduce: boolean; delay?: number }) {
  const o = active ? 0.75 : 0.4;
  return (
    <motion.g stroke={BLUE} strokeWidth={S} strokeOpacity={o} fill="none" strokeLinecap="round"
      animate={active && !reduce ? { x: [-7, 7, -7], y: [0, -3, 0] } : undefined} transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}>
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
      <line x1={x - 7} y1={y - 3} x2={x - 7} y2={y} />
      <line x1={x + 7} y1={y - 3} x2={x + 7} y2={y} />
      <line x1={x} y1={y} x2={x} y2={y + 14} stroke={GREEN} strokeOpacity={active ? 0.45 : 0.2} strokeDasharray="2 3" />
    </motion.g>
  );
}

function Wrap({ id, dim, children }: { id: string; dim?: boolean; children: React.ReactNode }) {
  return <g id={id} style={{ opacity: dim ? 0.42 : 1, transition: "opacity 500ms ease" }}>{children}</g>;
}

/* ── zones ── */

function OriginZone({ active, dim }: Z) {
  const { x: cx, y: cy } = POS.origin;
  return (
    <Wrap id="origin-sourcing" dim={dim}>
      <Panel x={cx - 96} y={cy - 78} w={192} h={150} active={active} />
      <path d={`M${cx - 74} ${cy - 60} L ${cx + 70} ${cy - 66} L ${cx + 76} ${cy + 18} L ${cx - 68} ${cy + 24} Z`} fill="none" stroke={GREEN} strokeOpacity={active ? 0.45 : 0.24} strokeWidth={S} strokeDasharray="6 5" />
      {[[cx - 40, cy - 38], [cx, cy - 48], [cx + 40, cy - 38]].map(([x, y], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={x} y2={y} stroke={GREEN} strokeOpacity={active ? 0.3 : 0.14} strokeWidth={0.7} />
          <circle cx={x} cy={y} r={2.2} fill="none" stroke={GREEN} strokeOpacity={active ? 0.65 : 0.32} strokeWidth={0.8} />
        </g>
      ))}
      <Tree x={cx - 34} y={cy + 20} active={active} />
      <Tree x={cx} y={cy + 24} active={active} />
      <Tree x={cx + 36} y={cy + 20} active={active} />
      <path d={`M${cx - 52} ${cy + 22} l3 -9 h10 l3 9 Z`} fill="none" stroke={GOLD} strokeOpacity={active ? 0.6 : 0.34} strokeWidth={0.9} />
      <Person x={cx + 18} y={cy + 22} s={0.78} color={BLUE} op={active ? 0.55 : 0.4} />
      <Node x={cx} y={cy} label="ORIGIN" color={GREEN} active={active} dy={-14} />
      <Pill x={cx} y={cy + 92} text="PRODUCER NETWORK" color={GREEN} show={active} />
      <Pill x={cx} y={cy + 112} text="RESPONSIBLE SOURCING" color={GOLD} show={active} />
    </Wrap>
  );
}

function VerificationZone({ active, reduce, dim }: Z) {
  const { x: cx, y: cy } = POS.verify;
  return (
    <Wrap id="source-verification" dim={dim}>
      <Panel x={cx - 78} y={cy - 44} w={156} h={110} active={active} />
      <path d={`M${cx - 56} ${cy - 26} L ${cx + 50} ${cy - 32} L ${cx + 56} ${cy + 22} L ${cx - 50} ${cy + 28} Z`} fill="none" stroke={GREEN} strokeOpacity={active ? 0.55 : 0.28} strokeWidth={S} strokeDasharray="5 4" />
      {[[cx - 56, cy - 26], [cx + 50, cy - 32], [cx + 56, cy + 22], [cx - 50, cy + 28]].map(([x, y], i) => (
        <g key={i}>
          <Pulse cx={x} cy={y} color={GREEN} show={active} reduce={reduce} from={3.5} to={10} dur={3} delay={i * 0.4} op={0.4} />
          <circle cx={x} cy={y} r={2} fill={GREEN} fillOpacity={active ? 0.8 : 0.45} />
        </g>
      ))}
      <Drone x={cx - 20} y={cy - 44} active={active} reduce={reduce} />
      <Drone x={cx + 28} y={cy - 36} active={active} reduce={reduce} delay={1.3} />
      {active && !reduce && (
        <motion.line x1={cx - 50} y1={cy - 26} x2={cx - 50} y2={cy + 28} stroke={GREEN} strokeOpacity={0.5} strokeWidth={S}
          animate={{ x1: [cx - 50, cx + 54], x2: [cx - 50, cx + 54] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
      )}
      <Node x={cx} y={cy + 42} label="SOURCE VERIFIED" color={GREEN} active={active} />
      <Pill x={cx} y={cy + 84} text="TRACEABILITY · TRANSPARENCY" color={GREEN} show={active} />
      <Pill x={cx} y={cy + 104} text="SUPPLIER DOCUMENTATION" color={GOLD} show={active} />
    </Wrap>
  );
}

function ProcessingZone({ active, reduce, dim }: Z) {
  const { x: cx, y: cy } = POS.process;
  const o = active ? 0.5 : 0.3;
  return (
    <Wrap id="processing" dim={dim}>
      <Panel x={cx - 94} y={cy - 66} w={188} h={116} active={active} />
      <path d={`M${cx - 74} ${cy + 20} V ${cy - 40} l14 10 V ${cy - 40} l14 10 V ${cy - 40} l14 10 V ${cy - 40} h52 V ${cy + 20} Z`} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} strokeLinejoin="round" />
      <rect x={cx + 34} y={cy - 60} width={8} height={20} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <line x1={cx - 96} y1={cy + 12} x2={cx - 62} y2={cy + 12} stroke={GOLD} strokeOpacity={0.3} strokeWidth={S} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={cx - 92 + i * 9} cy={cy + 14} r={1.8} fill="none" stroke={GOLD} strokeOpacity={0.3} strokeWidth={0.6} />)}
      {active && !reduce && (
        <motion.rect x={cx - 96} y={cy + 6} width={8} height={8} rx={1} fill="none" stroke={GOLD} strokeOpacity={0.65} strokeWidth={S}
          animate={{ x: [cx - 96, cx - 64], opacity: [0, 0.65, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} />
      )}
      {[[cx - 40, cy - 24], [cx + 10, cy - 24]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={3.2} fill="none" stroke={GREEN} strokeOpacity={active ? 0.6 : 0.3} strokeWidth={0.8} />
          <line x1={x - 2} y1={y} x2={x + 2} y2={y} stroke={GREEN} strokeOpacity={active ? 0.55 : 0.28} strokeWidth={0.6} />
          <line x1={x} y1={y - 2} x2={x} y2={y + 2} stroke={GREEN} strokeOpacity={active ? 0.55 : 0.28} strokeWidth={0.6} />
        </g>
      ))}
      {[[cx + 46, cy + 4], [cx + 58, cy + 4], [cx + 52, cy + 14]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={10} height={9} rx={1} fill="none" stroke={GOLD} strokeOpacity={active ? 0.55 : 0.3} strokeWidth={0.8} />
          <line x1={x + 3.5} y1={y} x2={x + 3.5} y2={y + 9} stroke={GOLD} strokeOpacity={active ? 0.4 : 0.2} strokeWidth={0.5} />
        </g>
      ))}
      <Node x={cx} y={cy} label="PROCESSING UNIT" color={BLUE} active={active} dy={-14} />
      <Pill x={cx} y={cy + 68} text="VALUE-ADD" color={BLUE} show={active} />
      <Pill x={cx} y={cy + 88} text="RUBBER BALES · BATCH FLOW" color={GOLD} show={active} />
    </Wrap>
  );
}

function QualityZone({ active, reduce, dim }: Z) {
  const { x: cx, y: cy } = POS.qa;
  const o = active ? 0.55 : 0.3;
  return (
    <Wrap id="quality-assurance" dim={dim}>
      <Panel x={cx - 84} y={cy - 60} w={168} h={104} active={active} />
      <line x1={cx - 66} y1={cy + 12} x2={cx + 66} y2={cy + 12} stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <rect x={cx - 60} y={cy - 8} width={15} height={20} rx={1.5} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <line x1={cx - 52} y1={cy - 8} x2={cx - 52} y2={cy - 16} stroke={BLUE} strokeOpacity={o} strokeWidth={0.8} />
      <circle cx={cx - 52} cy={cy - 18} r={1.8} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.8} />
      {[cx - 30, cx - 22, cx - 14, cx - 6].map((x) => <circle key={x} cx={x} cy={cy + 6} r={2.2} fill="none" stroke={GREEN} strokeOpacity={active ? 0.6 : 0.32} strokeWidth={0.8} />)}
      <rect x={cx + 8} y={cy - 12} width={26} height={24} rx={1.5} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.7} />
      {[[cx + 12, 8], [cx + 18, 14], [cx + 24, 11], [cx + 30, 16]].map(([x, hh], i) => <line key={i} x1={x} y1={cy + 8} x2={x} y2={cy + 8 - hh} stroke={i === 3 ? GREEN : BLUE} strokeOpacity={active ? 0.7 : 0.35} strokeWidth={1.3} strokeLinecap="round" />)}
      <circle cx={cx + 52} cy={cy - 28} r={7} fill="none" stroke={GOLD} strokeOpacity={active ? 0.7 : 0.36} strokeWidth={S} />
      <path d={`M${cx + 48} ${cy - 28} l3 3 l6 -6`} fill="none" stroke={GOLD} strokeOpacity={active ? 0.85 : 0.4} strokeWidth={1.2} strokeLinecap="round" />
      <Pulse cx={cx + 52} cy={cy - 28} color={GOLD} show={active} reduce={reduce} from={8} to={18} dur={3.4} op={0.4} />
      <Node x={cx} y={cy} label="QA CHECK" color={GOLD} active={active} dy={-14} />
      <Pill x={cx} y={cy + 62} text="BATCH APPROVED" color={GREEN} show={active} />
      <Pill x={cx} y={cy + 82} text="SPECIFICATION" color={BLUE} show={active} />
    </Wrap>
  );
}

function LogisticsZone({ active, dim }: Z) {
  const { x: cx, y: cy } = POS.logistics;
  const o = active ? 0.55 : 0.3;
  return (
    <Wrap id="warehouse-shipment" dim={dim}>
      <Panel x={cx - 120} y={cy - 66} w={244} h={116} active={active} />
      {/* warehouse */}
      <path d={`M${cx - 104} ${cy + 22} V ${cy - 22} l22 -12 l22 12 V ${cy + 22} Z`} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} strokeLinejoin="round" />
      <rect x={cx - 94} y={cy} width={22} height={22} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.7} />
      {[6, 12, 18].map((d) => <line key={d} x1={cx - 94} y1={cy + d} x2={cx - 72} y2={cy + d} stroke={BLUE} strokeOpacity={o * 0.7} strokeWidth={0.5} />)}
      {/* containers */}
      {[[cx - 44, cy - 6], [cx - 26, cy - 6], [cx - 44, cy + 8], [cx - 26, cy + 8]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={16} height={12} rx={1} fill="none" stroke={i % 2 === 0 ? COPPER : BLUE} strokeOpacity={o} strokeWidth={S} />
      ))}
      {/* crane */}
      <line x1={cx + 2} y1={cy + 20} x2={cx + 2} y2={cy - 32} stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <line x1={cx + 2} y1={cy - 32} x2={cx + 48} y2={cy - 32} stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <line x1={cx + 42} y1={cy - 32} x2={cx + 42} y2={cy - 14} stroke={BLUE} strokeOpacity={o} strokeWidth={0.8} />
      {/* cargo vessel */}
      <path d={`M${cx + 56} ${cy + 14} h64 l-10 16 h-44 Z`} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} strokeLinejoin="round" />
      <line x1={cx + 52} y1={cy + 14} x2={cx + 122} y2={cy + 14} stroke={COPPER} strokeOpacity={active ? 0.5 : 0.26} strokeWidth={0.8} />
      <rect x={cx + 66} y={cy + 3} width={11} height={11} fill="none" stroke={COPPER} strokeOpacity={o} strokeWidth={0.7} />
      <rect x={cx + 80} y={cy + 3} width={11} height={11} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.7} />
      <Node x={cx} y={cy + 42} label="WAREHOUSE · SHIPMENT" color={COPPER} active={active} />
      <Pill x={cx} y={cy + 84} text="CONTAINER LOADING" color={BLUE} show={active} />
      <Pill x={cx} y={cy + 104} text="TRADE EXECUTION" color={COPPER} show={active} />
    </Wrap>
  );
}

function BuyerZone({ active, reduce, dim }: Z) {
  const { x: cx, y: cy } = POS.buyer;
  const o = active ? 0.55 : 0.3;
  return (
    <Wrap id="industrial-buyer" dim={dim}>
      <Panel x={cx - 82} y={cy - 62} w={148} h={110} active={active} />
      <path d={`M${cx - 62} ${cy + 22} V ${cy - 34} h44 V ${cy + 22} Z`} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={S} />
      <rect x={cx - 54} y={cy - 4} width={12} height={26} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.7} />
      {[[cx - 34, cy - 26], [cx - 26, cy - 26]].map(([x, y], i) => <rect key={i} x={x} y={y} width={6} height={6} fill="none" stroke={BLUE} strokeOpacity={o * 0.8} strokeWidth={0.5} />)}
      <circle cx={cx + 26} cy={cy - 4} r={13} fill="none" stroke={BLUE} strokeOpacity={active ? 0.65 : 0.34} strokeWidth={S} />
      <circle cx={cx + 26} cy={cy - 4} r={6} fill="none" stroke={BLUE} strokeOpacity={active ? 0.55 : 0.28} strokeWidth={0.9} />
      {[0, 45, 90, 135].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={cx + 26 + Math.cos(r) * 6} y1={cy - 4 + Math.sin(r) * 6} x2={cx + 26 + Math.cos(r) * 13} y2={cy - 4 + Math.sin(r) * 13} stroke={BLUE} strokeOpacity={active ? 0.4 : 0.2} strokeWidth={0.5} />;
      })}
      <Pulse cx={cx + 26} cy={cy - 4} color={BLUE} show={active} reduce={reduce} from={15} to={26} dur={4} op={0.22} />
      <Node x={cx} y={cy + 40} label="BUYER DELIVERY" color={BLUE} active={active} />
      <Pill x={cx} y={cy + 82} text="TYRE MANUFACTURING" color={BLUE} show={active} />
      <Pill x={cx} y={cy + 102} text="INDUSTRIAL SUPPLY · RELIABILITY" color={GREEN} show={active} />
    </Wrap>
  );
}

function CommunityZone({ active, reduce, dim }: Z) {
  const { x: cx, y: cy } = POS.community;
  return (
    <Wrap id="esg-community" dim={dim}>
      <Panel x={cx - 116} y={cy - 66} w={232} h={150} active={active} />
      <circle cx={cx} cy={cy} r={20} fill="none" stroke={GOLD} strokeOpacity={active ? 0 : 0.14} strokeWidth={0.8} />
      <Pulse cx={cx} cy={cy} color={GOLD} show={active} reduce={reduce} from={16} to={50} dur={5} op={0.3} />
      <Pulse cx={cx} cy={cy} color={GREEN} show={active} reduce={reduce} from={16} to={34} dur={5} delay={1.2} op={0.26} />
      <Person x={cx} y={cy + 22} s={1.1} color={GREEN} op={active ? 0.6 : 0.4} />
      <Person x={cx - 36} y={cy + 26} s={0.66} color={GOLD} op={active ? 0.6 : 0.4} />
      <Person x={cx + 36} y={cy + 26} s={0.64} color={GOLD} op={active ? 0.6 : 0.4} />
      {[[cx + 72, cy - 8, GREEN], [cx + 98, cy + 14, BLUE], [cx + 46, cy + 14, GOLD]].map(([x, y, col], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={4} fill="none" stroke={col as string} strokeOpacity={active ? 0.55 : 0.22} strokeWidth={0.8} />
          <line x1={cx + 72} y1={cy - 8} x2={x as number} y2={y as number} stroke={GREEN} strokeOpacity={active ? 0.2 : 0.1} strokeWidth={0.5} />
        </g>
      ))}
      <Node x={cx} y={cy} label="COMMUNITY IMPACT" color={GOLD} active={active} dy={-14} />
      <Pill x={cx} y={cy + 66} text="REINVESTMENT LOOP" color={GOLD} show={active} />
      <Pill x={cx} y={cy + 86} text="PEOPLE, PLANET & PROFITS" color={BLUE} show={active} />
    </Wrap>
  );
}

function SingaporeHub({ active, reduce }: Z) {
  const hub = POS.hub;
  const zoneNodes: [number, number][] = [POS.origin, POS.verify, POS.process, POS.qa, POS.logistics, POS.buyer, POS.community].map((p) => [p.x, p.y]);
  const markets: [number, number][] = [[120, 90], [1290, 90], [1360, 470], [1330, 790], [70, 470], [90, 800]];
  const arc = (b: [number, number]) => `M${hub.x} ${hub.y} Q ${(hub.x + b[0]) / 2} ${Math.min(hub.y, b[1]) - 34} ${b[0]} ${b[1]}`;
  return (
    <g id="singapore-hub">
      {zoneNodes.map(([x, y], i) => (
        <line key={i} x1={hub.x} y1={hub.y} x2={x} y2={y} stroke={i === 6 ? GOLD : BLUE} strokeWidth={0.7}
          style={{ opacity: active ? 0.2 : 0.05, transition: "opacity 700ms ease" }} />
      ))}
      {markets.map((m, i) => (
        <g key={i}>
          <path d={arc(m)} fill="none" stroke={COPPER} strokeOpacity={active ? 0.28 : 0.09} strokeWidth={0.9} />
          {active && !reduce && (
            <motion.path d={arc(m)} fill="none" stroke={COPPER} strokeWidth={S} strokeOpacity={0.42} strokeDasharray="4 140"
              animate={{ strokeDashoffset: [0, -144] }} transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "linear" }} />
          )}
          <circle cx={m[0]} cy={m[1]} r={2.6} fill={BLUE} fillOpacity={active ? 0.5 : 0.26} />
        </g>
      ))}
      <Pulse cx={hub.x} cy={hub.y} color={COPPER} show={active} reduce={reduce} from={16} to={44} dur={4.5} op={0.4} />
      <circle cx={hub.x} cy={hub.y} r={15} fill="none" stroke={COPPER} strokeOpacity={active ? 0.75 : 0.38} strokeWidth={S} />
      <ellipse cx={hub.x} cy={hub.y} rx={5.5} ry={15} fill="none" stroke={BLUE} strokeOpacity={active ? 0.4 : 0.2} strokeWidth={0.7} />
      <line x1={hub.x - 15} y1={hub.y} x2={hub.x + 15} y2={hub.y} stroke={BLUE} strokeOpacity={active ? 0.4 : 0.2} strokeWidth={0.7} />
      <circle cx={hub.x} cy={hub.y} r={3.2} fill={COPPER} fillOpacity={0.85} />
      <text x={hub.x} y={hub.y - 24} textAnchor="middle" fontSize={9.5} fontWeight={600} letterSpacing="1.6" fill={BLUE} fillOpacity={active ? 0.8 : 0.44}>SINGAPORE HUB</text>
      <Pill x={hub.x} y={hub.y + 32} text="GLOBAL MARKETS" color={COPPER} show={active} />
      <Pill x={hub.x} y={hub.y + 52} text="SUPPLY CHAIN COORDINATION" color={BLUE} show={active} />
    </g>
  );
}

function TechLayer({ strong, reduce }: { strong: boolean; reduce: boolean }) {
  const checks = [
    { x: POS.verify.x, y: 150, label: "DRONE CAPTURE", color: GREEN },
    { x: POS.process.x, y: 360, label: "TRACEABILITY RECORD", color: BLUE },
    { x: POS.qa.x, y: 300, label: "QUALITY RECORD", color: GOLD },
    { x: POS.logistics.x, y: 500, label: "SHIPMENT DOC", color: COPPER },
  ];
  const d = `M${checks[0].x} ${checks[0].y} C 640 260, 660 380, ${checks[1].x} ${checks[1].y} S 900 300, ${checks[2].x} ${checks[2].y} S 1120 440, ${checks[3].x} ${checks[3].y}`;
  const o = strong ? 0.24 : 0.09;
  return (
    <g id="technology-layer">
      <path d={d} fill="none" stroke={BLUE} strokeOpacity={o} strokeWidth={0.8} strokeDasharray="1 5" strokeLinecap="round" />
      {strong && !reduce && (
        <motion.path d={d} fill="none" stroke={BLUE} strokeWidth={1.5} strokeOpacity={0.35} strokeLinecap="round" strokeDasharray="0.1 12"
          animate={{ strokeDashoffset: [0, -36.3] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      )}
      {checks.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={2.6} fill={CREAM} stroke={c.color} strokeOpacity={strong ? 0.6 : 0.32} strokeWidth={0.9} />
          <Pill x={c.x} y={c.y - 16} text={c.label} color={BLUE} show={strong} />
        </g>
      ))}
      <text x={checks[0].x - 60} y={132} fontSize={7.5} fontWeight={600} letterSpacing="1" fill={BLUE} fillOpacity={strong ? 0.5 : 0.22}>TECHNOLOGY LAYER · ENABLING</text>
    </g>
  );
}

/* ── master scene ── */

export function EnterpriseSupplyChainScene({ activeId }: Props) {
  const reduce = !!useReducedMotion();
  const is = (id: string) => activeId === id;
  const overview = is("overview");

  const origin = is("sourcing");
  const verify = is("verification");
  const proc = is("processing");
  const qa = is("quality");
  const logistics = is("logistics");
  const buyer = is("buyer");
  const esg = is("community");
  const hub = is("singapore");
  const focused = !(overview || hub);
  const dim = (a: boolean) => focused && !a;

  const curve = (a: { x: number; y: number }, b: { x: number; y: number }, bow = 40) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - bow;
    return `M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <>
      <g stroke={BLUE} strokeOpacity={0.045} strokeWidth={0.5}>
        {Array.from({ length: 27 }, (_, i) => (i + 1) * 50).map((v) => <line key={"h" + v} x1={0} y1={v} x2={1400} y2={v} />)}
        {Array.from({ length: 27 }, (_, i) => (i + 1) * 50).map((v) => <line key={"v" + v} x1={v} y1={0} x2={v} y2={900} />)}
      </g>

      {/* Organic supply-chain route (curved, diagonal — not a straight line) */}
      <Route d={curve(POS.origin, POS.verify, 46)} color={GREEN} on={overview || origin || verify} reduce={reduce} />
      <Route d={curve(POS.verify, POS.process, 40)} color={GREEN} on={overview || verify || proc} reduce={reduce} />
      <Route d={curve(POS.process, POS.qa, 42)} color={BLUE} on={overview || proc || qa} reduce={reduce} />
      <Route d={curve(POS.qa, POS.logistics, 46)} color={GOLD} on={overview || qa || logistics} reduce={reduce} />
      <Route d={curve(POS.logistics, POS.buyer, 40)} color={COPPER} on={overview || logistics || buyer} reduce={reduce} />

      {/* ESG loop: trade value → community → origin */}
      <Route d={`M${POS.buyer.x} ${POS.buyer.y + 40} C ${POS.buyer.x} 820, 700 880, ${POS.community.x + 20} ${POS.community.y + 90}`} color={GOLD} on={overview || esg} reduce={reduce} dash />
      <Route d={curve(POS.community, POS.origin, -60)} color={GREEN} on={overview || esg} reduce={reduce} dash />

      <TechLayer strong={verify || overview} reduce={reduce} />

      <OriginZone active={origin} reduce={reduce} dim={dim(origin)} />
      <VerificationZone active={verify} reduce={reduce} dim={dim(verify)} />
      <ProcessingZone active={proc} reduce={reduce} dim={dim(proc)} />
      <QualityZone active={qa} reduce={reduce} dim={dim(qa)} />
      <LogisticsZone active={logistics} reduce={reduce} dim={dim(logistics)} />
      <BuyerZone active={buyer} reduce={reduce} dim={dim(buyer)} />
      <CommunityZone active={esg} reduce={reduce} dim={focused && !esg} />
      <SingaporeHub active={hub} reduce={reduce} />
    </>
  );
}
