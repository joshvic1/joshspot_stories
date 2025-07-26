import Link from "next/link";

export default function JoinExclusive() {
  return (
    <div className="sidebar-box invite-box">
      <img src="/featured-4.png" alt="Exclusive Story" />
      <div className="invite-overlay">
        <h4>Exclusive Story</h4>
        <p>Read hidden stories we don’t post elsewhere.</p>
        <button className="join-btn">Join Now</button>
      </div>
    </div>
  );
}
