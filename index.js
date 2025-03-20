const { createClient } = require('@supabase/supabase-js');
const io = require('socket.io')(8000, { cors: { origin: "*" } });

const SUPABASE_URL = "https://gbkdexfrtoiagglhksfi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdia2RleGZydG9pYWdnbGhrc2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Nzc4NjIsImV4cCI6MjA1ODA1Mzg2Mn0.uUXi-N5_5uBklU7S3E1vpYM6QFGCF8FsKU8i_FhmCNY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fetchVotes = async () => {
    const { data, error } = await supabase.from('votes').select('*');
    if (error) {
        console.error("Error fetching votes:", error);
        return {};
    }
    const votes = {};
    let total = 0;
    data.forEach(vote => {
        votes[vote.option] = vote.count;
        total += vote.count;
    });
    return { votingPolls: votes, totalVotes: total };
};

const updateVote = async (option) => {
    console.log("🗳 Incrementing vote for:", option);

    if (option === "html") option = "HTML";
    else if (option === "python") option = "Python";
    else if(option ===  "css") option = "CSS";
    else if(option === "javascript") option = "JavaScript";	
    else if(option === "reactjs") option = "React JS";	
	

    const { data, error } = await supabase.rpc('increment_votes', { vote_option: option });

    if (error) {
        console.error("❌ Supabase vote update error:", error);
    } else {
        console.log("✅ Vote updated successfully!", data);
    }
};


io.on('connection', async (socket) => {
    const voteData = await fetchVotes();
    socket.emit('update', voteData);

    socket.on('send-vote', async (voteTo) => {
        await updateVote(voteTo);
        const updatedVotes = await fetchVotes();
        io.emit('update', updatedVotes);
    });
});