package com.hfportal.api.controller;

import com.hfportal.api.model.Team;
import com.hfportal.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // READ: Get all Teams
    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.findAllTeams();
    }

    // CREATE: Add a new Team
    @PostMapping
    public Team addTeam(@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    // READ: Get a specific Team by ID
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable int id) {
        Optional<Team> team = teamService.findTeamById(id);
        if (team.isPresent()) {
            return ResponseEntity.ok(team.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // READ: Get all teams by LeagueID
    @GetMapping("/by-league/{leagueId}")
    public ResponseEntity<List<Team>> getTeamsByLeague(@PathVariable int leagueId) {
        List<Team> teams = teamService.findTeamsByLeagueId(leagueId);
        return ResponseEntity.ok(teams);
    }

    // UPDATE: Modify an existing Team
    @PatchMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable int id, @RequestBody Team updatedTeam) {
        System.out.println("TRYING TO UPDATE");
        if (id != updatedTeam.getId()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Team team = teamService.updateTeam(updatedTeam);
            return ResponseEntity.ok(team);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Remove a Team by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable int id) {
        try {
            teamService.deleteTeam(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
