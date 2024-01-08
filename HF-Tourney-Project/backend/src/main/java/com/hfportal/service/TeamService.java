package com.hfportal.service;

import com.hfportal.api.model.League;
import com.hfportal.api.model.Team;
import com.hfportal.api.repository.LeagueRepository;
import com.hfportal.api.repository.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    // READ: Get all Teams
    public List<Team> findAllTeams() {
        return teamRepository.findAll();
    }

    // CREATE: Add a new Team
    public Team addTeam(Team team) {
        if(team.getLeague_id() != null) {
            League league = leagueRepository.findById(team.getLeague_id())
                    .orElseThrow(() -> new RuntimeException("League not found for ID: " + team.getLeague_id()));
            team.setLeague(league);
        }
        return teamRepository.save(team);
    }

    // READ: Get a specific Team by ID
    public Optional<Team> findTeamById(int id) {
        return teamRepository.findById(id);
    }

    // READ: Get all Teams of a League by League ID
    public List<Team> findTeamsByLeagueId(int leagueId) {
        // Create a Sort object to define the order
        Sort sort = Sort.by(
                Sort.Order.desc("PTS"),  // Sort by points in descending order
                Sort.Order.desc("GD"),   // Then sort by goal difference in descending order
                Sort.Order.desc("GF")    // Then sort by goals scored in descending order
        );

        return teamRepository.findByLeagueId(leagueId, sort);
    }

    @Transactional
    public Team updateTeam(Team updatedTeam) {
        // Check if the team exists
        if (teamRepository.existsById(updatedTeam.getId())) {
            // Retrieve the existing team
            Team existingTeam = teamRepository.findById(updatedTeam.getId()).orElse(null);

            // Check if we got the team
            if (existingTeam == null) {
                throw new RuntimeException("Unexpected error: Team not found for ID: " + updatedTeam.getId());
            }

            // Update fields of the existing team using values from the incoming team
            existingTeam.setP(updatedTeam.getP());
            existingTeam.setW(updatedTeam.getW());
            existingTeam.setL(updatedTeam.getL());
            existingTeam.setD(updatedTeam.getD());
            existingTeam.setGF(updatedTeam.getGF());
            existingTeam.setGA(updatedTeam.getGA());
            existingTeam.setGD(updatedTeam.getGD());
            existingTeam.setPTS(updatedTeam.getPTS());

            // Save and return the updated team
            return teamRepository.save(existingTeam);

        } else {
            // Throw an exception if team does not exist
            throw new RuntimeException("Team not found for ID: " + updatedTeam.getId());
        }
    }


    // DELETE: Remove a Team by ID
    public void deleteTeam(int id) {
        teamRepository.deleteById(id);
    }
}
